#!/usr/bin/env bash

npm run build
aws lambda update-function-code --function-name arn:aws:lambda:eu-central-1:198891906952:function:HoS-geolocation-dev --zip-file fileb://app.zip