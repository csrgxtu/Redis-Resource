/**
 * Author: Archer Reilly
 * Date: 10/DEC/2014
 * File: CronTaskController.js
 * Desc: responsible schedule the tasks.
 *
 * Produced By Ebang
 */

module.exports = {
	index: function(req, res) {
	    var userId = req.session.loginInfo.userInfo.UserId;
	    var viewUrl = 'xfjwt/cronTask';
	    var title = '后台任务管理';
	    var menu = '后台任务管理';
	    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
	  },
  /**
   * create
   * create cron task, support asterisk, ranges and steps
   *
   * @param min int (0 - 59)
   * @param hour int (0 - 23)
   * @param dom int ( 1 - 31)
   * @param mon int (1 - 12)
   * @param dow int (0 - 6)
   * @param url string (/data/write)
   * @return Json
   */
  create: function(req, res) {
    var min  = req.param('min');
    var hour = req.param('hour');
    var dom  = req.param('dom');
    var mon  = req.param('mon');
    var dow  = req.param('dow');
    var url  = req.param('url');
    var taskName = req.param('taskName');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var createdTime = UtilityService.getCurrentTime();
    if (min == null || min == '' || hour == null || hour == ''
      || dom == null || dom == '' || mon == null || mon == ''
      || dow == null || dow == '' || url == null || url == ''
      || createdBy == null || createdBy == '' || taskName == '' || taskName == null
      || createdTime == null || createdTime == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    var task = min + ' ' + hour + ' ' + dom + ' ' + mon + ' '
              + dow + ' ' + ' curl ' + sails.config.CronTask.domain + url;
              //+ ' -O /dev/null';
    //console.log('DEBUG: ' + task);
    XFJWT_CronTask.create({
      Task: task,
      TaskName: taskName,
      CreatedBy: createdBy,
      CreatedTime: createdTime,
    }).exec(function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      CronTaskService.refresh();
      sails.config.returnCode.QUERY_OK.data = task;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },

  /**
   * read
   * read cron tasks in our system
   *
   * @param pageIndex int (1 - )
   * @param pageSize int
   * @return
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize  = req.param('pageSize');

    if (pageIndex == null || pageIndex == '' || pageIndex < 1
      || pageSize == null || pageSize == '' || pageSize < 0) {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT T.CronTaskId,U.UserName, J.JGMC, T.TaskName, T.CreatedTime,"
      + " T.Task FROM xfjwt_CronTask T INNER JOIN xfjwt_User U ON"
      + " T.CreatedBy = U.UserName INNER JOIN JGXX_XFJG J ON"
      + " J.ID = U.OrganizationId";
    var sqla = sql + " LIMIT " + start + ', ' + pageSize;
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      var total = recs.length;

      XFJWT_CronTask.query(sqla, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }

        sails.config.returnCode.QUERY_OK.data = {
          'total': total,
          'recs': recs
        };
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * history
   * get history
   *
   * @param cronTaskId int
   * @param pageIndex int
   * @param pageSize int
   * @return RESTful Json
   */
  history: function(req, res) {
    var cronTaskId = req.param('cronTaskId');
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    if (cronTaskId == null || cronTaskId == '' || pageIndex == null
      || pageSize == '') {
      return res.send(sails.config.returnCode.INVLID_PARAM);
    }

    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT count(CronTaskHistoryId) AS count FROM xfjwt_CronTaskHistory"
      + " WHERE CronTaskId = " + cronTaskId;
    var sqla = "SELECT * FROM xfjwt_CronTaskHistory WHERE CronTaskId = "
      + cronTaskId + " ORDER BY DataEndTime DESC LIMIT " + start + ", " + pageSize;
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      var total = recs[0].count
      XFJWT_CronTask.query(sqla, function(err, recs) {
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
   * update
   * update a cron task in our system
   *
   * @param cronTaskId
   * @param min int (0 - 59)
   * @param hour int (0 - 23)
   * @param dom int ( 1 - 31)
   * @param mon int (1 - 12)
   * @param dow int (0 - 6)
   * @param url string (/data/write)
   * @param return Json
   */
  update: function(req, res) {
    var cronTaskId = req.param('cronTaskurl.parse(req.originalUrl).pathnameId');
    var min  = req.param('min');
    var hour = req.param('hour');
    var dom  = req.param('dom');
    var mon  = req.param('mon');
    var dow  = req.param('dow');
    var url  = req.param('url');
    var taskName = req.param('taskName');
    var updatedBy = req.session.loginInfo.userInfo.UserName;
    var updatedTime = UtilityService.getCurrentTime();
    if (min == null || min == '' || hour == null || hour == ''
      || dom == null || dom == '' || mon == null || mon == ''
      || dow == null || dow == '' || url == null || url == ''
      || cronTaskId == null || cronTaskId == '' || taskName == '' || taskName == null
      || cronTaskId < 1 || updatedBy == null
      || updatedBy == '' || updatedTime == null
      || updatedTime == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    var task = min + ' ' + hour + ' ' + dom + ' ' + mon + ' '
              + dow + ' ' + ' wget ' + sails.config.CronTask.domain + url
              + ' -O /dev/null';

    XFJWT_CronTask.update({
      CronTaskId: cronTaskId
    }, {
      Task: task,
      TaskName: taskName,
      UpdatedBy: updatedBy,
      UpdatedTime: updatedTime,
    }).exec(function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      CronTaskService.refresh();

      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },

  /**
   * delete
   * delete a cron task in our system
   *
   * @param cronTaskId int
   * @return Json
   */
  delete: function(req, res) {
    var cronTaskId = req.param('cronTaskId');
    if (cronTaskId == null || cronTaskId == '' || cronTaskId < 1) {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    var sql = "DELETE FROM xfjwt_CronTask WHERE CronTaskId = " + cronTaskId;
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      CronTaskService.refresh();

      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
}
