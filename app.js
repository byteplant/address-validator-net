var unirest = require('unirest');
var hookUrl = "http://api.address-validator.net/api/verify";

module.exports = function(apikey) {
  if (!isValidAPIKey(apikey)) {
    throw new Error("No valid API Key!");
  }
  return function(address){
    return {
      getAPIKey: function() {
        return apikey;
      },
      getAddress: function() {
        return address;
      }
    }
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
