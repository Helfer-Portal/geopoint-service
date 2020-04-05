import {Address, EventPayload, handler} from './index';

(async function() {
  const address: Address = {
    city: "München",
    country: "Germany",
    zip: "",
    street: "",
    hn: ""
  };
  const requestObject: EventPayload = {
    body: JSON.stringify(address)
  };
  const result = await handler(requestObject);
  console.log(result);
})();
