import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

interface Position {
    lat: number;
    lng: number;
}

export interface EventPayload {
    body: string;
}

export interface Address {
    street: string;
    hn: string;
    zip: string;
    city: string;
    country: string;
}

export const handler = async (event: EventPayload): Promise<Position> => {
    dotenv.config();

    const apiKey = process.env.HERE_API_KEY;
    if (!apiKey) {
        throw Error('API KEY NOT DEFINED!');
    }
    const address: Address = JSON.parse(event.body);

    console.log(address);

    const queryString = buildQueryString(address);

    console.log(queryString);

    let result: any;
    try {
        result = await axios.get<AxiosResponse<object>>(`https://geocode.search.hereapi.com/v1/geocode?qq=${queryString}&apiKey=${apiKey}`)
    } catch(error) {
        console.error(error);
    }

    if (result) {
        console.log(JSON.stringify(result!.data));
    }

    return result.data.items[0].position;
};

function buildQueryString({ street, hn, city, country, zip }: Address): string {
    return querystring.stringify({ city, street, country, houseNumber: hn, postalCode: zip }, ';', '=');
}
