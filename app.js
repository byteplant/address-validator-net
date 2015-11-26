var unirest = require('unirest');
var hookUrl = "https://api.address-validator.net/api/verify";

module.exports = function(apikey) {
  if (!isValidAPIKey(apikey)) {
    throw new Error("No valid API Key!");
  }
  return function(address, cb){
    var url = hookUrl +"?"+
    "StreetAddress="+address.StreetAddress+
    "&City="+address.City+
    "&PostalCode="+address.PostalCode+
    "&CountryCode="+address.CountryCode+
    "&APIKey="+apikey;
    unirest.get(url).end(function (response) {
      var resp = response.body;
      var formattedaddress = resp.formattedaddress;
      var status = resp.status;
      delete resp.status;
      delete resp.formattedaddress;
      cb({
        getAPIKey: function() {
          return apikey;
        },
        getAddress: function() {
          return address;
        },
        isValid: function() {
          return status;
        },
        serialized: function() {
          if (this.isValid == "INVALID") {
            return false;
          } else {
            return resp;
          }
        },
        serializedString: function() {
          if (this.isValid == "INVALID") {
            return false;
          } else {
            return formattedaddress;
          }
        }
      });
    });
  }
}

function isValidAPIKey(apikey) {
  if (apikey.substring(0, 3) == "iv-") {
    var regex = /^[a-f0-9]{32}$/g;
    return regex.test(apikey.substring(3));
  } else {
    return false;
  }
}
