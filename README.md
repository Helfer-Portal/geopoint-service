![.github/workflows/deploy-lambda.yml](https://github.com/Helfer-Portal/geopoint-service/workflows/.github/workflows/deploy-lambda.yml/badge.svg?branch=master)

# geopoint-service
Convert Address(s) to Location(s)


## deploy 
Service is deployed as a AWS lambda behind a API gateway
Builds from master are automatically deployed via github

If you want to do it manually:
* install `aws cli`
* run `aws configure` to setup aws credentials
* run `deploy-lambda.sh`

## how to call 
* integrates into API gateway's `/geopoint` (POST)
* see swagger file `api-gateway.yml` in [API Gateway repo](https://github.com/Helfer-Portal/helponspot-api-gateway)
for further documentation



