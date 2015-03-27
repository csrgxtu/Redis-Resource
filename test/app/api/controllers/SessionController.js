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

  /**
   * create
   * craate an record
   *
   * @param UserId string
   * @param LoginAndroid string
   * @return Json Data.
   */
  create: function(req, res) {
    var UserId = req.param('UserId');
    var LoginAndroid = req.param('LoginAndroid');
    if (!UserId || !LoginAndroid) {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    XFJWT_Session
      .create({
        UserId: UserId,
        LoginAndroid: LoginAndroid
      }, function cb(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }

        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
  },

  /**
   * read
   * read records
   *
   * @param pageIndex int
   * @param pageSize int
   * @return Json Data.
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    if (!pageIndex || !pageSize) {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }


    XFJWT_Session
      .find({})
      .exec(function cb(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }

        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
  },

  /**
   * update
   * update record
   *
   * @param id string
   * @param UserId string
   * @param Loginandroid string
   * @return Json Data.
   */
  update: function(req, res) {

  },

  /**
   * delete
   * delete the record
   *
   * @param id string
   * @return Json Data
   */
  delete: function(req, res) {

  }
}
