#!/usr/bin/env sh

npm run build

#copy index.html and rename it 404.html in dist folder

cd dist
git init
git checkout -B master
git add -A
git commit -m 'deploy'
git push -f git@github.com:vervaine/advent_calendar.git master:gh-pages
cd ..

