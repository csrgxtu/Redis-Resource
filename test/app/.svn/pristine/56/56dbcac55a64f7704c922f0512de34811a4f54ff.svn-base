/**
 * Author: Archer Reilly
 * Date: 26/Jan/2015
 * File: GeoConvertService.js
 * Desc: service that convert Google geo info into Baidus
 *
 * Produced By Ebang.
 */
var request = require('sync-request');

module.exports = {
  /**
   * go2bai
   * google geo info to baidu geo info, give me a table
   * name and id, i will translate the geo info to baidu
   * geo info automatically
   *
   * @param tableName string
   * @param id int
   * @param req object
   * @return boolean
   */
  go2bai: function(tableName, id, req) {
  
  },
  
  /**
   * g2b
   * google geo info to baidu, give me the geo infos, and I will
   * translate that for u
   *
   * @param geos string ('lat,lon;lat,lon')
   * @return RESTful Json
   */
  g2b: function(geos) {
    var geos = geos;
    if (geos == null || geos == '') {
      return sails.config.returnCode.INVALID_PARAM;
    }
    
    // use Baidu api get converted geo info
    var API = 'http://api.map.baidu.com/geoconv/v1/?from=3&to=5&ak=ECd608dc638e15bd4b62af23c608fb6a&coords=' + geos;
    
    var response = request('GET', API);
    
    if (response.statusCode != 200) {
      return sails.config.returnCode.QUERY_ERROR;
    }
    
    try {
      var data = JSON.parse(response.body);
    } catch (err) {
      console.log("ERROR: JSON PARSE ERROR");
      return sails.config.returnCode.QUERY_ERROR;
    }
    
    if (data.status != 0) {
      return sails.config.returnCode.QUERY_ERROR;
    }
    sails.config.returnCode.QUERY_OK.data = data.result;
    return sails.config.returnCode.QUERY_OK;
  },
}
