import {Address, LambdaInputEvent, handler} from './index';
import {logger} from "./logger";

(async function() {
  const address: Address = {
      "city": "München",
      "country": "Germany",
      "zip": "81541",
      "street": "Zugspitzstrasse",
      "hn": "19"
  };
  const requestObject: LambdaInputEvent = {
    body: JSON.stringify(address)
  };
  const result = await handler(requestObject);
  logger.info(JSON.stringify(result))
})();
