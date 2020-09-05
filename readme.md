# html-cache-bust
Add hashes to CSS and JS file names and update their references in HTML documents.

---

Place the shell script into the same directory as `htmldir` and `cssjsdir` folders; 
adjust the variables to whatever actual names are in use. Currently it only supports 
relative paths to these two folders with respect to the script file. 

However, it uses absolute paths in each HTML file with respect to `htmldir`, so 
that on the server itself each reference begins with `/` (i.e. server root). 
Because of this, the directory tree of `cssjsdir` must match that of `htmldir`.

Basic overview of how it works:

1. `#!/bin/sh`
    - setup shell
1. `export cssjsdir="css-js"`
    - set relative path of the folder containing CSS and JS subfolders with source files in them
1. `export htmldir="html"`
    - set relative path of the folder containing HTML files
1. `export shorthash=0`
    - if true, file names will only include the first eight characters of the
1. `find "./""$cssjsdir" -type f \( -name '*.js' -o -name '*.css' \) -exec sh -c '`
1. `  for file do`
    - find all files in `cssjsdir` folder and subfolders that are CSS or JS and exec below contents on the output
1. `    fdir=$(dirname "$file" | cut -c 3-65535 | sed s,"$cssjsdir""/",,g)`
1. `    fname=$(basename "$file" | cut -d "." -f 1)`
1. `    fext=$(basename "$file" | cut -d "." -f 2)`
    - respectively gets the path (relative), name, and extension of current file
1. `    fhashfull=$(sha256sum "$file" | cut -d " " -f 1)`
    - generate SHA2 of current file
1. `    if [ "$shorthash" -eq 1 ]; then`
1. `      fhash=$(echo "$fhashfull" | cut -c 1-8)`
1. `    else`
1. `      fhash="$fhashfull"`
1. `    fi`
    - optionally trim the hash length
1. `    fpathfull="/""$fdir""/""$fname"-"$fhash"."$fext"`
1. `    echo "$fpathfull"`
    - form path and name for the new file
1. `    mkdir -p "$htmldir"/"$fdir"`
1. `    rm "$htmldir"/"$fdir"/"$fname"*"$fext"`
1. `    cat "$file" > "$htmldir"/"$fdir"/"$fname"-"$fhash"."$fext"`
    - remove the existing file from `htmldir` and replace it with the new one
1. `    for html in $(find ./"$htmldir" -type f \( -name "*.html" \)); do`
    - find all HTML files in `htmldir`
1. `      sed -i s,"/""$fdir""/""$fname".*"$fext","$fpathfull",g "$html"`
    - replace every reference to the current file with the new file
1. `    done`
1. `  done`
    - end the for loops
1. `' exec-sh {} +`
    - end of exec command
1. (`\n`)
    - newline at EOF because git yells at me otherwise

[Source thread for the find / exec combo
](https://unix.stackexchange.com/questions/9496/looping-through-files-with-spaces-in-the-names)
