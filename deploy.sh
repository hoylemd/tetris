#! /bin/bash

# increment version first
is_version_modified=$(git status | grep 'modified:   version')

if [ "$is_version_modified" ]; then
  version=$(<version)
else
  echo "version has not been updated. please do that first."
  exit 1
fi

git co -b deploy-$version
gulp deploy
git add -f dist/*
git commit -m "deploy version $version"
git tag $version
git push --tags
git co -
git add version
git commit -m "update version #"
