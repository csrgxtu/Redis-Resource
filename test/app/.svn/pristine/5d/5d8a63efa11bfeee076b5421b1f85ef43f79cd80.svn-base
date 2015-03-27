/**
* Author: Archer Reilly
* File: RoleController.js
* Date: 25/May/2014
* Des: controller for Role model
*
* Produced By EBang.
*/
module.exports = {
  /**
  * index
  * show the view of role management panel
  *
  * @return view
  */
  index: function(req, res) {
    /*var title = '角色管理';
    var menu = 'system';
    return res.view('xfjwt/rolepermissions',{data:'',title: title,menu: menu});*/
    var userId = req.session.loginInfo.userInfo.UserId;
    var viewUrl = 'xfjwt/rolepermissions';
    var title = '角色管理';
    var menu = 'system';
    //return res.view('image');
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
  },
  
  /**
   * save
   * create or update according to the roleId
   *
   * @param roleId int (optional)
   * @param roleName string
   * @param description string
   * @param resources csv string
   * @return RESTful Json
   */
  save: function(req, res) {
    var roleId = req.param('roleId');
    var roleName = req.param('roleName');
    var description = req.param('description');
    var resources = req.param('resources');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var updatedBy = createdBy;
    var createdTime = UtilityService.getCurrentTime();
    var updatedTime = createdTime;
    if (roleName == null || roleName == '' || description == null
      || description == '' || createdBy == null
      || createdBy == '' || createdTime == null
      || createdTime == '' || updatedBy == null
      || updatedBy == '' || updatedTime == null
      || updatedTime == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    resources = resources.split(',');
   // console.log(resources);
    if (roleId == null || roleId == '') {
      XFJWT_Role.create({
        RoleName: roleName,
        Description: description,
        IsActive: true,
        CreatedBy: createdBy,
        CreatedTime: createdTime,
      }).exec(function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        var roleId = recs.RoleId;
        var values = "";
        length = resources.length;
       // console.log('changdu = ' + resources.length);
        for(var i = 0;i < length;i++){
         // console.log(i);
          if(i == (length - 1)){
            values += "("+resources[i]+","+roleId+")";
             
          }else{
            values += "("+resources[i]+","+roleId+"),";
          }
        };
        var sql = "insert into xfjwt_resource_roles__role_resources(resource_Roles,role_Resources) values "+values+"";
        XFJWT_Role.query(sql,function(err,result){
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }

          sails.config.returnCode.QUERY_OK.data = result;
          return res.send(sails.config.returnCode.QUERY_OK);
        });
      });
    } else {
      XFJWT_Role.update({
        RoleId: roleId,
      }, {
        RoleName: roleName,
        Description: description,
        UpdatedBy: updatedBy,
        UpdatedTime: updatedTime,
      }).exec(function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        var values = "";
        length = resources.length;
        for(var i = 0;i < length;i++){
          if(i == (length - 1)){
            values += "("+resources[i]+","+roleId+")";
             
          }else{
            values += "("+resources[i]+","+roleId+"),";
          }
        };
        var sqlDEL = "delete from xfjwt_resource_roles__role_resources where role_Resources = " + roleId;
        var sql = "replace into xfjwt_resource_roles__role_resources(resource_Roles,role_Resources) values "+values+"";
        XFJWT_Role.query(sqlDEL,function(err,resDEL){
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }
          XFJWT_Role.query(sql,function(err,result){
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }

            sails.config.returnCode.QUERY_OK.data = result;
            return res.send(sails.config.returnCode.QUERY_OK);
          });
        })
      });
    }
  },
  
  /**
   * read
   * read records from XFJWT_Role
   *
   * @param pageIndex int
   * @param pageSize int
   * @param roleName string (optional)
   * @param RESTful Json
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    var roleName = req.param('roleName');
    if (pageIndex == null || pageIndex == '' || pageSize == null
      || pageSize == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT * FROM xfjwt_Role WHERE IsActive = 1";
    if (roleName != null && roleName != '') {
      sql = sql + " AND RoleName like '%" + roleName + "%'";
    }
    var sqla = sql;
    sql = sql + " LIMIT " + start + ", " + pageSize;
    
    XFJWT_Role.query(sqla, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var total = recs.length;
      
      XFJWT_Role.query(sql, function(err, recs) {
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
   * delete an record, actually not delete it, but set flag
   *
   * @param roleId int
   * @return RESTful Json
   */
  delete: function(req, res) {
    var roleId = req.param('roleId');
    if (roleId == null || roleId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    XFJWT_Role.update({
      RoleId: roleId,
    }, {
      IsActive: false,
    }).exec(function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
  
  /**
   * getUserListByRoleId
   * get user list by role id
   *
   * @param roleId int
   * @return RESTful Json
   */
  getUserListByRoleId: function(req, res) {
    var roleId = req.param('roleId');
    if (roleId == null || roleId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var sql = "SELECT DisplayName FROM xfjwt_User WHERE RoleId = " + roleId
            + " AND IsActive = 1";
    XFJWT_User.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },
  getMsgByRoleId: function(req,res){
    var roleId = req.param('roleId');
    if(roleId == null || roleId == '')
      return res.send({code: 403,msg: '参数错误',data: ''});
    var data = {};
    data.text = "功能菜单";
    data.children = [];
    var sql = "select r.ResourceId,r.ModuleName,r.ResourceName,r.ResourceUrl,if(r1.role_Resources,1,0) as checked "
            + "from xfjwt_Resource r "
            + "left join xfjwt_resource_roles__role_resources r1 "
            + "on (r1.role_Resources = "+roleId+" and r1.resource_Roles = r.ResourceId) "
            + "ORDER BY r.ModuleName";
    XFJWT_Role.query(sql,function(err,result){
      if(err)
        return res.send({code: 500,msg: 'successfully',data: ''});
      
      var j = 0;
      data.children[j] = {
                          text: result[0].ModuleName,
                          children: [{
                                     id: result[0].ResourceId,
                                     text: result[0].ResourceName,
                                     checked: result[0].checked
                                    }]
                          };
      for(var i = 1;i < result.length;i++){
        var node = {id: result[i].ResourceId,text: result[i].ResourceName,checked: result[i].checked};
        if(data.children[j].text == result[i].ModuleName){
          data.children[j].children.push(node);
        }else{
          j = j + 1;
          data.children[j] = {
                          text: result[i].ModuleName,
                          children: [{
                                     id: result[i].ResourceId,
                                     text: result[i].ResourceName,
                                     checked: result[i].checked
                                    }]
                          };
        }
      }
      //console.log(data);
      var finData = [];
      finData[0] = data;
      return res.send({code: 200,msg: 'successfully',data: finData});
    })
  }
}
