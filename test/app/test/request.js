var request = require('request');

var url = 'http://localhost:1989/DynamicPlan/getData?id=ffb510408f9d47e6bf7afe2c748f8a8b';

request(url, function(error, response, body) {
  console.log(response.request.uri.query.split('=')[1]);
});
