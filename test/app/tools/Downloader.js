/**
 * Author: Archer Reilly
 * Date: 03/Feb/2015
 * File: Downloader.js
 * Desc: download yu'an asynchrously
 *
 * Produced By Ebang.
 */
var request = require('request');
var fs = require('fs');

var PATH = '/home/archer/Documents/tmp/OffLineData';

// callbacks here
var writercb = function(err) {
  //console.log();
}

var requestcb = function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var filename = PATH + '/' + response.request.uri.query.split('=')[1];
    fs.writeFile(filename, body, 'utf8', writercb);
  }
}

var readercb = function(err, data) {
  if (err) {
    process.exit(1);
  }

  var ids = data.split('\n');

  var URL = 'http://localhost:1989/DynamicPlan/getData?id=';
  for (var i = 0; i < ids.length; i++) {
    var url = URL + ids[i];
    request(url, requestcb);
  }
}

var filename = './yaDownloader.txt';
fs.readFile(filename, 'utf8', readercb);
