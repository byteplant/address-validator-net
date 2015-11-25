var addressValidator = require('./')("iv-ae8974a7adf18cea9dc2e055739fa6b6");
var address1 = addressValidator("Mühle");
console.log(address1.getAPIKey(), address1.getAddress());
