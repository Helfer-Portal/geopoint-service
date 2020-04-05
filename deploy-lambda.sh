#!/usr/bin/env bash

zip app.zip index.js
aws lambda update-function-code --function-name arn:aws:lambda:eu-central-1:198891906952:function:HelpOnSpot-convertLocation --zip-file fileb://app.zip