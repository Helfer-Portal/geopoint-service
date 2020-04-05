import {Address, EventPayload, handler} from './index';

(async function() {
  const address: Address = {
    city: "München",
    country: "Germany",
    zip: "81539 ",
    street: "Deisenhofenerstrasse",
    hn: "34"
  };
  const requestObject: EventPayload = {
    body: JSON.stringify(address)
  };
  const result = await handler(requestObject);
  console.log(result);
})();
