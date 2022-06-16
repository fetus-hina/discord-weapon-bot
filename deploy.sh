#!/bin/bash

set -ue

LATEST_VERSION=$(git tag | grep ^v | sort -nr | head -n 1)

echo "Deploying $LATEST_VERSION"
git push origin master $LATEST_VERSION
bin/dep deploy --tag=$LATEST_VERSION -- production
