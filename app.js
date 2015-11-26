var unirest = require('unirest');
var hookUrl = "https://webaroo-mobile-verification.p.mashape.com/mobileVerification";

module.exports = function(apikey) {
  if (!isValidAPIKey(apikey)) {
    throw new Error("No valid API Key!");
  }
  return function(phone, cb){
    var url = hookUrl +"?"+
    "phone="+phone
    unirest.get(url)
    .header("X-Mashape-Key", apikey)
    .header("Accept", "application/json")
    .end(function (response) {
      if (response.status == 200){
        cb({
          getAPIKey: function() {
            return apikey;
          },
          getNumber: function() {
            return phone;
          },
          success: function() {
            return JSON.parse(response.body).status;
          },
          showResponse: function() {
            return JSON.parse(response.body).data;
          }
        });
      } else {
        cb(false);
      }
    });
  }
}

function isValidAPIKey(apikey) {
  var regex = /^[a-zA-Z0-9]{50}$/g;
  return regex.test(apikey);
}
