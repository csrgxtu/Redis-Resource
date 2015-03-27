/**
 * Author: Archer Reilly
 * Date: 30/Jan/2015
 * File: DynamicPlanService.js
 * Desc: service for dynamic plan
 *
 * Produced By Ebang.
 */
module.exports = {
  /**
   * getT1
   * get table 1
   *
   * @param id string
   * @return boolean or Json
   */
  getT1: function(id) {
    if (id == null || id == '') {
      return false;
    }
    
    var sql = "SELECT JBXX.YABH AS YABH, JBXX.YAZL AS YAZL, JBXX.DXMC AS DXMC,"
      + " MHDW.DWDZ AS DXDZ, JBXX.SFKQY AS SFKQY, JBXX.SFMYA AS SFMYA,"
      + " XFJG.JGMC AS ZZDWID, JBXX.ZZRMC AS ZZRMC, JBXX.ZZRQ AS ZZRQ FROM "
      + " YAGL_YAJBXX JBXX LEFT JOIN YAGL_YAQTDXXX QTDXXX ON JBXX.DXID = "
      + " QTDXXX.ID INNER JOIN JGXX_XFJG XFJG ON XFJG.ID = JBXX.ZZDWID"
      + " INNER JOIN YAGL_MHDW MHDW ON MHDW.ID = JBXX.DXID"
      + " WHERE JBXX.DXID = '" + id + "'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        return false;
      }

      console.log("SERVICE DEBUG:");
      console.log(recs);
      return recs;
      //sails.config.returnCode.QUERY_OK.data = recs;
      //return res.send(sails.config.returnCode.QUERY_OK);
      //return sails.config.returnCode.QUERY_OK;
    });
  },
}
