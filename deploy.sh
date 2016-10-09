#! /bin/bash

# increment version first

version=$(<version)

git co -b deploy-$version
gulp deploy
git add -f dist/*
git commit -m "deploy version $version"
git tag $version
git push --tags
git co -
git add version
git commit -m "update version #"
