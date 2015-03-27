/**
 * Author: Archer Reilly
 * Date: 10/DEC/2014
 * File: CronTaskController.js
 * Desc: responsible schedule the tasks.
 *
 * Produced By Ebang
 */
var url = require('url');
module.exports = {
  upload: function(req, res) {
    console.log('DEBUG: Fuck Ya');
    var result = {
      name: 'archer',
    };
    return res.send(result);
  },

	index: function(req, res) {
	    var userId = req.session.loginInfo.userInfo.UserId;
	    //var viewUrl = 'xfjwt/cronTask';
      var viewUrl = 'xfjwt/dynamicPlan';
	    var title = '动态预案生成';
	    var menu = '动态预案';
	    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
	},
	
	test: function(req, res) {
	  var url = req._parsedUrl.pathname;
	  var query = req.query;
	  console.log(req.query);
	  return res.send(url);
	},
	
	cb: function(req, res) {
	  console.log('cb invokded');
	  return true;
	},
	
	invokecb: function(req, res) {
	  //sails.controllers.Test.cb();
	  sails.controllers.TestController.cb();
	  return res.send('ok');
	},
	
	testG2B: function(req, res) {
	  var geos = '27.8579378889,112.9006352924;26.9012372275,112.5889794468';
	  return res.send(GeoConvertService.g2b(geos));
	},
	
	getShuiYuanIds: function(req, res) {
	  var sql = "SELECT ShuiYuanId FROM xfjwt_ShuiYuan";
	  XFJWT_ShuiYuan.query(sql, function(err, recs) {
	    if (err) {
	      sails.config.returnCode.DB_ERROR.data = err;
	      return res.send(sails.config.returnCode.DB_ERROR);
	    }
	    
	    var data = "";
	    for (var i = 0; i < recs.length; i++) {
	      data += recs[i].ShuiYuanId + "\n";
	    }
	    
	    sails.config.returnCode.QUERY_OK.data = data;
	    return res.send(data);
	  });
	},
	
	getFireKeyUnitIds: function(req, res) {
	  var sql = "SELECT FireKeyUnitId FROM xfjwt_FireKeyUnit";
	  XFJWT_FireKeyUnit.query(sql, function(err, recs) {
	    if (err) {
	      sails.config.returnCode.DB_ERROR.data = err;
	      return res.send(sails.config.returnCode.DB_ERROR);
	    }
	    
	    var data = "";
	    for (var i = 0; i < recs.length; i++) {
	      data += recs[i].FireKeyUnitId + "\n";
	    }
	    
	    return res.send(data);
	  });
	},
	
	getMHDWIds: function(req, res) {
	  var sql = "SELECT ID FROM YAGL_MHDW";
	  XFJWT_CronTask.query(sql, function(err, recs) {
	    if (err) {
	      sails.config.returnCode.DB_ERROR.data = err;
	      return res.send(sails.config.returnCode.DB_ERROR);
	    }
	    
	    var data = "";
	    for (var i = 0; i < recs.length; i++) {
	      data += recs[i].ID + "\n";
	    }
	    
	    return res.send(data);
	  });
	},
	
	getXFJGIds: function(req, res) {
	  var sql = "SELECT ID FROM JGXX_XFJG";
	  XFJWT_CronTask.query(sql, function(err, recs) {
	    if (err) {
	      sails.config.returnCode.DB_ERROR.data = err;
	      return res.send(sails.config.returnCode.DB_ERROR);
	    }
	    
	    var data = "";
	    for (var i = 0; i < recs.length; i++) {
	      data += recs[i].ID + "\n";
	    }
	    
	    return res.send(data);
	  });
	},
}
