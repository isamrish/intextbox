#!/bin/bash
set -e

echo "Bumping versions using changesets..."
npx @changesets/cli version

echo "Committing version changes..."
git add .
git commit -s -m "chore(release): version bump via changesets"

echo "Publishing packages..."
npx @changesets/cli publish

echo "Pushing commits to remote..."
git push origin main
