/**
* Author: Archer Reilly
* File: RoleController.js
* Date: 25/May/2014
* Des: controller for Role model
*
* Produced By EBang.
*/
var fs = require("fs");
var path = require("path");
var sysCommand = require("child_process").exec;
module.exports = {
/**
* create
* create a role in the role table
*
* @param roleName
* @param description
* @param createdBy
* @param clientId int
* @return RESTful Json
*/
  index: function(req,res){
    //var userId = req.session.loginInfo.userInfo.userid;
    var userId = req.session.loginInfo.userInfo.UserId;
    var viewUrl = 'xfjwt/key_Unit';
    var title = '重点单位';
    var menu = '重点单位';
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
    //return res.view('image');
    //ReviewService.getViewPass(res,userId,viewUrl,title,menu);
    //return res.view('keyUnit.ejs');
  },
  key_UnitAndroid: function(req,res){
    return res.view('xfjwt/key_Unit_Android',{layout: null,title:'重点单位'});
  },
  keyUnitSurface: function(req, res) {
    //var cookies = req.cookies;
    var userId = req.session.loginInfo.userInfo.UserId;
    var viewUrl = 'xfjwt/key_Unit';
    var title = '重点单位';
    var menu = 'annotation';
    ReviewService.getViewPassSurface(res,userId,viewUrl,title,menu);
  },
  /**
   * save
   * create or update according to fireKeyUnitId
   *
   * @param fireKeyUnitId int (optional)
   * @param refId string
   * @param name string
   * @param city string
   * @param district string
   * @param address string
   * @param location string
   * @param gisLon float
   * @param gisLat float
   * @param baiduLon float
   * @param baiduLat float
   * @param contactNumber string
   * @param corpRep string
   * @param corpRepContact string
   * @param safetyRep string
   * @param safetyRepContact string
   * @param safetyMgmtRep string
   * @param safetyMgmtRepContact string
   * @param safetyMgmtRep2 string
   * @param safetyMgmtRepContact2 string
   * @return RESTful Json
   */
  save: function(req, res) {
    var fireKeyUnitId = req.param('fireKeyUnitId');
    var name = req.param('name');
    var city = req.param('city');
    var district = req.param('district');
    var address = req.param('address');
    var location = req.param('location');
    var gisLon = req.param('gisLon');
    var gisLat = req.param('gisLat');
    var baiduLon = req.param('baiduLon');
    var baiduLat = req.param('baiduLat');
    var contactNumber = req.param('contactNumber');
    var corpRep = req.param('corpRep');
    var corpRepContact = req.param('corpRepContact');
    var safetyRep = req.param('safetyRep');
    var safetyRepContact = req.param('safetyRepContact');
    var safetyMgmtRep = req.param('safetyMgmtRep');
    var safetyMgmtRepContact = req.param('safetyMgmtRepContact');
    var safetyMgmtRep2 = req.param('safetyMgmtRep2');
    var safetyMgmtRepContact2 = req.param('safetyMgmtRepContact2');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var updatedBy = createdBy;
    var createdTime = UtilityService.getCurrentTime();
    var updatedTime = createdTime;
    var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    if (name == null || name == ''
      || city == null || city == '' || district == null || district == ''
      || address == null || address == '' || location == null
      || location == '' || gisLon == null || gisLon == '' || gisLat == null
      || gisLat == '' || baiduLon == null || baiduLon == ''
      || baiduLat == null || baiduLat == '' || contactNumber == null
      || contactNumber == '' || corpRep == null || corpRep == ''
      || corpRepContact == null || corpRepContact == ''
      || safetyRep == null || safetyRep == '' || safetyRepContact == null
      || safetyRepContact == '' || safetyMgmtRep == null
      || safetyMgmtRep == '' || safetyMgmtRepContact == null
      || safetyMgmtRepContact == '' || safetyMgmtRep2 == null
      || safetyMgmtRep2 == '' || safetyMgmtRepContact2 == null
      || safetyMgmtRepContact2 == '' || createdBy == null
      || createdBy == '' || organizationId == null || organizationId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    if (fireKeyUnitId == null || fireKeyUnitId == '') {
      XFJWT_FireKeyUnit.create({
        OrganizationId: organizationId,
        Name: name,
        City: city,
        District: district,
        Address: address,
        Location: location,
        GisLon: gisLon,
        GisLat: gisLat,
        BaiduLon: baiduLon,
        BaiduLat: baiduLat,
        ContactNumber: contactNumber,
        CorpRep: corpRep,
        CorpRepContact: corpRepContact,
        SafetyRep: safetyRep,
        SafetyRepContact: safetyRepContact,
        SafetyMgmtRep: safetyMgmtRep,
        SafetyMgmtRepContact: safetyMgmtRepContact,
        SafetyMgmtRep2: safetyMgmtRep2,
        SafetyMgmtRepContact2: safetyMgmtRepContact2,
        IsActive: true,
        CreatedBy: createdBy,
        CreatedTime: createdTime,
      }).exec(function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    } else {
      XFJWT_FireKeyUnit.update({
        FireKeyUnitId: fireKeyUnitId,
      }, {
        OrganizationId: organizationId,
        Name: name,
        City: city,
        District: district,
        Address: address,
        Location: location,
        GisLon: gisLon,
        GisLat: gisLat,
        BaiduLon: baiduLon,
        BaiduLat: baiduLat,
        ContactNumber: contactNumber,
        CorpRep: corpRep,
        CorpRepContact: corpRepContact,
        SafetyRep: safetyRep,
        SafetyRepContact: safetyRepContact,
        SafetyMgmtRep: safetyMgmtRep,
        SafetyMgmtRepContact: safetyMgmtRepContact,
        SafetyMgmtRep2: safetyMgmtRep2,
        SafetyMgmtRepContact2: safetyMgmtRepContact2,
        UpdatedBy: updatedBy,
        UpdatedTime: updatedTime,
      }).exec(function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    }
  },
  
  /**
   * read
   * read records from database
   *
   * @param pageIndex int
   * @param pageSize int
   * @param city string (optional)
   * @param district string (optional)
   * @param address string (optional)
   * @return RESTful Json
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    var city = req.param('city');
    var district = req.param('district');
    var address = req.param('address');
    var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    if (pageIndex == null || pageIndex == '' || pageSize == null
      || pageSize == '' || organizationId == null
      || organizationId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT * FROM xfjwt_FireKeyUnit WHERE IsActive = 1"
            //+ " AND OrganizationId = '" + organizationId + "'";
    var sqlTotal = "SELECT count(*) as total FROM xfjwt_FireKeyUnit WHERE IsActive = 1";
    if (city != null && city != '') {
      sql = sql + " AND City LIKE '%" + city + "%'";
      sqlTotal = sqlTotal + " AND City LIKE '%" + city + "%'";
    }
    if (district != null && district != '') {
      sql = sql + " AND District LIKE '%" + district + "%'";
      sqlTotal = sqlTotal + " AND District LIKE '%" + district + "%'";
    }
    if (address != null && address != '') {
      sql = sql + " AND Address LIKE '%" + address + "%' or Name like '%"+address+"%' ";
      sqlTotal = sqlTotal + " AND Address LIKE '%" + address + "%' or Name like '%"+address+"%' ";
    }
    sql = sql + " LIMIT " + start + ", " + pageSize;
    XFJWT_FireKeyUnit.query(sqlTotal, function(err, sqlTotalResult) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      if(sqlTotalResult.length == 0)
        return res.send({code: 404,msg: 'no data',data: ''});
      var total = sqlTotalResult[0].total;
      
      XFJWT_FireKeyUnit.query(sql, function(err, recs) {
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
  fireKeyUnitDataSync: function(req,res){
    var dataSyncSql = "replace INTO `xfjwt_FireKeyUnit` (OrganizationId,`RefId`, `Name`, `District`, `Address`,"
                    + "`Location`, `GisLon`, `GisLat`,  `ContactNumber`,"
                    + "`CorpRep`, `CorpRepContact`, `SafetyRep`, `SafetyRepContact`, `SafetyMgmtRep`,"
                    + "`SafetyMgmtRepContact`, `SafetyMgmtRep2`, `SafetyMgmtRepContact2`,"
                    + "`IsActive`,CreatedBy,CreatedTime)"
                    + "select dw.JGID, dw.ID as RefId,dw.DWMC as Name,xzcode.DMMC as District,"
                    + "dw.DWDZ as Address, dw.DLWZ as Location, dw.GIS_X as GisLon, dw.GIS_Y as GisLat,"
                    + "dw.DWDH as ContactNumber, dw.FRDB as CorpRep, dw.FRDBDH as CorpRepContact,"
                    + "dw.AQZRR as SafetyRep, dw.AQZRRDH as SafetyRepContact, dw.AQGLR as SafetyMgmtRep,dw.AQGLRDH as SafetyMgmtRepContact,"
                    + "dw.ZJZXFGLR as SafetyMgmtRep2,dw.ZJZXFGLRDH as SafetyMgmtRepContact2,"
                    + "dw.JLZT,'SYSTEM','2014-10-01 00:00:00' "
                    + "from YAGL_MHDW dw "
                    + "left join DM_SJZD xzcode on dw.XZQY=xzcode.DMZ  "
                    + "left join DM_SJZDZB xzzb on xzzb.ID=xzcode.DM_SJZD_ID and xzzb.ZDDM='XZQH' "
                    + "where dw.JLZT = 1 ";
                   /* + "where dw.JGID in ('380c59ba34aa4e879f60d3fb228bb934','fc661942efad4cedba247243a0d3f67c','07fb46eee4194403959905c440713a84',"
                    + "'81355e69029d41acab1c165183346961','1e741ddba26b40e1a48cc99ec1a8358e','87d328bd5b854158b64873318ce6a1e1',"
                    + "'b4f4c818216c4518a9bc95e821fcc78f','b1ca43b5003b4c02ac9f28edb6aa1060','b5567fe3ca874888aab93e36131cc95c',"
                    + "'335cd1fd85b34c65b9c46f6e7d3d8e87','438d57c91cb74c9e9452766d3c9f4f0a','04eb203802c2478cad0ab90fc3b0c219',"
                    + "'1d112f873e2646d18eb065607f523bee','52936bf92cca4bc79a652e2fd969f13e','0b598258c65f4f94b83e2fdf73474543',"
                    + "'acab2a26d0e34464b6c6226519a5ff47','0452b0e56e744c8a8baf158673001f46','2bd86767704d495bba35c71e40f8667c',"
                    + "'5354457ba399452dbe888de8d8d4f5b7','5b14afcad7c6456594d306669a8e3fe8','05e44e7a04f34f4cb391c8195c3ead1d',"
                    + "'5e16e1d94d7f40d993282f30ad088395','d8516f6edee543368fd81e2ffe4edb5e','10ba4f7be50b459eaa7847e3adcc9385',"
                    + "'c8b9ce28804e4ea2be3111f8c2f4f8df','6a7a938512ef4887b27edd24346a043a','b4d0565d0e674826baff583fa2ee8393', "
                    + "'2b9df4218085482ab5b25c003205c596','cb4dea08803b43a68a4ff23b96c06055') ";*/
    XFJWT_CronTask.find({TaskName: 'fireKeyUnitDataSync'})
    .exec(function(err,taskNameResult){
      if(err)
        return res.send({code: 500,msg: 'database err',data: err});
      if (taskNameResult.length == 0) 
        return res.send({code: 404,msg: 'please input task first',data: ''});
      XFJWT_CronTaskHistory.find({CronTaskId: taskNameResult[0].CronTaskId})
      .sort('DataEndTime DESC')
      .limit(1)
      .exec(function(err,crontaskIdResult){
        if(err)
          return res.send({code: 500,msg: 'crontaskIdResult err',data: err});
        if(crontaskIdResult.length == 0){
          dataSyncSql += " and dw.SJC > '2015-01-20 00:00:00'";
          var createValues = {};
          createValues.CronTaskId = taskNameResult[0].CronTaskId;
          createValues.DataEndTime = '2015-01-20 00:00:00';
          createValues.CreatedTime = UtilityService.getCurrentTime();
          createValues.Message = "重点单位更新";
          XFJWT_CronTaskHistory.create(createValues)
          .exec(function(err,createValuesResult){
            if(err)
              return res.send({code: 500,msg: 'crontaskIdResult err',data: err});
            XFJWT_CronTask.query(dataSyncSql,function(err,dataSyncSqlResult){
              if(err)
                return res.send({code: 500,msg: 'dataSyncSqlResult err',data: err});
              return res.send({code: 200,msg: 'successfully',data: ''});
            })
          })
        }else{
          var curentTime = UtilityService.getCurrentTime();
          dataSyncSql += " and dw.SJC > '"+crontaskIdResult[0].DataEndTime+"'";
          var createValues = {};
          createValues.CronTaskId = taskNameResult[0].CronTaskId;
          createValues.DataEndTime = curentTime;
          createValues.CreatedTime = UtilityService.getCurrentTime();
          createValues.Message = "重点单位更新";
          XFJWT_CronTaskHistory.create(createValues)
          .exec(function(err,createValuesResult){
            if(err)
              return res.send({code: 500,msg: 'crontaskIdResult err',data: err});
            XFJWT_CronTask.query(dataSyncSql,function(err,dataSyncSqlResult){
              if(err)
                return res.send({code: 500,msg: 'dataSyncSqlResult err',data: err});
              return res.send({code: 200,msg: 'successfully',data: ''});
            })
          })
        }
      })
    })
  },
  convertFireKeyUnitBaiduLatLon: function(req,res){
    var sql = "select FireKeyUnitId,GisLon,GisLat,BaiduLon,BaiduLat,(select count(*) from xfjwt_FireKeyUnit where BaiduLat is null) as total "
            + "from xfjwt_FireKeyUnit where BaiduLat is null limit 101";
    XFJWT_FireKeyUnit.query(sql,function(err,sqlResult){
      if(err)
        return res.send({code: 500,msg: 'crontaskIdResult err',data: err});
      if (sqlResult == '' || sqlResult == null ) {
        return res.send({code: 404,msg: 'there is no data',data: ''})
      };
      var total = sqlResult[0].total;
      var count;
      var n = total%100;
      //if(n == 0){
        //count = total%100;
      //}else{
        count = total/100 + 1;
      //}
      var countTotal = count;
      fireKeyUnitGPSConvert(countTotal,count,sqlResult,n);
      function fireKeyUnitGPSConvert(countTotal,count,sqlResult,n){
        var string = '';
        if(count == 0){
          return res.send({code: 200,msg: 'successfully',data: ''});
        }else if(count == 1){
          for(var i = (countTotal - count)*100; i < n + 1; i++){
            console.log(i);
            if (i == sqlResult.length-1) {
              string += sqlResult[i].GisLat + ',' + sqlResult[i].GisLon;
            }else{
              string += sqlResult[i].GisLat + ',' + sqlResult[i].GisLon + ';';
            }
          }
          var result = GeoConvertService.g2b(string);
          console.log(string);
          console.log(result);
          count = count -1;
          fireKeyUnitGPSConvert(countTotal,count,sqlResult,n)
        }else{
          for(var i = (countTotal - count)*100; i < (countTotal - count + 1)*100; i++){
            console.log(i);
            if (i == sqlResult.length-1) {
              string += sqlResult[i].GisLat + ',' + sqlResult[i].GisLon;
            }else{
              string += sqlResult[i].GisLat + ',' + sqlResult[i].GisLon + ';';
            }
          }
          var result = GeoConvertService.g2b(string);
          console.log(string);
          count = count -1;
          fireKeyUnitGPSConvert(countTotal,count,sqlResult,n)
        }
      }
    })
  },
  /**
   * delete
   * delete an record
   *
   * @param fireKeyUnitId int
   * @return RESTful Json
   */
  delete: function(req, res) {
    var fireKeyUnitId = req.param('fireKeyUnitId');
    if (fireKeyUnitId == null || fireKeyUnitId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    XFJWT_FireKeyUnit.update({
      FireKeyUnitId: fireKeyUnitId,
    }, {
      IsActive: false,
    }).exec(function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
}
