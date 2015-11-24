var unirest = require('unirest');
var hookUrl = "http://api.address-validator.net/api/verify";

module.export = function(apikey) {
  if (isValidAPIKey(apikey)) {
    console.log(apikey);
  } else {
    console.log("No valid APIKey!");
  }
}

function isValidAPIKey(apikey) {
  if (apikey.substring(0, 3) == "iv-") {
    var regex = "/^[a-f0-9]{32}$/g";
    return regex.test(apikey.substring(3));
  } else {
    return false;
  }
}
