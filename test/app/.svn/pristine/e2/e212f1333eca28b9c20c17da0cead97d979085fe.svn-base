/**
 * Author: Archer Reilly
 * Date: 26/Jan/2015
 * File: GeoConvertController.js
 * Desc: invoke GeoConvertService convert Google's
 * geo info to Baidu's
 *
 * Produced By Ebang.
 */
module.exports = {
  /**
   * g2b
   * convert google geo to baidu
   *
   * @param tableName string
   * @param id int
   * @return RESTful Json
   */
  g2b: function(req, res) {
    var tableName = req.param('tableName');
    var tableId = req.param('id');
    var updatedBy = 'archer';
    var updatedTime = UtilityService.getCurrentTime();
    if (tableName == null || tableName == '' || tableId == null
      || tableId == '' || updatedBy == null || updatedBy == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    // first get the cords
    var idName = tableName.slice(6) + 'Id';
    var sql = "SELECT GisLat, GisLon FROM " + tableName + " WHERE "
      + idName + " = '" + tableId + "' AND BaiduLat is NULL";
    
    XFJWT_ShuiYuan.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        console.log("DEBUG: " + tableId + " Aready converted!");
        return res.send(sails.config.returnCode.QUERY_ERROR);
      }
      
      var geos = recs[0].GisLat + "," + recs[0].GisLon;
      // use service
      var response = GeoConvertService.g2b(geos);
      var baiduLat = response.data[0].x;
      var baiduLon = response.data[0].y;
      console.log("DEBUG: " + tableId + "," + recs[0].GisLat + "," + recs[0].GisLon + "," + baiduLat + "," + baiduLon);
      
      var sql = "UPDATE " + tableName + " SET BaiduLat = " + baiduLat + ", BaiduLon = " + baiduLon + " WHERE " + idName
        + " = '" + tableId + "'";
      XFJWT_ShuiYuan.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },
  
  /**
   * g2ba
   * convert google geo to baidu
   *
   * @param tableName string
   * @param id int
   * @return RESTful Json
   */
  g2ba: function(req, res) {
    var tableName = req.param('tableName');
    var tableId = req.param('id');
    var updatedBy = 'archer';
    var updatedTime = UtilityService.getCurrentTime();
    if (tableName == null || tableName == '' || tableId == null
      || tableId == '' || updatedBy == null || updatedBy == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    // first get the cords YAGL_MHDW JGXX_XFJG
    var sql = "SELECT GIS_X, GIS_Y FROM " + tableName + " WHERE "
      + " ID = '" + tableId + "' AND BaiduLat is NULL";

    XFJWT_ShuiYuan.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        console.log("DEBUG: " + tableId + " Aready converted!");
        return res.send(sails.config.returnCode.QUERY_ERROR);
      }
      
      var geos = recs[0].GIS_Y + "," + recs[0].GIS_X;
      // use service
      var response = GeoConvertService.g2b(geos);
      var baiduLat = response.data[0].x;
      var baiduLon = response.data[0].y;
      console.log("DEBUG: " + tableId + "," + recs[0].GisLat + "," + recs[0].GisLon + "," + baiduLat + "," + baiduLon);
      
      var sql = "UPDATE " + tableName + " SET BaiduLat = " + baiduLat + ", BaiduLon = " + baiduLon + " WHERE ID = '"
        + tableId + "'";
      XFJWT_ShuiYuan.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * g2bByTable
   * convert Google GPS data to Baidu GPS data by table
   * only work for xfjwt_ShuiYuan and xfjwt_FireKeyUnit
   *
   * @param table string
   * @return RESTful Json
   */
  g2bByTable: function(req, res) {
    var table = req.param('table');
    if (table == null || table == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM)
    }

    var idName = table.slice(6) + 'Id';
    var sql = "SELECT " + idName + ", GisLat, GisLon FROM "
      + table + " WHERE BaiduLat IS NULL AND GisLat IS NOT NULL"
      + " OR GisLat = BaiduLat";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      

      for (var i = 0; i < recs.length; i++) {
        var geos = recs[i].GisLat + "," + recs[i].GisLon;
        // use service
        var response = GeoConvertService.g2b(geos);
        var baiduLat = response.data[0].x;
        var baiduLon = response.data[0].y;
        var sql = "UPDATE " + table + " SET BaiduLat = " + baiduLat + ", BaiduLon = " + baiduLon + " WHERE " + idName
          + " = '" + recs[i].idName + "'";
        XFJWT_CronTask.query(sql, function(err, recs) {
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }

          // normal
        });
      }

      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },

  /**
   * g2bByTablea
   * convert Google GPS data to Baidu GPS data by table
   * only work for JGXX_XFJG and YAGL_MHDW
   *
   * @param table string
   * @return RESTful Json
   */
  g2bByTablea: function(req, res) {
    var table = req.param('table');
    if (table == null || table == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM)
    }

    var idName = table.slice(6) + 'Id';
    var sql = "SELECT ID, Gis_X, Gis_Y FROM "
      + table + " WHERE BaiduLat IS NULL AND Gis_X IS NOT NULL"
      + " OR Gis_X = BaiduLat";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      

      for (var i = 0; i < recs.length; i++) {
        var geos = recs[i].Gis_X + "," + recs[i].Gis_Y;
        // use service
        var response = GeoConvertService.g2b(geos);
        var baiduLat = response.data[0].x;
        var baiduLon = response.data[0].y;
        var sql = "UPDATE " + table + " SET BaiduLat = " + baiduLat + ", BaiduLon = " + baiduLon + " WHERE ID = '" 
           + recs[i].ID + "'";
        XFJWT_CronTask.query(sql, function(err, recs) {
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }

          // normal
        });
      }

      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
}
