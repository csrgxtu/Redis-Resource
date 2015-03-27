/**
 * Author: Archer Reilly
 * Date: 10/DEC/2014
 * File: CronTaskController.js
 * Desc: responsible schedule the tasks.
 *
 * Produced By Ebang
 */

module.exports = {
  /*
   * test
   */
  test: function(req, res) {
    var sql = "set name 'archer'";
    XFJWT_Session.query(sql, function(err, recs) {
    /*XFJWT_Session.create({
      UserId: '1',
      LoginAndroid: '1'
    }, function(err, recs) {*/
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
}
