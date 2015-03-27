/**
 * Author: Archer Reilly
 * Date: 11/Mar/2015
 * File: CORSControllers.js
 * Desc: test CORS in sailsjs.
 *
 * Produced By Ebang
 */
var formidable = require('formidable');
var util = require('util');

module.exports = {
  index: function(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="http://csrgxtu.com:1999/CORS/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  },

  upload: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      //return res.send('received');
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
  },
}
