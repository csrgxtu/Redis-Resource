/**
 * Author: Archer Reilly
 * Date: 21/Jan/2014
 * File: SystemLogController.js
 * Desc: controller for system log
 *
 * Produced By Ebang.
 */
module.exports = {
	/**
	 * index
	 * view
	 */
	index: function(req, res) {
		var userId = req.session.loginInfo.userInfo.UserId;
		var viewUrl = 'xfjwt/sysLog';
		var title = '日志管理';
		var menu = '日志管理';
		ReviewService.getViewPass(res, userId, viewUrl, title, menu);
	},

  /**
   * read
   * read records from database
   *
   * @param pageIndex int
   * @param pageSize int
   * @return RESTful Json
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    if (pageIndex == null || pageIndex == '' || pageSize == null
      || pageSize == '') {
			return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT s.UserName, s.OperationTypeCode, s.CreatedTime,"
      + " s.Params, j.JGMC, r.ModuleName, r.ResourceName FROM"
      + " xfjwt_SystemLog s INNER JOIN JGXX_XFJG j on s.OrganizationId"
      + " = j.ID INNER JOIN xfjwt_Resource r on s.ResourceId = "
      + " r.ResourceId order by s.CreatedTime Desc ";
    var sqlTotal = "SELECT count(*) as total FROM"
      + " xfjwt_SystemLog s INNER JOIN JGXX_XFJG j on s.OrganizationId"
      + " = j.ID INNER JOIN xfjwt_Resource r on s.ResourceId = "
      + " r.ResourceId ";
    var sqla = sql + " LIMIT " + start + ", " + pageSize;
    XFJWT_SystemLog.query(sqlTotal, function(err, recsTotal) {
      if (err) {
				sails.config.returnCode.DB_ERROR.data = err;
				return res.send(sails.config.returnCode.DB_ERROR);
      }
      if(recsTotal == null || recsTotal == '')
      	return res.send({code: 404,msg:'database is null ',data: ''})
      var total = recsTotal[0].total;
      XFJWT_SystemLog.query(sqla, function(err, recs) {
        if (err) {
				  sails.config.returnCode.DB_ERROR.data = err;
				  return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = {
          'total': total,
          'recs': recs,
        };
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

	/**
	 * readOperationCounts
	 * 返回用户在某一段时间内的各中操作次数
	 *
	 * @param startTime datetime
	 * @param endTime datetime
	 * @return RESTful Json
	 */
	readOperationCounts: function(req, res) {
		var startTime = req.param('startTime');
		var endTime = req.param('endTime');
		if (startTime == null || startTime == '' || endTime == null || endTime == '') {
			return res.send(sails.config.returnCode.INVALID_PARAM);
		}

		var sql = "SELECT CreatedBy, OperationTypeCode, count(1) as Total" + " FROM xfjwt_SystemLog WHERE 1 = 1" + " AND CreatedTime >= '" + startTime + "' AND CreatedTime <= '" + endTime + "' GROUP BY CreatedBy, OperationTypeCode";
		XFJWT_SystemLog.query(sql, function(err, recs) {
			if (err) {
				sails.config.returnCode.DB_ERROR.data = err;
				return res.send(sails.config.returnCode.DB_ERROR);
			}

			sails.config.returnCode.QUERY_OK.data = recs;
			return res.send(sails.config.returnCode.QUERY_OK);
		});
	},
}
