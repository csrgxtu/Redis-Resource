/**
 * Author: Archer Reilly
 * File: LogService.js
 * Date: 22/Oct/2014
 * Desc: service to log
 *
 * Produced By Ebang.
 */
var url = require('url');

module.exports = {
  /**
   * save
   * save a log record or update according to systemLogId
   *
   * @param systemLogId (int)
   * @param operationTypeCode (string enum['LOGIN', 'LOGOFF', 'CREATE', 'RETRIEVE', 'UPDATE', 'DELETE'])
   * @return RESTful Json
   */
  save: function(req, res) {
    var systemLogId = req.param('systemLogId');
    var operationTypeCode = req.param('operationTypeCode');
    var resourceId = req.param('resourceId');
    var recordBefore = req.param('recordBefore');
    var recordAfter = req.param('recordAfter');
    var clientCode = req.session.loginInfo.userInfo.ClientCode;
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var createdTime = UtilityService.getCurrentTime();
    //var userId = req.session.loginInfo.userInfo.userid;
    var resourceUrl = url.parse(req.originalUrl).pathname;

    if (operationTypeCode == null || operationTypeCode == ''
      || resourceId == null | resourceId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    Resource.find({ResourceUrl: resourceUrl})
    .exec(function(err, recs){
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      var resourceId = recs[0].ResourceId;

      if ( systemLogId == null | systemLogId == '' | systemLogId == 0) {
        SystemLog.create({
          ClientCode: clientCode,
          CreatedBy: createdBy,
          CreatedTime: createdTime,
          OperationTypeCode: operationTypeCode,
          ResourceId: resourceId,
        }).exec(function(err, recs){
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }

          // Serialize it and store it in record*
          var recordAfter = {
            "Clientcode": clientCode,
            "CreatedBy": createdBy,
            "CreatedTime": createdTime,
            "OperationTypeCode": operationTypeCode,
            "ResourceId": resourceId,
            "SystemLogId": recs.SystemLogId,
          };
          var serializedStr = JSON.stringify(recordAfter);
          SystemLog.update({
            SystemLogId: recs.SystemLogId
          }, {
            RecordAfter: serializedStr
          }).exec(function(err, recs){
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }

            sails.config.returnCode.QUERY_OK.data = serializedStr;
            //sails.config.returnCode.QUERY_OK.data = recs;
            return res.send(sails.config.returnCode.QUERY_OK);
          });
        });
      } else {
        SystemLog.find({SystemLogId: systemLogId})
        .exec(function(err, recs){
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }

          var recordBefore = recs[0].RecordAfter;
          var recordAfter = JSON.stringify({
            "Clientcode": clientCode,
            "CreatedBy": createdBy,
            "CreatedTime": createdTime,
            "OperationTypeCode": operationTypeCode,
            "ResourceId": resourceId,
            "SystemLogId": systemLogId,
          });

          SystemLog.update({
            SystemLogId: systemLogId
          }, {
            ClientCode: clientCode,
            CreatedBy: createdBy,
            CreatedTime: createdTime,
            OperationTypeCode: operationTypeCode,
            ResourceId: resourceId,
            RecordBefore: recordBefore,
            RecordAfter: recordAfter,
          }).exec(function(err, recs){
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }

            sails.config.returnCode.QUERY_OK.data = recs;
            return res.send(sails.config.returnCode.QUERY_OK);
          });
        });
      }
    });
  },

  /**
   * saveb
   * save a record
   *
   * @param req object
   * @param clientCode
   * @param userId
   * @param operationTypeCode
   * @param recordBefore
   * @param recordAfter
   * @return boolean
   */
  saveb: function(req, clientCode, userId, operationTypeCode, recordBefore, recordAfter) {
    console.log("Debug LogService: " + req.originalUrl);
    var accessMethod = url.parse(req.originalUrl).pathname.toUpperCase();
    if (clientCode == null || clientCode == '' || userId == null
      || userId == '' || operationTypeCode == null
      || operationTypeCode == '' || accessMethod == null
      || accessMethod == '') {
      return false;
    }
    var createdTime = UtilityService.getCurrentTime();

    var sql = "SELECT ResourceId FROM Resource WHERE Upper(ResourceUrl) = '"
      + accessMethod + "'";
    Resource.query(sql, function(err, recs) {
      if (err) {
        return false;
      }

      if (recs.length == 0) {
        return false;
      }
      var resourceId = recs[0].ResourceId;
      SystemLog.create({
        ClientCode: clientCode,
        OperationTypeCode: operationTypeCode,
        ResourceId: resourceId,
        RecordBefore: recordBefore,
        RecordAfter: recordAfter,
        CreatedTime: createdTime,
      }).exec(function(err, recs) {
        if (err) {
          return false;
        }

        return true;
      });
    });
  },

  /**
   * savea
   * save a log record
   *
   * @param req (sails express req object)
   * @param operationTypeCode (string enum['LOGIN', 'LOGOFF', 'CREATE', 'RETRIEVE', 'UPDATE', 'DELETE'])
   * @param recordBefore (Json string optional)
   * @param recordAfter (Json string optional)
   * @return boolean
   */
  savea: function(req, operationTypeCode, recordBefore, recordAfter) {
    var clientCode = req.session.loginInfo.userInfo.ClientCode;
    var userId = req.session.loginInfo.userInfo.userid;
    var createdTime =  UtilityService.getCurrentTime();
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var accessMethod = url.parse(req.originalUrl).pathname;
    if (clientCode == null || clientCode == '' || userId == null
      || userId == '' || createdBy == null || createdBy == ''
      || createdTime == null || createdTime == '' || accessMethod == null
      || accessMethod == '' || recordBefore == null
      || recordBefore == '' || recordAfter == null
      || recordAfter == '') {
      return false;
    }

    var sql = "SELECT ResourceId FROM Resource WHERE ResourceUrl = '"
      + accessMethod + "'";
    Resource.query(sql, function(err, recs) {
      if (err) {
        return false;
      }

      if (recs.length == 0) {
        return false;
      }
      var resourceId = recs[0].ResourceId;
      SystemLog.create({
        ClientCode: clientCode,
        OperationTypeCode: operationTypeCode,
        ResourceId: resourceId,
        RecordBefore: recordBefore,
        RecordAfter: recordAfter,
        CreatedBy: createdBy,
        CreatedTime: createdTime,
      }).exec(function(err, recs) {
        if (err) {
          return false;
        }

        return true;
      });
    });

  },

}