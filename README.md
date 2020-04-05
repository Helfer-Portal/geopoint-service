![.github/workflows/deploy-lambda.yml](https://github.com/Helfer-Portal/geopoint-service/workflows/.github/workflows/deploy-lambda.yml/badge.svg?branch=master)

# geopoint-service


Convert addresses to geopoints


## deploy 
Service is deployed as a AWS lambda behind a API gateway

Builds from master are automatically deployed via github

If you want to do it manually:
* install `aws cli`
* run `aws configure` to setup aws credentials
* run `deploy-lambda.sh`


## how to use
* POST an `Address` to `/geopoint` to receive a `Position`
* sample curl:

```
curl -X POST \
   https://m8v8hor698.execute-api.eu-central-1.amazonaws.com/geopoint \
   -H 'Accept: */*' \
   -H 'Content-Type: application/json' \
   -H 'Host: m8v8hor698.execute-api.eu-central-1.amazonaws.`com' \
   -d '{
 	"city": "München",`
     "country": "Germany",`
     "zip": "81541",
     "street": "Zugspitzstrasse",
     "hn": "19"
 }'
