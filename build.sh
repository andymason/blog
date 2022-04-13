#!/bin/bash

BUILD_DIR=build

# Create build folder if needed
if [ ! -d $BUILD_DIR ]; then
  mkdir $BUILD_DIR
fi

# Clean out old posts
rm -f $BUILD_DIR/*.html

# Convert all markdown posts into HTML
for file in posts/{*,**/*}.md;
do
  [[ -e "$file" ]] || break  # handle no *.md files
  
  echo -e "Rendering $file";

  pandoc \
    --template=posts/assets/template.html \
    --from=markdown+emoji \
    --to=html \
    --output="$BUILD_DIR/$(basename "$file" .md).html" \
    "$file";
done

# Copy assets
echo -e "\nCopying asset files...\n";
cp -rv posts/assets  $BUILD_DIR