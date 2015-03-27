/*
 * Author: Archer Reilly
 * File: AuthenticationController.js
 * Date: 17/DEC/2014
 * Des: controller for authentication
 *
 * Produced By EBang.
 */
var uuid = require('node-uuid');
var fs = require('fs');
var orgZDID = "ac688795e4694bde9016a02d2218a2c2";
var orgYYID = "380c59ba34aa4e879f60d3fb228bb934";
module.exports = {
  /**
   * index
   * show the login view
   *
   * @return view
   */
  index: function (req, res) {
    return res.view('xfjwt/login', { erroInfo: '', title: '登陆', layout: null });
  },
  /**
   * main
   * show the main view
   *
   * @return view
   */
  main: function (req, res) {
    var info = req.session.loginInfo;
    if (info == '' || info == null) {
      return res.redirect('/authentication/index');
    }
    
    return res.view('index', {data: info, title: '首页', menu: 'index', layout: null});
  },
  
  /**
   * logout
   * logout system, destory session
   *
   * @return view
   */
  logout: function (req, res) {
		var userId = req.session.loginInfo.userInfo.userid;
    var info = {
      title: 'index',
      userInfo: {
        userid: null,
        UserName: null,
        DisplayName: null,
        Title: null,
        OrganizationId: null,
        SessionId: null,
      },
    };
    var sessionId = req.session.loginInfo.userInfo.SessionId;
    XFJWT_Session.destroy({
      SessionId: sessionId
    }).exec(function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      req.session.loginInfo = info;
      return res.redirect('/');
      //return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
  /**
   * loginProcessAndroid
   * process the login from android client
   * 
   * @param userName string
   * @param password string
   * @param imei string
   * @return RESTful Json
   */
  loginProcessAndroid: function (req, res) {
    var userName = req.param('userName');
    var password = req.param('password');
    var permission = [];
    if (userName == null || userName == '' || password == null
      || password == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    var sql = "SELECT * FROM xfjwt_User WHERE UserName = '" + userName
      + "' AND Password = '" + password + "' AND IsActive = 1;";
    XFJWT_User.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.NOT_FOUND);
      } else if (recs[0].IsLocked == 1) {
        var info = {
            title: 'login',
            erroInfo: '帐号锁定',
            layout: null,
            userInfo: {
            UserId: null,
            UserName: null,
            DisplayName: null,
            Password: null,
            Title: null,
            OrganizationId: null,
            Imei: null,
            SessionId: null,
            ClientId: null,
            ContactNumber: null
          },
        };
        req.session.loginInfo = info;
        return res.send(sails.config.returnCode.LOCKED);
      } else {
        var userOrganizationId = recs[0].OrganizationId;
        var createdTime = UtilityService.getCurrentTime();
        var expiredTime = UtilityService.getExpiredTime();
        var sessionId = uuid.v1();
        var SSORGID;
        
        var SSJGSQL = "select * from JGXX_XFJG where ID = '"+userOrganizationId+"'";
        JGXX_XFJG.query(SSJGSQL,function(err,relateSSJG){
          if(err)
            return res.send({code: 500,msg: 'database err SSJG',data: err});
          if(relateSSJG.length == 0)
            return res.send({code: 404,msg: 'there is nothing SSJG',data:'nothing'});
          var PERMISSIONORG =" select ID,SJJGID,JGJC from JGXX_XFJG where JLZT = 1 and JGTREE like '" +relateSSJG[0].JGTREE+ "%'";
          JGXX_XFJG.query(PERMISSIONORG,function(err,resPERMISSION){
            if(err)
              return res.send({code: 500,msg: 'database err SSJG',data: err});
            if(resPERMISSION.length == 0)
              return res.send({code: 404,msg: 'there is nothing R',data:'nothing'});
            for(var i = 0;i < resPERMISSION.length;i++){
              permission.push(resPERMISSION[i]);
            }
            JGXX_XFJG.find({ID: recs[0].OrganizationId})
              .exec(function(err,JGXX){
                if(err)
                   return res.send({code: 500,msg: 'database err',data: err});
                if(JGXX.length == 0)
                  return res.send({code: 404,msg: 'there is nothing',data:'nothing'});
                var infoServer = {
                    title: 'index',
                    userInfo: {
                    UserId: recs[0].UserId,
                    UserName: recs[0].UserName,
                    DisplayName: recs[0].DisplayName,
                    Title: recs[0].Title,
                    OrganizationId: recs[0].OrganizationId,
                    MobilePhoneNumber: recs[0].MobilePhoneNumber,
                    Imei: recs[0].Imei,
                    SessionId: sessionId,
                    OrgName:JGXX[0].JGJC,
                    Permission:permission,
                    SSORGID: SSORGID
                  },
                };
                var info = {
                  title: 'index',
                  userInfo: {
                    UserId: recs[0].UserId,
                    UserName: recs[0].UserName,
                    DisplayName: recs[0].DisplayName,
                    Title: recs[0].Title,
                    OrganizationId: recs[0].OrganizationId,
                    SessionId: sessionId,
                    ShortNumber: recs[0].ShortNumber,
                    MobilePhoneNumber: recs[0].MobilePhoneNumber,
                    Imei: recs[0].Imei,
                    OrgName:JGXX[0].JGJC,
                    SSORGID: SSORGID
                    //Permission:permission
                  },
                };
                req.session.loginInfo = infoServer;
                //return res.redirect('/authentication/main');
                XFJWT_Session.create({
                  SessionId: sessionId,
                  UserId: recs[0].UserId,
                  CreatedTime: createdTime,
                  ExpiredTime: expiredTime,
                  //LoginAndroid: 
                }).exec(function(err, recs1) {
                if (err) {
                  sails.config.returnCode.DB_ERROR.data = err;
                  return res.send(sails.config.returnCode.DB_ERROR);
                }
                 sails.config.returnCode.QUERY_OK.data = info;
                  return res.send(sails.config.returnCode.QUERY_OK);
                 // return res.redirect('/xfjwt/index');
                })
              })
          })
        }) 
      }
    });
  },
  /**
   * loginProcess
   * Process the posted username
   *
   * @param userName string
   * @param password string
   * @return view or RESTful Json
   */
  loginProcess: function (req, res) {
    function getJudge(list,orgID){
      for(var n=0;n < list.length;n++){
        if(list[n].ID == orgID){
          return true;
        }
      }
      return false;
    }
    var userName = req.param('userName');
    var password = req.param('password');
    var permission = [];
    if (userName == null || userName == '' || password == null 
      || password == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    var sql = "SELECT * FROM xfjwt_User WHERE UserName = '" + userName
      + "' AND Password = '" + password + "' AND IsActive = 1;";
    XFJWT_User.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      if (recs.length == 0) {
        return res.redirect('/Authentication/index');
        return res.send("UserName or PassWord Not Exist!");
      } else if (recs[0].IsLocked == 1) {
        /*req.flash('errorlog', "用户已被锁定,请联系管理员!");
        return res.redirect('/Authentication/index');*/
        return res.send("User Is Locked");
      } else {
        var userOrganizationId = recs[0].OrganizationId;
        var createdTime = UtilityService.getCurrentTime();
        var expiredTime = UtilityService.getExpiredTime();
        var sessionId = uuid.v1();
        var SSORGID;
        
        var SSJGSQL = "select jg.JGMC,jg.JGTREE,ifnull((select l2.ID from JGXX_XFJG l2 where l2.JGTREE = left(jg.JGTREE,24) and l2.JGXZDM like '03%' ), "
                    + "'ac688795e4694bde9016a02d2218a2c2') as JGID,u.* "
                    + "from xfjwt_User u inner join JGXX_XFJG jg on u.OrganizationId = jg.ID "
                    + "where u.UserName='"+recs[0].UserName+"'";
        console.log(SSJGSQL);
        JGXX_XFJG.query(SSJGSQL,function(err,relateSSJG){
          if(err)
            return res.send({code: 500,msg: 'database err SSJG',data: err});
          if(relateSSJG.length == 0)
            return res.send({code: 404,msg: 'there is nothing SSJG',data:'nothing'});
          //if(relateSSJG[0].Level1ID == userOrganizationId){
           // SSORGID = relateSSJG[0].Level1ID;
          //}else{
            SSORGID = relateSSJG[0].JGID;
          //}
          var PERMISSIONORG =" select ID,SJJGID,JGJC from JGXX_XFJG where JLZT = 1 and JGTREE like '" +relateSSJG[0].JGTREE+ "%'";
          JGXX_XFJG.query(PERMISSIONORG,function(err,resPERMISSION){
            if(err)
              return res.send({code: 500,msg: 'database err SSJG',data: err});
            if(resPERMISSION.length == 0)
              return res.send({code: 404,msg: 'there is nothing R',data:'nothing'});
            for(var i = 0;i < resPERMISSION.length;i++){
              permission.push(resPERMISSION[i]);
            }
            JGXX_XFJG.find({ID: recs[0].OrganizationId})
              .exec(function(err,JGXX){
                if(err)
                   return res.send({code: 500,msg: 'database err',data: err});
                if(JGXX.length == 0)
                  return res.send({code: 404,msg: 'there is nothing',data:'nothing'});
                var info = {
                    title: 'index',
                    userInfo: {
                    UserId: recs[0].UserId,
                    UserName: recs[0].UserName,
                    DisplayName: recs[0].DisplayName,
                    Title: recs[0].Title,
                    OrganizationId: recs[0].OrganizationId,
                    MobilePhoneNumber: recs[0].MobilePhoneNumber,
                    Imei: recs[0].Imei,
                    SessionId: sessionId,
                    OrgName:JGXX[0].JGJC,
                    Permission:permission,
                    SSORGID: SSORGID,
                    JGTREE: relateSSJG[0].JGTREE
                  },
                };
                req.session.loginInfo = info;
                //return res.redirect('/authentication/main');
                XFJWT_Session.create({
                  SessionId: sessionId,
                  UserId: recs[0].UserId,
                  CreatedTime: createdTime,
                  ExpiredTime: expiredTime,
                  //LoginAndroid: 
                }).exec(function(err, recs1) {
                if (err) {
                  sails.config.returnCode.DB_ERROR.data = err;
                  return res.send(sails.config.returnCode.DB_ERROR);
                }
                  return res.redirect('/xfjwt/index');
                })
              })
          })
        })           
      }
    });
  },
}

