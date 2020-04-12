import { Address, handler, LambdaInputEvent } from './index'
import { logger } from './logger'
;(async function () {
    const address: Address = {
        city: 'München',
        country: 'Germany',
        postalCode: '81541',
        street: 'Zugspitzstrasse',
        houseNumber: '19'
    }
    const requestObject: LambdaInputEvent = {
        body: JSON.stringify(address)
    }
    const result = await handler(requestObject)
    logger.info(JSON.stringify(result))
})()
