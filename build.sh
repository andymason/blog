#!/bin/bash

# Clean out old posts
rm -f html/*.html

# Convert all markdown posts into HTML
for file in posts/{*,**/*}.md;
do
  [[ -e "$file" ]] || break  # handle no *.md files
  
  echo "Rendering $file";

  pandoc \
    --template=assets/template.html \
    --from=markdown+emoji \
    --to=html \
    --output="html/$(basename "$file" .md).html" \
    "$file";
done
