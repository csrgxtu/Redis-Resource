/**
 * Author: Archer Reilly
 * Date: 26/Jan/2015
 * File: OffLineDataGenerateController.js
 * Desc: generate sqlite3 offline data for ShuiYuan, FireKeyUnit,
 * Yu'An
 *
 * Produced By Ebang.
 */
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

module.exports = {
  /**
   * sqlite3
   * generate sqlite3 file from mysql
   *
   * @param void
   * @return sqlite3 file or RESTful Json
   */
  sqlite3: function(req, res) {
    OffLineDataService.sqlite3();
    return res.send(sails.config.returnCode.QUERY_OK);
  },
  
  /**
   * ya
   * generate ya html file
   *
   * @param void
   * @return ya file or RESTful Json
   */
  ya: function(req, res) {
    var sql = "SELECT DXID FROM YAGL_YAJBXX WHERE DXID IS NOT NULL";
    XFJWT_FireKeyUnit.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      var path = sails.config.OffLineData.yaDir;
      var cmd = sails.config.OffLineData.yaDownloader;
      var toolsDir = sails.config.OffLineData.toolsDir;
      var fileName = toolsDir + '/' + 'yaDownloader.txt';

      var tmp = [];
      for (var i = 0; i < recs.length; i++) {
        tmp.push('http://localhost:' + sails.config.OffLineData.port + '/DynamicPlan/getData?id=' + recs[i].DXID);
      }
      fs.writeFileSync(fileName, tmp.join('\n'));

      var num = 20;
      var len = parseInt(tmp.length / num);
      var index = 0;
      //console.log('DEBUG: ' + tmp.length);
      for (var i = 0; i < num; i++) {
        var tmpFileName = fileName + i;
        if (i != (num - 1)) {
	 //console.log('DEBUG: ' + index + ', ' + (index + len));
          fs.writeFileSync(tmpFileName, tmp.slice(index, index + len).join('\n'));
        } else {
	 //console.log('DEBUG: ' + index);
          fs.writeFileSync(tmpFileName, tmp.slice(index).join('\n'));
        }
        index += len;
      	var tmpCmd = cmd + " -P " + path + " -i " + tmpFileName + " &";
        exec(tmpCmd);
      }
      
      // start the multi-threading downloder
      //var tmpCmd = "python " + cmd + " " + path + " " + toolsDir;
      /*var tmpCmd = cmd + " -P " + path + " -i " + fileName + " &";
      console.log('DEBUG: ' + tmp.length + ', ' + tmpCmd);
      exec(tmpCmd);*/

      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },

}
