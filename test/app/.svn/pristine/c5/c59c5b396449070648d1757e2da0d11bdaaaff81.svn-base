/**
 * Author: Archer Reilly
 * Date: 28/Feb/2015
 * File: DynamicPlanCode.js
 * Desc: load code into hashtable before doing DynamicPlan
 * generation.
 *
 * Produced By Ebang.
 */
var HashTable = require('hashtable');
var hashtable = new HashTable();

module.exports = function DynamicPlanCode(req, res, next) {
  // 预案类型
  var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '80221C7BC74YAZL6BA9443912B7DFE59'";
  XFJWT_CronTask.query(sql, function(err, recs) {
    if (err) {
      sails.config.returnCode.DB_ERROR.data = err;
      return res.send(sails.config.returnCode.DB_ERROR);
    }
   
    var tmpJson = {};
    for (var i = 0; i < recs.length; i++) {
      tmpJson[recs[i].DMZ] = recs[i].DMMC;
    }

    hashtable.put('预案类型', tmpJson);

    // 是否跨区域 是否母预案
    hashtable.put('是否跨区域', {'0': '否', '1': '是'});
    hashtable.put('是否母预案', {'0': '否', '1': '是'});

    // 单位性质 经济所有制
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '158AD1952C63436EA80F1674359CAD61'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
     
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }

      hashtable.put('单位性质', tmpJson);
      hashtable.put('经济所有制', tmpJson);
      
    // 自动消防设施情况
    hashtable.put('自动消防设施情况', {'0': '没有', '1': '有'});
    
    // 单位主属性 单位次属性
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '1276F5CA6E0A4FEC931409D1ED1198E2'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
     
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }

      hashtable.put('单位主属性', tmpJson);
      hashtable.put('单位次属性', tmpJson);
    
    // 建筑结构
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = 'B17C24F4AC5B4A1091AB59F0B384C34A'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('建筑结构', tmpJson);
      
    // 使用性质
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '35A6810529564D928E90D1BEBBBD0EF0'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('使用性质', tmpJson);
    
    // 防火标识设立情况
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '1DC1138AAC9E48608FF0D4305CF9B863'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('防火标识设立情况', tmpJson);
    
    // 危险源情况
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '33A65FA4CC824F5D8E8750175AD93ED3'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('危险源情况', tmpJson);
    
    // 火种情况
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = 'AF851B6815C04EC790344380B1EC923D'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('火种情况', tmpJson);
    
    // 车辆等级
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '5602DE8266AF42D99153A3D74443B329'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('车辆等级', tmpJson);
    
    // 作战功能
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = 'F62580E917D64A72BA5AAF5B1F2F4B6D'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('作战功能', tmpJson);
    
    // 车辆类型
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '64140328C93C4B09BF06DD3A3D1148F3'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('车辆类型', tmpJson);
    
    // 专家领域
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '0D17DD95FC5643A6A2D2CA8E65602061'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('专家领域', tmpJson);
    
    // 保障类别
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = '7FCF600DEBD14179B4205D095B47F89F'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('保障类别', tmpJson);
      hashtable.put('资源类型', tmpJson);
    
    // 计量单位
    var sql = "SELECT DMZ, DMMC FROM DM_SJZD WHERE DM_SJZD_ID = 'D38C37603C1744D6810F39EE62CBE424'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var tmpJson = {};
      for (var i = 0; i < recs.length; i++) {
        tmpJson[recs[i].DMZ] = recs[i].DMMC;
      }
      
      hashtable.put('计量单位', tmpJson);
    }); //计量单位
    }); //保障类别
    }); //专家领域
    }); //车辆类型
    }); //作战功能
    }); //车辆等级
    }); //火种情况
    }); //危险源情况
    }); //防火标识设立情况
    }); //使用性质
    }); //建筑结构
    }); //单位次属性 单位主属性
    }); //单位性质 经济所有制



    sails.config.OffLineData.codes = hashtable;
    next(); 
  }); //预案类型


};
