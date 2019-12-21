#!/usr/bin/env bash

for f in *.md; do
  [ -f "$f" ] || break
  if [ "$f" = "README.md" ]; then
    break
  fi

  echo "Processing $f"

  OUT=./public_html/$(echo $f | sed 's/\.md/\.html/')
  mkdir ./public_html
  cp template.html "$OUT"

  pandoc -f markdown <"$f" >page.temp
  sed "/%PAGE%/{r page.temp
		      d
		      }" -i "$OUT"
  rm page.temp

  sed "s/%FOOTER%/Built on $HOSTNAME at $(date)/" -i "$OUT"
  chmod a+rx "$OUT"
done
