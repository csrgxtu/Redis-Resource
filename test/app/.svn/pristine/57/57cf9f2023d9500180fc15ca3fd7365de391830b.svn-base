/**
* Author: dishy
* Date: 25/May/2014
* File: XfImageController
* Des: controller that operates on XfImage model
*
* Produced By EBang.
*/
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var mqtt = require('mqtt');
var client = mqtt.createClient(1883, 'localhost');

module.exports = {
  /**
  * imageDeploy
  * show view of image deploy
  *
  * @return view
  */
  index: function(req, res) {
    var userId = req.session.loginInfo.userInfo.userid;
    var viewUrl = 'image';
    var title = '图片管理';
    var menu = '图片管理';
    //return res.view('image');
    ReviewService.getViewPass(res,userId,viewUrl,title,menu);
  },
  
  /**
   * save
   * create a record
   *
   * @param imageType string
   * @param category string
   * @param address string
   * @param baiduLat float
   * @param baiduLon float
   * @return RESTful Json
   */
  save: function(req, res) {
    var imageType = req.param('imageType');
    var category = req.param('category');
    var address = req.param('address');
    var baiduLat = req.param('baiduLat');
    var baiduLon = req.param('baiduLon');
    var createdBy = req.session.loginInfo.userInfo.UserName;
    var createdTime = UtilityService.getCurrentTime();
    var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    if (imageType == null || imageType == '' || category == null
      || category == '' || address == null || address == ''
      || baiduLat == null || baiduLat == '' || baiduLon == null
      || baiduLon == '' || createdBy == null || createdBy == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var thumbnailUrl = sails.config.values.imagePath;
    req.file('image').upload(function(err, files) {
      if (err) {
        sails.config.returnCode.FILE_ERROR.data = err;
        return res.send(sails.config.returnCode.FILE_ERROR);
      }
      
      if (files.length > 0) {
        XFJWT_User.find({UserName: createdBy}).exec(function(err, recs) {
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }
          
          if (recs.length > 0) {
            var displayName = recs[0].DisplayName;
          } else {
            return res.send(sails.config.returnCode.NOT_FOUND);
          }
          
          var data = fs.readFileSync(files[0].fd);
          var originFileName = files[0].filename;
          var date = new Date();
          var encodedFileName = date.getTime() + '-' + originFileName;
          var imageurl = sails.config.values.imagePath + encodedFileName;
          var url = '/files/image/' + encodedFileName;
          fs.writeFileSync(imageurl, data);
          var info = {
            imageType:imageType,
            displayName:displayName,
            address:address,
            createdBy:createdBy,
            url:url,
            messageCategory:'image',
            receiver:'/image/1',
            messageContent: 'image',
            createdTime: createdTime
          };
          var tocpicName = '/ebang/image/1';
          sails.io.sockets.emit('realTimeImageDepoly', info);
          client.publish(tocpicName, JSON.stringify(info));
          
          XFJWT_Image.create({
            ImageType:imageType,
            Category:category,
            OriginFileName:originFileName,
            EncodedFileName:encodedFileName,
            Url:url,
            Address:address,
            BaiduLat:baiduLat,
            BaiduLon:baiduLon,
            CreatedBy:createdBy,
            CreatedTime:createdTime,
            ThumbnailUrl:thumbnailUrl
          }).exec(function(err,recs){
            if(err){
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.errorCode.DB_ERROR);
            }
            
            sails.config.returnCode.QUERY_OK.data = recs;
            return res.send(sails.config.returnCode.QUERY_OK);
          });
          
        });
      } else {
        return res.send(sails.config.returnCode.NOT_FOUND);
      }
    });
  },
  
  /**
   * read
   * read records
   *
   * @param pageIndex int
   * @param pageSize int
   * @param imageType string (optional)
   * @param startTime datetime (optional)
   * @param endTime datetime (optional)
   * @param readType string (optional)
   * @return RESTful Json
   */
  read: function(req, res) {
    var pageIndex = req.param('pageIndex');
    var pageSize = req.param('pageSize');
    var imageType = req.param('imageType');
    var startTime = req.param('startTime');
    var endTime = req.param('endTime');
    var readType = req.param('readType');
    var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    if (pageIndex == null || pageIndex == '' || pageSize == null
      || pageSize == '' || organizationId == null || organizationId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    if (readType == "publishNames") {
      var sql = "SELECT DISTINCT(i.CreatedBy), u.Displayname FROM xfjwt_Image"
              + " i INNER JOIN xfjwt_User u on i.CreatedBy = u.UserName";
      XFJWT_User.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    } else if (readType == "viMessage") {
      // Organization dont have organizationId, video not implemented yet, so
      // empty here
    } else if (readType == "allimageType") {
      var sql = "SELECT DISTINCT ImageType FROM xfjwt_Image";
      XFJWT_Image(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    } else {
      var start = (pageIndex - 1) * pageSize;
      var sql = "SELECT * FROM xfjwt_Image WHERE IsActive = 1";
      if (imageType != null && imageType != '') {
        sql = sql + " AND ImageType = '" + imageType + "'";
      }
      if (startTime != null && startTime != '') {
        sql = sql + " AND CreatedTime >= '" + startTime + "'";
      }
      if (endTime != null && endTime != '') {
        sql = sql + " AND CreatedTime <= '" + endTime + "'";
      }
      var sqla = sql;
      sql = sql + " LIMIT " + start + ", " + pageSize;
      
      XFJWT_Image.query(sqla, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        var total = recs.length;
        
        XFJWT_Image.query(sql, function(err, recs) {
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
    }
  },
  
  /**
   * delete
   * delete an record
   *
   * @param imageId int
   * @return RESTful Json
   */
  delete: function(req, res) {
    var imageId = req.param('imageId');
    if (imageId == null || imageId == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    XFJWT_Image.update({
      ImageId: imageId,
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
