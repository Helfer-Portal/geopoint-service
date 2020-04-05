import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import {logger} from "./logger";

interface LambdaResponse {
    isBase64Encoded: Boolean
    statusCode: number
    body: string,
    headers: any
}


export interface LambdaInputEvent {
    body: string;
}

export interface Address {
    street: string;
    hn: string;
    zip: string;
    city: string;
    country: string;
}


export const handler = async (event: LambdaInputEvent): Promise<LambdaResponse> => {
    dotenv.config();
    logger.debug(`Incoming Event: ${JSON.stringify(event)}`)
    const apiKey = process.env.HERE_API_KEY;
    if (!apiKey) {
        throw Error('API KEY NOT DEFINED!');
    }
    const address: Address = JSON.parse(event.body);
    logger.debug(`Address: ${JSON.stringify(address)}`)

    const queryString = buildQueryString(address);
    logger.debug(`Here Query: ${queryString}`)

    let result: any;
    try {
        result = await axios.get<AxiosResponse<object>>(`https://geocode.search.hereapi.com/v1/geocode?qq=${queryString}&apiKey=${apiKey}`)
    } catch(error) {
        logger.error(error)
    }

    if (result) {
        logger.debug(`SearchResult: ${JSON.stringify(result!.data)}`)
    }

    return {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify(result.data.items[0].position),
        headers: {
            'Content-Type': "application/json"
        }
    }
};

function buildQueryString({ street, hn, city, country, zip }: Address): string {
    return querystring.stringify({ city, street, country, houseNumber: hn, postalCode: zip }, ';', '=');
}
