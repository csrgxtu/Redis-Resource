/**
 * Author: Archer Reilly
 * Date: 25/May/2014
 * File: GpsService.js
 * Des: some logic put here not in controller
 *
 * Produced By Ebang
 */
var InNOut = require('in-n-out');
module.exports = {
  /**
   * geofenceRuleChecker
   * check geofenceRule according the deviceNumber, if it has record
   * in geofenceRuleDetail, use geofenceruleid find the mapareaid,
   * then see if the lat:lon is in the maparea, false, put it into
   * the geofenceruleexceptions
   *
   * @param jsonData
   *   {'deviceNumber': 'fdsjl', 'lat': 23.232, 'lon': 211.222}
   * @return void
   */
  geofenceRuleChecker: function(req, res, jsonData) {
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var clientCode = req.session.loginInfo.userInfo.ClientCode;

    if (jsonData.deviceNumber == null || jsonData.deviceNumber == ''
      || createdBy == null || createdBy == ''
      || clientCode == null || clientCode == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }


    GeofenceRuleDetail.find({
      DeviceNumber: jsonData.deviceNumber
    }).exec(function(err, recs){
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      // this device isnt in the geofenceruledetail
      if (recs.length == 0) {
        // TO-DO, maybe, just return
      } else {
        now = UtilityService.getSampleCurrentTime();
        var sql = "SELECT * FROM GeofenceRule WHERE GeofenceRuleId = "
          + recs[0].GeofenceRuleId + " AND BeginTime <= '" + now
          + "' AND EndTime >= '" + now + "' AND ClientCode = '"
          + clientCode + "'";
        GeofenceRule.query(sql, function(err, recs){
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }

          if (recs.length == 0) {
            // TO-DO, return?
          } else {
            // now, got mapAreaId, lat, lon, check if device is in
            if (GpsService.isInArea(recs[0].MapAreaId, jsonData.lat, jsonData.lon)) {
              // in the maparea, good, return?
            } else {
              // not in, exceptions
              GeofenceRuleException.create({
                GeofenceRuleId: recs[0].GeofenceRuleId,
                ClientCode: clientCode,
                DeviceNumber: jsonData.deviceNumber,
                EventTime: UtilityService.getCurrentTime(),
                CreatedBy: createdBy,
                CreatedTime: UtilityService.getCurrentTime(),
              }).exec(function(err, recs){
                if (err) {
                  sails.config.returnCode.DB_ERROR.data = err;
                  return res.send(sails.config.returnCode.DB_ERROR);
                }

                sails.config.returnCode.QUERY_OK.data = recs;
                return res.send(sails.config.returnCode.QUERY_OK);
              });
            }
          }


        });
      }
    });
  },

  /**
   * isInArea
   * the same functionality with the sails.controllers.MapAreaController.isInArea
   * but that method need parameters passed in with req object, I dont have that.
   * plus, invoke method from service to controller make it a little messy.
   *
   * @param mapAreaId int
   * @param lat float
   * @param lon float
   * @return boolean
   */
  isInArea: function(mapAreaId, lat, lon) {
    if (mapAreaId == null || mapAreaId == ''
      || lat == null || lat == ''
      || lon == null || lon == '') {
      return false;
    }

    var sql = "SELECT BaiduLat, BaiduLon FROM MapAreaDetail WHERE "
      + "MapAreaId = " + mapAreaId + " ORDER BY SequenceNumber;";

    MapAreaDetail.query(sql, function(err, recs) {
      if (err) {
        return false;
      }

      var points = [];
      for (var j = 0; j < recs.length; j++) {
        points[j] = [recs[j].BaiduLat, recs[j].BaiduLon];
      }
      
      var gf = new InNOut.Geofence(points, 100);
      if (gf.inside([lat, lon])) {
        return true;
      } else {
        return false;
      }
    });
  },
  /**
   * setGpsInfo
   * accept a json data of the gps track schema, and insert it
   * into the database
   *
   * @param json
   * @return void
   */
  setGpsInfo: function(req, res, json) {
    if (json.batchId == null || json.batchId == ''
      || json.userName == null || json.userName == ''
      || json.deviceType == null || json.deviceType == ''
      || json.deviceNumber == null || json.deviceNumber == ''
      || json.eventTime == null || json.eventTime == ''
      || json.createdBy == null || json.createdBy == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    createdTime = UtilityService.getCurrentTime();
    
    XFJWT_GpsHistory.create({
      BatchId: json.batchId,
      OrganizationId: req.session.loginInfo.userInfo.OrganizationId,
      UserName: json.userName,
      DeviceType: json.deviceType,
      DeviceNumber: json.deviceNumber,
      BaiduLat: json.lat,
      BaiduLon: json.lon,
      Speed: json.speed,
      EventTime: json.eventTime,
      CreatedBy: json.createdBy,
      CreatedTime: createdTime,
    }).exec(function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var info = {
        BatchId: json.batchId,
        UserName: json.userName,
        DeviceNumber: json.deviceNumber,
        Lat: json.lat,
        Lon: json.lon,
        Speed: json.speed,
      };
      sails.io.sockets.emit('realTimeGpsData', info);
      sails.config.returnCode.QUERY_OK.data = info;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
};
