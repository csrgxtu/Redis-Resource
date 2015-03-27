/**
 * Author: Archer Reilly
 * Date: 21/Jan/2014
 * File: SystemLogService.js
 * Desc: service for system log, should invoked by
 * policies.
 *
 * Produced By Ebang.
 */
var url = require('url');

module.exports = {
  /**
   * create
   * create an record in xfjwt_SystemLog
   *
   * @param req object
   * @return boolean
   */
  create: function(req) {
    var url = req._parsedUrl.pathname;
    var params = JSON.stringify(req.query);
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var userId = req.session.loginInfo.userInfo.UserId;
    var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    var createdTime = UtilityService.getCurrentTime();
    if (url == null || url == '' || createdBy == null
      || createdBy == '' || createdTime == null
      || createdTime == '') {
      return false;
    }

    // ResourceId
    var sql = "SELECT ResourceId FROM xfjwt_Resource WHERE ResourceUrl = '"
      + url + "'";
    XFJWT_Resource.query(sql, function(err, recs) {
      if (err) {
        return false;
      }

      if (recs.length == 0) {
        return false;
      }

      var resourceId = recs[0].ResourceId;

      // OperationTypeCode
      var operationTypeCode = 'RETRIEVE'
      if (url.toUpperCase().indexOf('LOGIN') >= 0) {
        operationTypeCode = 'LOGIN';
      } else if (url.toUpperCase().indexOf('LOGOFF') >= 0) {
        operationTypeCode = 'LOGOFF';
      } else if (url.toUpperCase().indexOf('CREATE') >= 0) {
        operationTypeCode = 'CREATE';
      } else if (url.toUpperCase().indexOf('RETRIEVE') >= 0) {
        operationTypeCode = 'RETRIEVE';
      } else if (url.toUpperCase().indexOf('UPDATE') >= 0) {
        operationTypeCode = 'UPDATE';
      } else if (url.toUpperCase().indexOf('DELETE') >= 0) {
        operationTypeCode = 'DELETE';
      } else {
        operationTypeCode = 'RETRIEVE';
      }
      
      XFJWT_SystemLog.create({
        OperationTypeCode: operationTypeCode,
        ResourceId: resourceId,
        Params: params,
        UserName: createdBy,
        CreatedTime: createdTime,
        UserId: userId,
        OrganizationId: organizationId,
      }).exec(function(err, recs) {
        if (err) {
          return false;
        }

        return true;
      });
    });
  },
}
