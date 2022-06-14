#!/bin/bash

set -ue

git push origin master

bin/dep deploy -- production
