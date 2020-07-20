# address-validator-net

A library providing a wrapper for [api.address-validator.net](https://www.address-validator.net/api.html)

## Installation

```shell
npm install address-validator-net
```

## Usage

The API supports Address Autocomplete and Address Validation.

1) Address Autocomplete (https://www.address-validator.net/api.html#address-autocomplete-api)

```js
import AddressValidator from 'address-validator-net'

// YOUR_API_KEY is a string
const { autocomplete, retrieve, validate } = AddressValidator(YOUR_API_KEY)

const responseObject1 = await autocomplete({ Query: 'Mühlenstraße 26, Ocholt' }) // searches for autocompletions

/*
  responseObject1 looks like this:
  {
    status: UNVERIFIED or error: DELAYED, RATE_LIMIT_EXCEEDED, API_KEY_INVALID_OR_DEPLETED
    results: [
      {
        description: 'Große Mühlenstraße 26, 26655 Westerstede, Niedersachsen',
        id: 'WVR7sXOZ8BbhnDYygzULO6Efzk-ax359UQ',
      },
      {
        description: 'Mühlenstraße 26, 26655 Westerstede, Niedersachsen',
        id: 'WFR7sEMtAp2323YTbCGdecjpUk-ax35tEA',
      },
    ],
  }

  => https://www.address-validator.net/api.html#address-autocomplete-api

*/

// Now we can retrieve the resultId the user selected:
const responseObject2 = await retrieve({
  ID: 'WFR7sEMtAp2323YTbCGdecjpUk-ax35tEA',
}) // retrieves the suggested address

/*
  responseObject2 looks like this:
  {
    status: UNVERIFIED or error: DELAYED, RATE_LIMIT_EXCEEDED, API_KEY_INVALID_OR_DEPLETED
    addressline1: 'Mühlenstraße 26',
    addressline3: '26655 Westerstede',
    city: 'Westerstede',
    country: 'DE',
    formattedaddress: 'Mühlenstraße 26,26655 Westerstede',
    postalcode: '26655',
    state: 'Niedersachsen',
    street: 'Mühlenstraße',
    streetnumber: '26',
  }
*/
```
2) Address Validation (https://www.address-validator.net/api.html#address-validation-api)

```js
const responseObject = await validate({
  City: 'Ocholt',
  CountryCode: 'de',
  PostalCode: '26655',
  StreetAddress: 'Mühlenstraße 26',
}) // validates the provided address

/*
  responseObject looks like this:
  {
    status: VALID, SUSPECT, INVALID or error: DELAYED, RATE_LIMIT_EXCEEDED, API_KEY_INVALID_OR_DEPLETED
    addressline1: 'Mühlenstr. 26',
    addressline3: '26655 Westerstede',
    city: 'Westerstede',
    country: 'DE',
    formattedaddress: 'Mühlenstr. 26,26655 Westerstede',
    postalcode: '26655',
    state: 'Niedersachsen',
    street: 'Mühlenstr.',
    streetnumber: '26',
  }

  => https://www.address-validator.net/api.html#address-validation-api

*/
```

## Tests

```shell
npm test
```

## Release History

- 2.0.0 Rewrite in Typescript and using Promises
- 0.1.0 Initial release
