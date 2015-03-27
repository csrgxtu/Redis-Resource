var request = require('sync-request');
var decode = require('base64').decode;
var fs = require('fs');
var geolib = require('geolib');

//var api = 'http://api.map.baidu.com/ag/coord/convert?from=0&to=4&x=112.8960295000&y=28.2226009000&ak=ECd608dc638e15bd4b62af23c608fb6a';

// read rand250 to matrix
var data = fs.readFileSync('rand250', 'utf8');
var tmps = data.split('\n');
var datas = [];
for (var i = 0; i < tmps.length - 1; i++) {
  var tmp = tmps[i].split(',');
  datas.push(tmp);
}

// convert from 0 to 4
var api = 'http://api.map.baidu.com/ag/coord/convert?from=0&to=4&ak=ECd608dc638e15bd4b62af23c608fb6a';
for (var i = 0; i < datas.length; i++) {
  var x = datas[i][3];
  var y = datas[i][2];
  var url = api + '&x=' + x + '&y=' + y;
  //console.log(url);
  var response = request('GET', url);
  if (response.statusCode !== 200) {
    console.log('ERROR 0 -> 4');
  } else {
    var json = JSON.parse(response.body);
    var rx = decode(json.x);
    var ry = decode(json.y);
    datas[i].push(ry);
    datas[i].push(rx);
  }
}


// convert from 2 to 4
var api = 'http://api.map.baidu.com/ag/coord/convert?from=2&to=4&ak=ECd608dc638e15bd4b62af23c608fb6a';
for (var i = 0; i < datas.length; i++) {
  var x = parseFloat(datas[i][3]);
  var y = parseFloat(datas[i][2]);
  var url = api + '&x=' + x + '&y=' + y;
  var response = request('GET', url);
  if (response.statusCode !== 200) {
    console.log('ERROR 2 -> 4');
  } else {
    var json = JSON.parse(response.body);
    var rx = decode(json.x);
    var ry = decode(json.y);
    datas[i].push(ry);
    datas[i].push(rx);
  }
}

// get Baidu's default GPS data according to the name
var api = 'http://api.map.baidu.com/geocoder/v2/?output=json&ak=ECd608dc638e15bd4b62af23c608fb6a&address=';
for (var i = 0; i < datas.length; i++) {
  var addr = datas[i][1];
  var url = api + addr;
  var response = request('GET', url);
  if (response.statusCode !== 200) {
    console.log('ERROR geocoder');
  } else {
    var json = JSON.parse(response.body);
    var rx = json.result.location.lat;
    var ry = json.result.location.lng;
    datas[i].push(rx);
    datas[i].push(ry);
  }
}


// calculate the distance
var dist0 = [];
var dist1 = [];
var dist2 = [];
for (var i = 0; i < datas.length; i++) {
  var tmp0 = geolib.getDistance({latitude:datas[i][2], longitude:datas[i][3]}, {latitude:datas[i][8], longitude:datas[i][9]});
  //var tmp1 = geolib.getDistance({latitude:datas[i][4], longitude:datas[i][5]}, {latitude:datas[i][6], longitude:datas[i][7]});
  var tmp1 = geolib.getDistance({latitude:datas[i][4], longitude:datas[i][5]}, {latitude:datas[i][8], longitude:datas[i][9]});
  var tmp2 = geolib.getDistance({latitude:datas[i][6], longitude:datas[i][7]}, {latitude:datas[i][8], longitude:datas[i][9]});
  dist0.push(tmp0);
  dist1.push(tmp1);
  dist2.push(tmp2);
}

var sum0 = 0;
for (var i = 0; i < dist0.length; i++) {
  sum0 += dist0[i];
}

var sum1 = 0;
for (var i = 0; i < dist1.length; i++) {
  sum1 += dist1[i];
}

var sum2 = 0;
for (var i = 0; i < dist2.length; i++) {
  sum2 += dist2[i];
}

//console.log('DEBUG: ' + sum0);
//console.log('DEBUG: ' + dist0.length);
console.log(datas);
//console.log(dist1);
console.log('ORI->Baidu 0->Baidu 2->Baidu');
console.log(sum0/dist0.length + ', ' + sum1/dist1.length + ', ' + sum2/dist2.length);
