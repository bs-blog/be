#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
   echo "1- unit test fail"
fi

if [ "$TRAVIS_PULL_REQUEST" = "false" ] ; then
   echo "2- unit test fail"
fi

curl -H "Authorization: token ${github_token}" -X POST \
-d "{\"body\": \"Hello world\"}" \
"https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
