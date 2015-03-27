/**
 * Author: Archer Reilly
 * Date: 25/May/2014
 * File: UserController.js
 * Des: controller for user management
 *
 * Produced By Ebang
 */
module.exports = {
  /**
   * index
   * the main action of the user management functionality, do nothing
   * but display the UI
   *
   */
  index: function(req, res) {
    /*var title = '用户管理';
    var menu = 'system';
    return res.view('xfjwt/userManagement',{data:'',title: title,menu: menu});*/
    var userId = req.session.loginInfo.userInfo.UserId;
    var viewUrl = 'xfjwt/userManagement';
    var title = '用户管理';
    var menu = '用户管理';
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
  },

  /**
   * save
   * save can be create or update according to the userId
   *
   * @param userId int (optional)
   * @param userName string
   * @param displayName string
   * @param password string
   * @param title string
   * @param organizationId string
   * @param imei string
   * @param roleId int
   * @param mobilePhoneNumber number
   * @param shortNumber number
   * @param isLocked boolean
   * @return success to index, or RESTful Json
   */
  save: function(req, res) {
    var userId = req.param('userId');
    var userName = req.param('userName');
    var displayName = req.param('displayName');
    var password = req.param('password');
    var title = req.param('title');
    var organizationId = req.param('organizationId');
    var imei = req.param('imei');
    var roleId = req.param('roleId');
    var mobilePhoneNumber = req.param('mobilePhoneNumber');
    var shortNumber = req.param('shortNumber');
    var isLocked = req.param('isLocked');
    var noSequence = req.param('noSequence');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var updatedBy = createdBy;
    var createdTime = UtilityService.getCurrentTime();
    var updatedTime = createdTime;
    if (userId == null || userId == '') {

      if (userName == null || userName == '' || displayName == null
        || displayName == '' || password == null || password == ''
        || title == null || title == '' || organizationId == null
        || organizationId == '' || imei == null || imei == ''
        || roleId == null || roleId == '' || mobilePhoneNumber == null
        || mobilePhoneNumber == '' || shortNumber == null
        || shortNumber == '' || createdBy == null || createdBy == ''
        || noSequence == '' || noSequence == null
        || createdTime == null || createdTime == '' || updatedBy == null
        || updatedBy == '' || updatedTime == null || updatedTime == '') {
        return res.send(sails.config.returnCode.INVALID_PARAM);
      }
      XFJWT_User.find({ShortNumber: shortNumber})
      .exec(function(err,checkShortNumber_Result){
        if(err)
          return res.send({code: 500,msg:'database err',data: ''});
        if(checkShortNumber_Result.length > 0)
          return res.send({code: 403,msg: '短号重复，请重新填写',data: ''});
        XFJWT_User.create({
          UserName: userName,
          DisplayName: displayName,
          Password: password,
          Title: title,
          OrganizationId: organizationId,
          MobilePhoneNumber: mobilePhoneNumber,
          ShortNumber: shortNumber,
          NoSequence: noSequence,
          Imei: imei,
          IsLocked: false,
          RoleId: roleId,
          IsActive: true,
          CreatedBy: createdBy,
          CreatedTime: createdTime,
        }).exec(function(err, createResult) {
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }
          FreeSWITCHService.register(req,res,userName, shortNumber);
          /*sails.config.returnCode.QUERY_OK.data = recs;
          return res.send(sails.config.returnCode.QUERY_OK);*/
        });
      })
    } else {
      if(userName == null || userName == '' || displayName == null || displayName == ''
        || title == null || title == '' || organizationId == null || organizationId == ''
        || mobilePhoneNumber == null || mobilePhoneNumber == '' || shortNumber == null || shortNumber == ''
        || noSequence == null || noSequence == '' || roleId == null || roleId == '')
        return res.send(sails.config.returnCode.INVALID_PARAM);
      XFJWT_User.find({ShortNumber: shortNumber})
      .exec(function(err,checkShortNumber_Result){
        if(err)
          return res.send({code: 500,msg:'database err',data: ''});
        if(checkShortNumber_Result.length > 1)
          return res.send({code: 403,msg: '短号重复，请重新填写',data: ''});
        XFJWT_User.update({
          UserId: userId,
        }, {
          UserName: userName,
          DisplayName: displayName,
          //Password: password,
          Title: title,
          OrganizationId: organizationId,
          MobilePhoneNumber: mobilePhoneNumber,
          ShortNumber: shortNumber,
          Imei: imei,
          //IsLocked: ,
          NoSequence: noSequence,
          RoleId: roleId,
          IsActive: true,
          UpdatedBy: updatedBy,
          UpdatedTime: updatedTime,
        }).exec(function(err, updatedResult) {
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            console.log(err)
            return res.send(sails.config.returnCode.DB_ERROR);
          }
          FreeSWITCHService.register(req,res,updatedResult[0].UserName, shortNumber);
          /*sails.config.returnCode.QUERY_OK.data = recs;
          return res.send(sails.config.returnCode.QUERY_OK);*/
        });
      })
    }
  },
  changPassWord: function(req,res){
    var userId = req.param('userId');
    var password = req.param('password');
    XFJWT_User.update({
        UserId: userId,
      },{Password: password})
    .exec(function(err,result){
      if(err)
        return res.send({code: 500,msg: 'database err'});
      return res.send({code: 200,msg: 'successfully',data: ''});
    })
  },
  /**
   * read
   * read the user info from users table
   *
   * @param pageIndex int
   * @param pageSize int
	 * @param organizationId string (optional)
	 * @param title string (optional)
	 * @param roleId int (optional)
	 * @param displayName string (optional)
   * @return RESTful Json
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    var organizationId = req.param('organizationId');
    var title = req.param('title');
    var roleId = req.param('roleId');
    var permission = req.session.loginInfo.userInfo.Permission;
    var userOrganizationId = req.session.loginInfo.userInfo.OrganizationId;
    var displayName = req.param('displayName');
    var permissionIDS = [];
    if (pageIndex == null || pageIndex == '' || pageSize == null
      || pageSize == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    for(var i = 0;i < permission.length; i++){
      permissionIDS.push("'"+permission[i].ID+"'");
    }
    var str_p = permissionIDS.join(",");
    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT jg.JGJC,r.RoleName,u.* FROM xfjwt_User u inner join "
            + "JGXX_XFJG jg on (jg.ID = u.OrganizationId and jg.JLZT = '1')"
            + "inner join  xfjwt_Role r on r.RoleId = u.RoleId "
            + "WHERE 1 = 1 AND u.IsActive = 1 and u.OrganizationId in ("+str_p+") ";
    var sqlTotal = "SELECT count(*) as total FROM xfjwt_User u inner join "
            + "JGXX_XFJG jg on (jg.ID = u.OrganizationId and jg.JLZT = '1')"
            + "inner join  xfjwt_Role r on r.RoleId = u.RoleId "
            + "WHERE 1 = 1 AND u.IsActive = 1 and u.OrganizationId in ("+str_p+") ";
   
    if (organizationId != null && organizationId != '') {
      sqlTotal = sqlTotal + " AND u.OrganizationId = '" + organizationId + "'";
      sql = sql + " AND u.OrganizationId = '" + organizationId + "'";
    }
    
    if (title != null && title != '') {
      sql = sql + " AND u.Title like '" + title + "'";
      sqlTotal = sqlTotal + " AND u.Title like '" + title + "'";
    }
    
    if (roleId != null && roleId != '') {
      sqlTotal = sqlTotal + " AND u.RoleId = " + roleId;
      sql = sql + " AND u.RoleId = " + roleId;
    }
    
    if (displayName != null && displayName != '') {
      sqlTotal = sqlTotal + " AND u.DisplayName like '%" + displayName + "%'";
      sql = sql + " AND u.DisplayName like '%" + displayName + "%'";
    }
    var sqla = sql + " order by NoSequence "+ " LIMIT " + start + ", " + pageSize;
    XFJWT_User.query(sqlTotal, function(err, recsTolal) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      if (recsTolal == null || recsTolal == '') 
        return res.send({code: 200,msg: 'no user',data: {total: 0,recs: []}});
      var total = recsTolal[0].total;
      XFJWT_User.query(sqla, function(err, recs) {
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
   * delete a specified user according to user id
   *
   * @param userId int
   * @return success to index or RESTful Json 
   */
  delete: function(req, res) {
    var userId = req.param('userId');
    if (userId == null || userId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    XFJWT_User.update({
      UserId: userId,
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
};
