#!/usr/bin/env bash

for f in *.md;
do
	[ -f "$f" ] || break;
	echo "Processing $f"

	OUT=~/public_html/$(echo $f | sed 's/\.md/\.html/')
	cp template.html $OUT

	pandoc -f markdown < $f >page.temp
	sed "/%PAGE%/{r page.temp
		      d
		      }" -i $OUT
	rm page.temp

	sed "s/%FOOTER%/Built on $HOSTNAME at $(date)/" -i $OUT 
	chmod a+rx $OUT
done

