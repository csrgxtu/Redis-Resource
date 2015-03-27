
/**
* Author: Archer Reilly
* File: RoleController.js
* Date: 25/May/2014
* Des: controller for Role model
*
* Produced By EBang.
*/
module.exports = {
/**
* create
* create a role in the role table
*
* @param roleName
* @param description
* @param createdBy
* @param clientId int
* @return RESTful Json
*/
  realTimeGps: function(req,res){
    var userId = req.session.loginInfo.userInfo.userid;
    var viewUrl = 'gpsHistory';
    var title = '实时轨迹';
    var menu = 'gps';
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
    //return res.view('gpsHistory.ejs');
  },
  historyGps: function(req,res){
    var userId = req.session.loginInfo.userInfo.userid;
    var viewUrl = 'xfjwt/baiduGpsTracks';
    var title = 'history轨迹';
    var menu = 'gps';
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
    //return res.view('gpsHistory.ejs');
  },
  taskGpsSurface: function(req, res) {
    var userId = req.session.loginInfo.userInfo.userid;
    var viewUrl = 'takGps';
    var title = '实时轨迹';
    var menu = 'gps';
    ReviewService.getViewPassSurface(res,userId,viewUrl,title,menu);
  },
  taskGpsAndroid:function(req,res){
    return res.view('taskGps',{layout:null,title:'任务轨迹'});
  },


  save: function(req, res) {
    var data = req.param('data');
    if(data == null || data == '') {
      // console.log("Debug: whtat the fuck!!!");
      return res.send(sails.config.returnCode.LoseSomeParamters);
    }
    data = JSON.parse(data);
    data = data.data;
    console.log("Debug: ");
    console.log(data);

    if (data[0].batchId == null || data[0].batchId == ''
    || data[0].batchId < 0) {
      console.log("Debug: entering without batchId");
      GpsHistory.find().limit(1).sort('BatchId DESC')
      .exec(function(err, recs) {
        if (err) {
          return res.send(sails.config.errorCode.UnexpectedDbError);
        }
        if (recs.length == 0) {
          BatchId = 0;
        } else {
        if (recs[0].BatchId == null || recs[0].BatchId == '') {
          BatchId = 0;
        }
        BatchId = recs[0].BatchId;
        }
        BatchId = BatchId + 1;

        for (var i = 0; i < data.length; i++) {
          data[i].batchId = BatchId;
        }
        console.log("Debug data: ");
        console.log(data);
        // if need get taskid, then need get userid too according to
        // its username
        console.log("Debug data.length: " + data.length);
        for (var i = 0; i < data.length; i++) {
          var jsonData = {
            'deviceNumber': data[i].deviceNumber,
            'lat': data[i].lat,
            'lon': data[i].lon,
          };
          GpsService.geofenceRuleChecker(req, res, jsonData);
          GpsService.setGpsInfo(req, res, data[i]);
        }
      });
    } else {
      for (var i = 0; i < data.length; i++) {
        var jsonData = {
          'deviceNumber': data[i].deviceNumber,
          'lat': data[i].lat,
          'lon': data[i].lon,
        };
        GpsService.setGpsInfo(req, res, data[i]);
        GpsService.geofenceRuleChecker(req, res, jsonData);
      }
    }
  },
  read: function(req, res) {
    var startTime = req.param('startTime');
    var endTime = req.param('endTime');
    if (startTime == null || startTime == '') {
      return res.send({
        code: 403,
        msg: 'Invalid Param',
        description: '参数错误',
        data: null,
      });
    }
    if (endTime == null || endTime == '') {
      endTime = UtilityService.getCurrentTime();
    } else {
    //endTime = new Date(endTime).toISOString();
    }
    var sql = "select g.GpsHistoryId,g.BatchId,u.DisplayName as UserName,g.DeviceType,g.DeviceNumber,g.Lat,g.Lon,g.Speed,g.EventTime,g.CreatedBy,g.CreatedTime from GpsHistory g inner join User u on u.UserName = g.UserName where g.EventTime >= '"+startTime+"' and g.EventTime <= '"+endTime+"' ORDER BY BatchId, EventTime";
    GpsHistory.query(sql, function(err, recs) {
    if (err) {
      return res.send({
        code: 500,
        msg: 'DATABASE ERROR',
        data: err,
      });
    }

    return res.send({
      code: 200,
      msg: 'SUCCESSFUL',
      data: recs,
      });
    });
  },
    // for socketio
    subscribe: function(req, res) {
      GpsHistory.find(function(err, recs) {
        if (err) return next(err);
        GpsHistory.subscribe(req.socket);
        GpsHistory.subscribe(req.socket, recs);
      });
  },
}