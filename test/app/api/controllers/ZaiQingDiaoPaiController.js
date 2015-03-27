/**
 * Author: Archer Reilly
 * Date: 11/Jan/2015
 * File: ZaiQingDiaoPaiController.js
 * Desc:  controller for ZaiQingDiaoPai
 *
 * Produced By Ebang.
 */
var mqtt = require('mqtt');
var client = mqtt.createClient(1883, 'localhost');
module.exports = {
  /**
   * index
   * view
   */
  index: function(req, res) {
 
  },
  
  /**
   * save
   * create or update according to id
   *
   * @param zaiQingDiaoPaiId int (optional)
   * @param zaiQingId int
   * @param diaoPaiDuiXiangLeiXing string
   * @param diaoPaiDuiXiangId string
   * @return RESTful Json
   */
  save: function(req, res) {
    var zaiQingId = req.param('zaiQingId');
    var diaoPaiDuiXiangIds = req.param('diaoPaiDuiXiangIds');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var createdTime = UtilityService.getCurrentTime();
    var updatedTime = createdTime;
    var diaoPaiDuiXiangIds_array = [];
    if (zaiQingId == null || zaiQingId == ''
      || diaoPaiDuiXiangIds == null
      || diaoPaiDuiXiangIds == '' ) {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    diaoPaiDuiXiangIds_array = diaoPaiDuiXiangIds.split(",");
    XFJWT_ZaiQingDiaoPai.destroy({ZaiQingId: zaiQingId})
    .exec(function(err,zaiQingIdDelResult){
      if(err)
        return res.send({code: 500,msg: 'databases err',data: err});
      var diaoPaiDuiXiangIds_Sql_Values = "";
      for(var i = 0;i < diaoPaiDuiXiangIds_array.length;i++){
        if(i == diaoPaiDuiXiangIds_array.length - 1){
          diaoPaiDuiXiangIds_Sql_Values += "("+diaoPaiDuiXiangIds_array[i]+","+zaiQingId+",'人员','"+createdBy+"','"+createdTime+"')";
        }else{
          diaoPaiDuiXiangIds_Sql_Values += "("+diaoPaiDuiXiangIds_array[i]+","+zaiQingId+",'人员','"+createdBy+"','"+createdTime+"'),";
        }
      }
      var role_Resources_sql = "insert into xfjwt_ZaiQingDiaoPai (DiaoPaiDuiXiangId,ZaiQingId,DiaoPaiDuiXiangLeiXing,CreatedBy,CreatedTime) "
                             + "values " + diaoPaiDuiXiangIds_Sql_Values;
      XFJWT_ZaiQingDiaoPai.query(role_Resources_sql,function(err,createResult){
        if(err)
          return res.send({code: 500,msg: 'databases err xfjwt_ZaiQingDiaoPai',data: err});
        return res.send({code: 200,mgs: 'successfully',data: ''});
      })
    })
  },
  /**
   * read
   * read records
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
    var sql = "SELECT * FROM xfjwt_ZaiQingDiaoPai";
    var sqla = sql + " LIMIT " + start + ", " + pageSize;
    
    XFJWT_ZaiQingDiaoPai.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var total = recs.length;
      
      XFJWT_ZaiQingDiaoPai.query(sqla, function(err, recs) {
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
   * delete
   * delete a record
   *
   * @param zaiQingDiaoPaiId int
   * @return RESTful Json
   */
  delete: function(req, res) {
    var zaiQingDiaoPaiId = req.param('zaiQingDiaoPaiId');
    if (zaiQingDiaoPaiId == null || zaiQingDiaoPaiId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    var sql = "DELETE FROM xfjwt_ZaiQingDiaoPai WHERE "
      + " ZaiQingDiaoPaiId = " + zaiQingDiaoPaiId;
    XFJWT_ZaiQingDiaoPai.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
  sendTypeMsg: function(req,res){
    var msgType = req.param('msgType');
    var users = req.param('users');
    var zaiQingId = req.param('zaiQingId');
    if(zaiQingId == null || zaiQingId == '' || users == null || users == '')
      return res.send({code: 404,msg: 'param is null',data: ''});
    var users_array = users.split(",");
    XFJWT_ZaiQing.find({ZaiQingId: zaiQingId})
    .exec(function(err,zaiQingInfo_result){
      if(err)
        return res.send({code: 500,msg: 'databases err',data: err});
      if(zaiQingInfo_result.length == 0)
        return res.send({code: 403,msg: '数据不存在',data: ''})
      var info = zaiQingInfo_result[0];
      for (var i = 0; i < users_array.length; i++) {
        console.log("i = " + i);
        client.publish(sails.config.values.zaiQingTopicName+users_array[i], JSON.stringify(info),{qos: 2},function(err){
          if(err){
           console.log("err="+err);
          }else{
           console.log("yes:"+i);
          }
        });
      };  
      return res.send({code: 200,msg: 'sendTypeMsg successfully',data: ''});  
    })
  }
}
