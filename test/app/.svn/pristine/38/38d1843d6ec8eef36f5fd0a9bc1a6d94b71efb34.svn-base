var request = require('request');
var fs = require('fs');

if (process.argv.length != 5) {
  console.log("Usage: node yaDownloader.js port id path");
  return;
}

var port = process.argv[2];
var id = process.argv[3];
var path = process.argv[4];
var url = "http://localhost:" + port + "/DynamicPlan/getData?id=" + id;
var fileName = path + "/" + id + ".html";
request(url, function(err, response, body) {
  if (err) {
    console.log(err);
    return;
  }

  fs.writeFile(fileName, body);
});
