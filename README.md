address-validator
=========

A small library providing a wrapper for api.address-validator.net with unirest

## Installation

  npm install address-validator

## Usage

  var addressValidator = require('address-validator')(apiKey);
  
  var address1 = addressValidator(address); //validates address object
  Address object like this:
  {
    StreetAddress : "Mühlenstraße 26",
    City          : "Ocholt",
    PostalCode    : "26655",
    CountryCode   : "de"
  }

  address1.isValid() //string "VALID", "SUSPECT" or "INVALID"
  
  address1.serialized() //object if valid address, else false
  Output like this:
  {
    street: 'Mühlenstr.',
    streetnumber: '26',
    postalcode: '26655',
    city: 'Westerstede,Ocholt',
    state: 'Lower Saxony',
    country: 'DE'
  }
  
  address1.serializedString() //string if valid address, else false
  Output like this:
  "Mühlenstr. 26,26655 Westerstede,DE"
  
## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
