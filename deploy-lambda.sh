#!/usr/bin/env bash

npm run build
aws lambda update-function-code --function-name arn:aws:lambda:eu-west-1:198891906952:function:HelpOnSpot-geopoint --zip-file fileb://app.zip