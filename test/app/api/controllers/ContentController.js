/**
 * Author: Archer Reilly
 * Date: 23/Dec/2014
 * File: ContentController.js
 * Desc: controller for content
 *
 * Produced By Ebang.
 */
var uuid = require('node-uuid');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

module.exports = {
	/**
	 * VOD
	 * this action will receive the video related data from Android
	 * and put the video in FTP to the VOD system.
	 *
	 * @param zaiQingId string
	 * @param videoType string
	 * @param category string
	 * @param fileName string
	 * @return RESTful Json.
	 */
	VOD: function(req, res) {
		// first, get all necessary params
		var ZaiQingId = req.param('zaiQingId');
		var OrganizationId = req.session.loginInfo.userInfo.OrganizationId;
		var VideoType = req.param('videoType');
		var Category = req.param('category');
		var EncodedFileName = req.session.loginInfo.userInfo.UserName
			+ UtilityService.getCurrentTimeStamp();
		var ThumbnailUrl = sails.config.values.videoPath + 'thumbnailUrl/' + EncodedFileName + '.jpg';
		var VideoFlvUrl = sails.config.values.videoPath + 'flv/' + EncodedFileName + '.flv';
		var VideoMp4Url = sails.config.values.videoPath + 'videos/' + EncodedFileName + '.mp4';
		var BeginTime = UtilityService.getCurrentTime();
		var CreatedTime = UtilityService.getCurrentTime();
		var CreatedBy = req.session.loginInfo.userInfo.UserName;
		var fileName = req.param('fileName');
		var filePath = sails.config.values.ftpVideoPath + fileName;
		if (ZaiQingId == null || ZaiQingId == '' || VideoType == null
			|| VideoType == '' || Category == null || Category == ''
			|| fileName == null || fileName == '') {
			return res.send(sails.config.returnCode.INVALID_PARAM);
		}
		var VideoLength = UtilityService.getVideoDuration(filePath);

		// second, use ffmepg generate the thumbnail and mp4 from origin file to
		// the target dir
		// ffmpeg -i $path 2>/home/files/vod/times/$name.txt
		// ffmpeg -i $path -y -f image2 -t 0.001 -s 352x240 /home/files/vod/thumbNails/$name.jpg
		// ffmpeg -i $path -y -c copy -copyts /home/files/vod/videos/$name.mp4
		var videoLenCmd = "ffmpeg -i " + filePath + " 2>/home/files/vod/times/" + EncodedFileName + ".txt";
		var thumCmd = "ffmpeg -i " + filePath + " -y -f image2 -t 0.001 -s 352x240 /home/files/vod/thumbNails/" + EncodedFileName + ".jpg";
		var mp4Cmd = "ffmpeg -i " + filePath + " -y -c copy -copyts /home/files/vod/videos/" + EncodedFileName + ".mp4";
		exec(videoLenCmd);
		exec(thumCmd);
		exec(mp4Cmd);

		// third, save video meta info into XFJWT_Video
		XFJWT_Video.create({
			ZaiQingId: ZaiQingId,
			OrganizationId: OrganizationId,
			VideoType: VideoType,
			Category: Category,
			EncodedFileName: EncodedFileName,
			ThumbnailUrl: ThumbnailUrl,
			VideoFlvUrl: VideoFlvUrl,
			VideoMp4Url: VideoMp4Url,
			VideoLength: VideoLength,
			IsActive: 1,
			CreatedBy: CreatedBy,
			CreatedTime: CreatedTime,
			BeginTime: BeginTime
		}, function(err, recs){
			if (err) {
				sails.config.returnCode.DB_ERROR.data = err;
				return res.send(sails.config.returnCode.DB_ERROR);
			}

			sails.config.returnCode.QUERY_OK.data = recs;
			return res.send(sails.config.returnCode.QUERY_OK);
		});
		// fourth, use sockio and mqtt inform related clients of the new video
	},

	index: function(req,res){
		/*var clientCode = req.session.loginInfo.userInfo.ClientCode;
		var userId = req.session.loginInfo.userInfo.userid;*/
	var userId = req.session.loginInfo.userInfo.UserId;
    var viewUrl = 'xfjwt/filesManagement';
    var title = '文件发布管理';
    var menu = '文件发布管理';
	ReviewService.getViewPass(res,userId,viewUrl,title,menu);
	/*	LogService.saveb(req,clientCode,userId,"logout","logout","logout");
		ReviewService.getViewPass(res,userId,viewUrl,title,menu);*/
		//return res.view('filesManagement');
		//ReviewService.getViewPass(res,userId,viewUrl,title,menu);


	},

	/**
	 * save
	 * save a file
	 *
	 * @param contentId int (optional)
	 * @param contentType string
	 * @param actionType string
	 * @param description string
	 * @param version string
	 * @param fileName string
	 * @return RESTful Json
	 */
	save: function(req, res) {
	  var contentId = req.param('contentId');
	  var actionType = req.param('actionType');
	  var contentType = req.param('contentType');
	  var description = req.param('description');
	  var version = req.param('version');
	  var fileName = req.param('fileName');
	  var createdBy = req.session.loginInfo.userInfo.UserName;
	  var updatedBy = req.session.loginInfo.userInfo.UserName;
	  var createdTime = UtilityService.getCurrentTime();
	  var updatedTime = UtilityService.getCurrentTime();
	  var organizationId = req.session.loginInfo.userInfo.OrganizationId;

	  if (contentId == '' || contentId == null) {
	    if (organizationId == null || organizationId == ''
	      || contentType == null || contentType == ''
	      || createdBy == null || createdBy == '') {
	      return res.send(sails.config.returnCode.INVALID_PARAM);
	    }

      var arr = [
        {sort:'法律法规',folder:'lawRegulation'},
        {sort:'装备手册',folder:'equipmentCollection'},
        {sort:'改革丛书',folder:'reformCollection'},
        {sort:'App',folder:'xftCollection'},
        {sort:'实时直播App',folder:'realTimeApp'},
        {sort:'消防控制中心WinApp',folder:'xfControllWinApp'}
      ];

			if (contentType == arr[0].sort) {
				i = 0;
			} else if (contentType == arr[1].sort) {
				i = 1;
			} else if (contentType == arr[2].sort) {
				i = 2;
			} else if (contentType == arr[3].sort) {
				i = 3;
			} else if(contentType == arr[4].sort) {
				i = 4;
			} else {
				i = 5;
			}

      var filePath = null;
      var fileName = null;
      var streamOptions = {
        dirname: sails.config.values.contentPath + arr[i].folder
          + '/',
        saveAs: function(file) {
          fileName = file.filename;
          filePath = arr[i].folder + '/' + file.filename;
          return fileName;
        },
        completed: function(fileData, next) {
          next();
        },
      };
      req.file('file')
      .upload(Uploader.documentReceiverStream(streamOptions),
      function (err, files) {
        if (err) {
          sails.config.returnCode.FILE_ERROR.data = err;
          return res.send(sails.config.returnCode.FILE_ERROR);
        }

        XFJWT_Content.create({
          OrganizationId: organizationId,
          ContentType: contentType,
          Description: description,
          FilePath: filePath,
          FileName: fileName,
          Version: version,
          IsActive: true,
          CreatedBy: createdBy,
          CreatedTime: createdTime,
        }).exec(function(err, recs) {
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR)
          }
          //return res.redirect('/Content/index');
          sails.config.returnCode.QUERY_OK.data = recs;
          return res.send(sails.config.returnCode.QUERY_OK);

        });
      });
	  } else {
	    // TO-DO
      if(updatedBy == '' || updatedBy == null)
      	return res.send(sails.config.returnCode.LoseSomeParamters);
      var valuesUpdate = {UpdatedBy:updatedBy};
      if(contentType != '' && contentType != null)
      	valuesUpdate.ContentType = contentType;
      if(description != '' && description != null)
      	valuesUpdate.Description = description;
      if(version != '' && version != null)
      	valuesUpdate.Version = version;
      if(fileName != '' && fileName != null)
      	valuesUpdate.FileName = fileName;
      XFJWT_Content.update({ContentId:contentId},valuesUpdate)
      .exec(function(err,recs){
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
	 * @param contentType string (optional)
	 * @param fileName string (optional)
	 * @return RESTful Json
	 */
	read: function(req, res) {
	  var pageIndex = req.param('pageIndex');
	  var pageSize = req.param('pageSize');
	  var contentType = req.param('contentType');
	  var fileName = req.param('fileName');
	  var organizationId = req.session.loginInfo.userInfo.OrganizationId;
	  if (pageIndex == null || pageIndex == '' || pageSize == null
	    || pageSize == '' || organizationId == null || organizationId == '') {
	    return res.send(sails.config.returnCode.INVALID_PARAM);
	  }

	  var start = (pageIndex - 1) * pageSize;
	  var sql = "SELECT * FROM xfjwt_Content WHERE IsActive = 1"
	          + " AND OrganizationId = '" + organizationId + "'";
	  if (contentType != null && contentType != '') {
	    sql = sql + " AND ContentType LIKE '%" + contentType + "%'";
	  }
	  if (fileName != null && fileName != '') {
	    sql = sql + " AND FileName LIKE '%" + fileName + "%'";
	  }
	  var sqla = sql;
	  sql = sql + " LIMIT " + start + ", " + pageSize;

	  XFJWT_Content.query(sqla, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      var total = recs.length;

      XFJWT_Content.query(sqla, function(err, recs) {
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
	 * delete record
	 *
	 * @param contentId int
	 * @return RESTful Json
	 */
	delete: function(req,res){
		var contentId = req.param('contentId');
		if(contentId == null || contentId == '') {
		  return res.send(sails.config.returnCode.INVALID_PARAM);
		}

		XFJWT_Content.update({
		  ContentId: contentId,
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

	/**
	 * downloadContent
	 * download what content ?
	 *
	 * @param contentId int
	 * @return file
	 */
	downloadContent: function(req,res){
	  var organizationId = req.session.loginInfo.userInfo.OrganizationId;
    var userId = req.session.loginInfo.userInfo.userid;
    var contentId = req.param('contentId');
    if (contentId == '' || contentId == null) {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    XFJWT_Content.find({
      ContentId: contentId,
    }).exec(function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      if (recs.length > 0) {
        var file = sails.config.values.contentPath + recs[0].FilePath;
        if (fs.existsSync(file)) {
          return res.download(file);
        }
      } else {
        return res.send(sails.config.returnCode.NOT_FOUND);
      }
    });
	},

	/**
	 * apkUpdate
	 * android application auto update
	 *
	 * @param contentId int
	 * @return
	 */
	apkUpdate: function(req,res){
	  var sql = "SELECT Version, ContentId, OrganizationId, ContentType,"
	          + " Description, FileName, FilePath, CreatedTime FROM"
	          + " xfjwt_Content WHERE IsActive = 1 AND ContentType = 'App'"
	          + " ORDER BY CreatedTime DESC";

	  XFJWT_Content.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
	  });
	},
}
