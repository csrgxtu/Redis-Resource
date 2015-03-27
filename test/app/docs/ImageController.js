1、指定主页面
   url:/Image/index
2、创建部署图
   url:/Image/save
   客户段文件上传代码:<input type="file" name="image" multiple="multiple">
   paramters:
     * @param imageType string
     * @param category string
     * @param address string
     * @param baiduLat float
     * @param baiduLon float
    response:
       success:
          {
              "code": 200,
              "msg": "Successful",
              "description": ""
          }
        paramsErr:
            {
                "code": 403,
                "msg": "Invalid Param",
                "description": "参数错误",
                "data": null
            }
        uploadFileMissing:
           文件上传失败（文件不存在）
            {
                "code": 404,
                "msg": "Not found",
      "description": "Target do not exist or you have not do something important",
               
                "data": null
            }
       dbErr:
         {
              "code": 500,
              "msg": "DATABASE ERROR",
              "description": "数据库异常，请重试"
          }
     例子:92.168.1.119:1337/Image/save?baiduLon=23.232&baiduLat=113.23232&category=部署图&address=岳阳&imageType=部署图2
3、查询功能
   url:/Image/read
   paramters:
     * @param pageIndex int
     * @param pageSize int
     * @param imageType string (optional)
     * @param startTime datetime (optional)
     * @param endTime datetime (optional)
     * @param readType string (optional)
     1、readType = publishNames  获取所有发布了图片的人
        response:
          success:
            {
              "code": 200,
              "msg": "SUCCESSFUL",
              "description": "Successfully Query database",
              "data": [
                  {
                      "CreatedBy": "WW",
                      "DisplayName": "王伟"
                  }
              ]
           
             }
          dbErr:
             {
                  "code": 500,
                  "msg": "DATABASE ERROR",
                  "description": "数据库异常，请重试"
              }
    2、readType = viMessage
       startTime  not null
       entTime  not null
         response:
           success：
             {
                "code": 200,
                "msg": "OK",
                "data": [
                    {
                        "ResourceType": "Image",
                        "VideoType": "未分类",
                        "Category": "未分类",
                        "Thumbnail": "",
                        "CreatedTime": "2014-09-04T08:36:42.000Z",
                        "DisplayName": "王伟",
                        "Url": null,
                        "OrgName": "HUNAN EBANG"
                    },]
               }
            dbErr:
             {
                  "code": 500,
                  "msg": "DATABASE ERROR",
                  "description": "数据库异常，请重试"
              }
     3、readType = allimageType
          所有图片类别
          reponse:
            success:
                 {
                      "code": 200,
                      "msg": "SUCCESSFUL",
                      "data": [
                          {
                              "ImageType": "未分类"
                          },
                          {
                              "ImageType": "部署图2"
                          }
                      ]
                 }  
             dbErr:
             {
                  "code": 500,
                  "msg": "DATABASE ERROR",
                  "description": "数据库异常，请重试"
              }
     4、pageIndex  not null
        pageSize  not null
        imageType
        clientCode
           reponse:
              success:
                {
                    "code": 200,
                    "msg": "SUCCESSFUL",
                    "total": 1,
                    "data": [
                        {
                            "ImageId": 5,
                            "ClientCode": "EBANG",
                            "ImageType": "部署图2",
                            "Category": "部署图",
                            "OriginFileName": "missing.jpg",
                            "EncodedFileName": "1409820639435-missing.jpg",
                            "Url": "/files/image/1409820639435-missing.jpg",
                            "ThumbnailUrl": "/home/dishy/Public/ebangWeb/files/image/",
                            "Address": "岳阳",
                            "BaiduLat": 113.232,
                            "BaiduLon": 23.232,
                            "CreatedBy": "WW",
                            "CreatedTime": "2014-09-04T08:50:39.000Z",
                            "UpdatedBy": null,
                            "UpdatedTime": null
                        },
                        ]
                 }
              dbErr:
                 {
                      "code": 500,
                      "msg": "DATABASE ERROR",
                      "description": "数据库异常，请重试"
                  }
       例子：192.168.1.119:1337/Image/read?pageIndex=2&pageSize=12


4、删除图片
    url:/Image/delete
    paramters：
      * @param imageId int
    reponse:
       success:
           {
            "code": 200,
            "msg": "成功",
            "description": "成功",
            "data": [
                    {
                        "ImageId": 1,
                        "ClientCode": "EBANG",
                        "ImageType": "未分类",
                        "Category": "未分类",
                        "OriginFileName": null,
                        "EncodedFileName": null,
                        "Url": null,
                        "ThumbnailUrl": null,
                        "Address": null,
                        "BaiduLat": 113.232,
                        "BaiduLon": 23.232,
                        "CreatedBy": "WW",
                        "CreatedTime": "2014-09-04T08:36:42.000Z",
                        "UpdatedBy": null,
                        "UpdatedTime": null
                    }
                 ]
             }
        paramsErr:
            {
                "code": 403,
                "msg": "Invalid Param",
                "description": "参数错误",
                "data": null
            }   
        dbErr:
             {
                  "code": 500,
                  "msg": "DATABASE ERROR",
                  "description": "数据库异常，请重试"
              }  
       
           
           
  例子：192.168.1.119:1337/Image/delete?imageId=1










