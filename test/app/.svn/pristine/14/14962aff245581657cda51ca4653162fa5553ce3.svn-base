/**
* Author: Archer Reilly
* Date: 08/Jun/2014
* File: ResourceController.js
* Des: controller file for Resource
*
* Produced By EBang.
*/
module.exports = {
	/**
	* create
	* create an record in Resource table
	*
	* @param resourceName string
	* @param resourceUrl string
	* @param createdBy string
	* @return RESTful Json
	*/
	index: function(req, res) {
   /* var title = '资源管理';
    var menu = 'system';
    return res.view('xfjwt/resource',{data:'',title: title,menu: menu});*/
		var userId = req.session.loginInfo.userInfo.UserId;
	    var viewUrl = 'xfjwt/resource';
	    var title = '资源管理';
	    var menu = 'system';
    //return res.view('image');
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
		// return res.view({data:"cao"},'xfjwt/resource');
	},

  /**
   * save
   * create or update record according to resourceId
   *
   * @param resourceId int (optional)
   * @param moduleName string
   * @param resourceName string
   * @param resourceUrl string
   * @return RESTful Json
   */
  save: function(req, res) {
    var resourceId = req.param('resourceId');
    var moduleName = req.param('moduleName');
    var resourceName = req.param('resourceName');
    var resourceUrl = req.param('resourceUrl');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    //var createdBy = 'archer'
    var updatedBy = createdBy;
    var createdTime = UtilityService.getCurrentTime();
    var updatedTime = createdTime;
    if (moduleName == null || moduleName == '' || resourceName == null
      || resourceName == '' || resourceUrl == null || resourceUrl == ''
      || createdBy == null || createdBy == '' || createdTime == null
      || createdTime == '' || updatedBy == null || updatedBy == ''
      || updatedTime == null || updatedTime == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    if (resourceId == null || resourceId == '') {
      XFJWT_Resource.create({
        ModuleName: moduleName,
        ResourceName: resourceName,
        ResourceUrl: resourceUrl,
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
     
      XFJWT_Resource.update({
        ResourceId: resourceId,
      }, {
        ModuleName: moduleName,
        ResourceName: resourceName,
        ResourceUrl: resourceUrl,
        IsActive: true,
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
   * read records
   *
   * @param pageIndex int
   * @param pageSize int
   * @param moduleName string (optional)
   * @param resourceName string (optional)
   * @param resourceUrl string (optional)
   * @return RESTful Json
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    var moduleName = req.param('moduleName');
    var resourceName = req.param('resourceName');
    var resourceUrl = req.param('resourceUrl');
    if (pageIndex == null || pageIndex == '' || pageSize == null
      || pageSize == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT * FROM xfjwt_Resource WHERE IsActive = 1";
    if (moduleName != null && moduleName != '') {
      sql = sql + " AND ModuleName LIKE '%" + moduleName + "%'";
    }
    if (resourceName != null && resourceName != '') {
      sql = sql + " AND ResourceName LIKE '%" + resourceName + "%'";
    }
    if (resourceUrl != null && resourceUrl != '') {
      sql = sql + " AND ResourceUrl LIKE '%" + resourceUrl + "%'";
    }
    var sqla = sql;
    sql = sql + " order By ModuleName LIMIT " + start + ", " + pageSize;
    
    XFJWT_Resource.query(sqla, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      var total = recs.length;
      
      XFJWT_Resource.query(sql, function(err, recs) {
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
  getResourceList: function(req,res){
    var sql = "select ModuleName,GROUP_CONCAT(ResourceId) as Id,GROUP_CONCAT(ResourceName) as UrlName,GROUP_CONCAT(ResourceUrl) as Urls "
            + "from xfjwt_Resource where IsActive = '1' GROUP BY ModuleName";
    XFJWT_Resource.query(sql,function(err,result){
      if(err)
        return res.send({code: 500,msg: 'databases err',data: ''});
      var data = {};
      data.text = '功能菜单';
      data.children = [];
      for(var i = 0;i < result.length;i++){
        var node = {};
        node.text = result[i].ModuleName;
        node.children = [];
        ids = result[i].Id.split(',');
        urlNames = result[i].UrlName.split(',');
        for(var j = 0;j < ids.length;j++){
          node.children.push({
            id: ids[j],
            text: urlNames[j],
            checked: 0
          })
        }
        data.children.push(node);
      }
      var finData = [];
      finData[0] = data;
      return res.send({code: 200,msg: 'successfully',data: finData});
    })
  },
  /**
   * delete
   * delete an record according to resourceId
   *
   * @param resourceId int
   * @return RESTful Json
   */
  delete: function(req, res) {
    var resourceId = req.param('resourceId');
    if (resourceId == null || resourceId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    XFJWT_Resource.update({
      ResourceId: resourceId,
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
