var http = require('http');

var options = {
  host: 'api.map.baidu.com',
  path: '/geoconv/v1/?from=3&to=5&ak=ECd608dc638e15bd4b62af23c608fb6a&coords=',
};

callback = function(response) {
  var str = '';

  response.on('data', function(trunk) {
    str += trunk;
  });

  response.on('end', function() {
    console.log(str);
  });
}

var lat = '27.8579378889';
var lon = '112.9006352924';
options.path += lat + ',' + lon;
//console.log(options);
http.request(options, callback).end();
