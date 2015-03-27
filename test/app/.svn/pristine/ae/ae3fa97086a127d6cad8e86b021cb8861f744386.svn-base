/**
* Author: dishy
* Date: 25/May/2014
* File: XfCodeController
* Des: controller that operates on XfImage model
*
* Produced By EBang.
*/

module.exports = {

/**
* create
* create an record in database
*
* @param codeCategory string
* @param codeDisplayName string
* @param description string
* @param createdBy string
* @return RESTful Json
*/
	index: function(req, res) {
     
		var userId = req.session.loginInfo.userInfo.UserId;
	    var viewUrl = 'xfjwt/code';
	    var title = '系统代码';
	    var menu = 'system';
    //return res.view('image');
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
			// return res.view('xfjwt/code');
	},

  /**
   * save
   * create or update record according to SysCodeId
   *
   * @param sysCodeId int (optional)
   * @param codeCategory string
   * @param codeDisplayName string
   * @param description string
   * @return RESTful Json
   */
  save: function(req, res) {
    var sysCodeId = req.param('sysCodeId');
    var codeCategory = req.param('codeCategory');
    var codeDisplayName = req.param('codeDisplayName');
    var description = req.param('description');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var updatedBy = createdBy;
    var createdTime = UtilityService.getCurrentTime();
    var updatedTime = createdTime;
    var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    if (codeCategory == null || codeCategory == '' || codeDisplayName == null
      || codeDisplayName == '' || description == null || description == ''
      || createdBy == null || createdBy == '' || createdTime == null
      || createdTime == '' || updatedBy == null || updatedBy == ''
      || updatedTime == null || updatedTime == '' || organizationId == null
      || organizationId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    console.log('sysCodeId = ' + sysCodeId);
    if (sysCodeId == null || sysCodeId == '') {
      XFJWT_SysCode.create({
        OrganizationId: organizationId,
        CodeCategory: codeCategory,
        CodeDisplayName: codeDisplayName,
        Description: description,
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
      XFJWT_SysCode.update({
        SysCodeId: sysCodeId,
      }, {
        OrganizationId: organizationId,
        CodeCategory: codeCategory,
        CodeDisplayName: codeDisplayName,
        Description: description,
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
   * @param codeCategory string (optional)
   * @param codeDisplayName string (optional)
   * @return RESTful Json
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    var codeCategory = req.param('codeCategory');
    var codeDisplayName = req.param('codeDisplayName');
    var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    if (pageIndex == null || pageIndex == '' || pageSize == null
      || pageSize == '' || organizationId == null || organizationId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var start = (pageIndex - 1) * pageSize;
    var sql = "SELECT * FROM xfjwt_SysCode WHERE IsActive = 1";
    if (codeCategory != null && codeCategory != '') {
      sql = sql + " AND CodeCategory LIKE '%" + codeCategory + "%'";
    }
    if (codeDisplayName != null && codeDisplayName != '') {
      sql = sql + " AND CodeDisplayName LIKE '%" + codeDisplayName + "%'";
    }
    var sqla = sql;
    sql = sql + " order by CodeCategory LIMIT " + start + ", " + pageSize;
    XFJWT_SysCode.query(sqla, function(err, total1) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      var total = total1.length;
      XFJWT_SysCode.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        var sqlb = "select distinct CodeCategory from xfjwt_SysCode";
        XFJWT_SysCode.query(sqlb,function(err,disCodeCategory){
          if(err)
            return res.send({code: 500,msg: 'database err',data:err});
          return res.send({code: 200,msg: 'successfully',total: total,codeCategory: disCodeCategory,data: recs});
        })
      });
    });
  },
  
  /**
   * delete
   * delete an record
   *
   * @param sysCodeId int
   * @return RESTful Json
   */
  delete: function(req, res) {
    var sysCodeId = req.param('sysCodeId');
    if (sysCodeId == null || sysCodeId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    XFJWT_SysCode.update({
      SysCodeId: sysCodeId,
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

