#!/bin/sh
export cssjs="css-js"
find "./""$cssjs" -type f \( -name '*.js' -o -name '*.css' \) -exec sh -c '
  for file do
    fdir=$(dirname "$file" | cut -c 3-65535 | sed s,"$cssjs""/",,g)
    fname=$(basename "$file" | cut -d "." -f 1)
    fext=$(basename "$file" | cut -d "." -f 2)
    fhash=$(sha256sum "$file" | cut -d " " -f 1)
    # fhashshort=$(echo "$fhash" | cut -c 1-8)
    fpathfull="/""$fdir""/""$fname"-"$fhash"."$fext"
    echo "$fpathfull"
    mkdir -p html/"$fdir"
    rm html/"$fdir"/"$fname"*"$fext"
    cat "$file" > html/"$fdir"/"$fname"-"$fhash"."$fext"
    for html in $(find ./html -type f \( -name "*.html" \)); do
      sed -i s,"/""$fdir""/""$fname".*"$fext","$fpathfull",g "$html"
    done
  done
' exec-sh {} +
