import axios, { AxiosResponse } from 'axios'
import dotenv from 'dotenv'
import querystring from 'querystring'

import { defaultHeader, HERE_API_URL } from './constants'
import { logger } from './logger'

interface LambdaResponse {
    isBase64Encoded: boolean
    statusCode: number
    body: string
    headers: any
}

export interface LambdaInputEvent {
    body: string
}

export interface Address {
    street: string
    houseNumber: string
    postalCode: string
    city: string
    country: string
}

export const handler = async (event: LambdaInputEvent): Promise<LambdaResponse> => {
    dotenv.config()
    logger.debug(`Incoming Event: ${JSON.stringify(event)}`)

    try {
        const address: Address = JSON.parse(event.body)
        logger.info(`Trying to convert Address:\n ${JSON.stringify(address)}`)

        const queryString = buildQueryString(address)
        logger.debug(`Here Query: ${queryString}`)

        const queryResponse = await queryHereApi(queryString)
        logger.info(`QueryResponse:\n ${JSON.stringify(queryResponse!.data)}`)

        return {
            isBase64Encoded: false,
            statusCode: 200,
            body: JSON.stringify(queryResponse.data.items[0].position),
            headers: defaultHeader
        }
    } catch (e) {
        logger.error(`Error during lambda execution: ${e}, ${JSON.stringify(e)}`)
        return {
            isBase64Encoded: false,
            statusCode: 500,
            body: JSON.stringify(e),
            headers: defaultHeader
        }
    }
}

async function queryHereApi(queryString: string): Promise<{ data: any }> {
    const apiKey = process.env.HERE_API_KEY
    if (!apiKey) {
        throw Error('API KEY NOT DEFINED!')
    }
    const result = await axios.get<AxiosResponse<object>>(`${HERE_API_URL}?qq=${queryString}&apiKey=${apiKey}`)
    if (!result) {
        throw Error('Request to HERE Api failed')
    }
    return result
}

function buildQueryString({ street, houseNumber, city, country, postalCode }: Address): string {
    return querystring.stringify({ city, street, country, houseNumber, postalCode }, ';', '=')
}
