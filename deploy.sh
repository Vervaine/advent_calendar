#!/usr/bin/env sh

# abort on errors
set -e

# build

# navigate into the build output directory

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
cd dist

npm run build

git init
git checkout -B master
git add -A
git commit -m 'deploy'
git push -f git@github.com:vervaine/advent_calendar.git master:gh-pages

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:vervaine/advent_calendar.git master:gh-pages

cd -
