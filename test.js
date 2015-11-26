var addressValidator = require('./')("iv-ae8974a7adf18cea9dc2e055739fa6b6");
var address1 = addressValidator({
    StreetAddress : "Mühlenstraße 26",
    City          : "Ocholt",
    PostalCode    : "26655",
    CountryCode   : "de"
  }, function(response) {
    console.log(response.getAPIKey(), response.getAddress(), response.serialized(), response.isValid(), response.serializedString());
  });
