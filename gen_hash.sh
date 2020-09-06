#!/bin/sh
export cssjsdir="css-js"
export htmldir="html"
export shorthash=0
find "./""$cssjsdir" -type f \( -name '*.js' -o -name '*.css' \) -exec sh -c '
  for file do
    fdir=$(dirname "$file" | cut -c 3-65535 | sed s,"$cssjsdir""/",,g)
    fname=$(basename "$file" | cut -d "." -f 1)
    fext=$(basename "$file" | cut -d "." -f 2)
    fhashfull=$(sha256sum "$file" | cut -d " " -f 1)
    if [ "$shorthash" -eq 1 ]; then
      fhash=$(echo "$fhashfull" | cut -c 1-8)
    else
      fhash="$fhashfull"
    fi
    fpathfull="/""$fdir""/""$fname"-"$fhash"."$fext"
    echo "$fpathfull"
    mkdir -p "$htmldir"/"$fdir"
    rm "$htmldir"/"$fdir"/"$fname"*"$fext"
    cp "$file" "$htmldir"/"$fdir"/"$fname"-"$fhash"."$fext"
    for html in $(find ./"$htmldir" -type f \( -name "*.html" \)); do
      sed -i s,"/""$fdir""/""$fname".*"$fext","$fpathfull",g "$html"
    done
  done
' exec-sh {} +
