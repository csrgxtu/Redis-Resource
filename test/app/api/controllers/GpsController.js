/**
* Author: Archer Reilly
* File: RoleController.js
* Date: 25/May/2014
* Des: controller for Role model
*
* Produced By EBang.
*/
module.exports = {
	realTimeGps: function(req,res){
		var userId = req.session.loginInfo.userInfo.UserId;
		var viewUrl = 'xfjwt/taskGps';
		var title = '实时轨迹';
		var menu = 'gps';
		ReviewService.getViewPass(res,userId,viewUrl,title,menu);
		//return res.view('gpsHistory.ejs');
	},
	historyGps: function(req,res){
	    var userId = req.session.loginInfo.userInfo.UserId;
	    var viewUrl = 'xfjwt/baiduGpsTracks';
	    var title = 'history轨迹';
	    var menu = 'gps';
	    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
	    //return res.view('gpsHistory.ejs');
	},
	taskGpsSurface: function(req, res) {
		var userId = req.session.loginInfo.userInfo.UserId;
		var viewUrl = 'xfjwt/taskGps';
		var title = '实时轨迹';
		var menu = 'gps';
		ReviewService.getViewPassSurface(res,userId,viewUrl,title,menu);
	},
	taskGpsAndroid:function(req,res){
		return res.view('taskGps',{layout:null,title:'任务轨迹'});
	},

	readLastTimePoint: function(req,res){
		//2015-09-01 00:00:00
		function formatDate(now)   {     
              var year = now.getFullYear();
              if(year < 10)
              	year = "0" + year;     
              var month = now.getMonth()+1;   
              if(month < 10)
              	month = "0" + month;  
              var date = now.getDate();
              if(date < 10)
              	date = "0" + date;      
              var hour = now.getHours();     
              if(hour < 10)
              	hour = "0" + hour;
              var minute = now.getMinutes();   
              if(minute < 10)
              	minute = "0" + minute;   
              var second = now.getSeconds();    
              if(second < 10)
              	second = "0" + second; 
              return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;     
        }  
		var second = req.param('second');
		var timestamp = Date.parse(new Date()); 
		if(second == null || second == '' || second > 3600)
			return res.send({code: 403,msg:'second is null or greater than one hour',data: ''});
		second = parseInt(second + "000")
		var relateTimestamp = timestamp - second;
		var n = new Date(timestamp);
		var d = new Date(relateTimestamp);
		var time = formatDate(n);
		var realateTime = formatDate(d);
		var sql = "select o.OrgName,u.DisplayName, gps.* from GpsHistory gps inner join User u on u.UserName = gps.UserName "
                 +"inner join Organization o on u.OrganizationId = o.OrganizationId "
                 + "INNER JOIN (select * from GpsHistory where EventTime > '"+realateTime+"' "
				 + "and EventTime < '"+time+"' order by EventTime desc) gps2 "
                 + "on gps.GpsHistoryId = gps2.GpsHistoryId GROUP BY gps.UserName ";
	    GpsHistory.query(sql,function(err,result){
			if(err)
				return res.send({code: 500,msg: 'databases err',data: ''});
			return res.send({code: 200,mgs: 'successfully',data: result});
		})

	/*	var paramSecond = req.param('second');
		var time =  UtilityService.getCurrentTime();
		var hour = parseInt(time.substring(11,13));
		var minute = parseInt(time.substring(14,16));
		var second = parseInt(time.substring(17,19));
		if(paramSecond == null || paramSecond == '' || paramSecond > 3600)
			return res.send({code: 403,msg:'second is null or greater than one hour',data: ''});
		paramSecond = parseInt(paramSecond);
		var length = time.length;
		var nowHour = hour;
		var nowMinute = parseInt(paramSecond/60) + minute;
		var nowTime;
		var nowSecond = paramSecond%60 + second;
		if(nowSecond < 10 ){
			console.log(1);
			nowSecond = "0" + nowSecond;
			if(nowMinute < 10){
				nowMinute = "0" + nowMinute;
			}else if(nowMinute < 60){

			}else{
				nowMinute = nowMinute%60;
				nowHour += 1;
			}
			nowTime = time.substring(0,10) + " " + nowHour + ':' + nowMinute + ':' + nowSecond;
		}else if(nowSecond < 60){
			console.log(2);
			if(nowMinute < 10){
				nowMinute = "0" + nowMinute;
			}else if(nowMinute < 60){

			}else{
				nowMinute = nowMinute%60;
				nowHour += 1;
			}
			nowTime = time.substring(0,10) + " " + nowHour + ':' + nowMinute + ':' + nowSecond;
		}else{
			console.log(3);
			nowSecond = nowSecond%60;
			if(nowSecond < 10)
				nowSecond = "0" + nowSecond;
			nowMinute = nowMinute + 1;
			if(nowMinute < 10){
				nowMinute = "0" + nowMinute;
			}else if(nowMinute < 60){

			}else{
				nowMinute = nowMinute%60;
				if(nowMinute < 10)
					nowMinute = '0' + nowMinute;
				nowHour += 1;
			}
			nowTime = time.substring(0,10) +" " + nowHour + ':' + nowMinute + ':' + nowSecond;
		}*/
		/*var sql = "select o.OrgName,u.DisplayName, gps.* from GpsHistory gps inner join User u on u.UserName = gps.UserName "
                 +"inner join Organization o on u.OrganizationId = o.OrganizationId "
                 + "INNER JOIN (select * from GpsHistory where EventTime > '2014-11-07 10:52:33' "
				 + "and EventTime < '2014-11-07 10:56:19' order by EventTime desc) gps2 "
                 + "on gps.GpsHistoryId = gps2.GpsHistoryId GROUP BY gps.UserName ";
	    GpsHistory.query(sql,function(err,result){
			if(err)
				return res.send({code: 500,msg: 'databases err',data: ''});
			return res.send({code: 200,mgs: 'successfully',data: result});
		})*/
	},
	/**
	 * save
   * create gps info
   *
   * @param batchId int
   * @param userName string
   * @param deviceType string
   * @param deviceNumber string
   * @param lat float
   * @param lon float
   * @param speed float
   * @param eventTime string
   * @param createdBy string
   * @return RESTful Json
   */
  save: function(req, res) {
    var data = req.param('data');
    if (data == null || data == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    if (data[0].batchId == null || data[0].batchId == ''
      || data[0].batchId < 0) {
			XFJWT_GpsHistory.find().limit(1).sort('BatchId DESC')
			.exec(function(err, recs) {
				if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
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
				for (var i = 0; i < data.length; i++) {
        var jsonData = {
	            'deviceNumber': data[i].deviceNumber,
	            'lat': data[i].lat,
	            'lon': data[i].lon,
        };
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
			}
    }
  },
  /**
   * read
   * read records
   *
   * @param startTime datetime
   * @param endTime dateTime (optional)
   * @return RESTful Json
   */
	read: function(req, res) {
		var startTime = req.param('startTime');
		var endTime = req.param('endTime');
		if (startTime == null || startTime == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
		}
		if (endTime == null || endTime == '') {
			endTime = UtilityService.getCurrentTime();
		} else {
		//endTime = new Date(endTime).toISOString();
		}
		var sql = "select g.GpsHistoryId,g.BatchId,u.DisplayName as UserName,g.DeviceType,g.DeviceNumber,g.BaiduLat,g.BaiduLon,g.Speed,g.EventTime,g.CreatedBy,g.CreatedTime from xfjwt_GpsHistory g inner join xfjwt_User u on u.UserName = g.UserName where g.EventTime >= '"+startTime+"' and g.EventTime <= '"+endTime+"' ORDER BY BatchId, EventTime";
		XFJWT_GpsHistory.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      sails.config.returnCode.QUERY_OK.data = recs;      
      return res.send(sails.config.returnCode.QUERY_OK);
		});
	},
}
