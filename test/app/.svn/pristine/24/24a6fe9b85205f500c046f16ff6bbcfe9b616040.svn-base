1、指定主页面  
     url: /SysCode/main
2、创建更新SysCode
     url: /SysCode/save
     paramters:
       * @param sysCodeId int (optional)
       * @param codeCategory string
       * @param codeDisplayName string
       * @param description string
     reponse：
         success：
             {
                    "code": 200,
                    "msg": "SCUSSFUL",
                    "desc": "Successfully create record",
                    "data": {
                        "ClientCode": "SHC",
                        "CodeCategory": "测试13",
                        "CodeDisplayName": "打死黑的",
                        "Description": "打死黑的",
                        "CreatedBy": "WW",
                        "CreatedTime": "2014-09-05T03:24:59.000Z",
                        "SysCodeId": 4
                    }
                }
           paramsErr：
                参数错误
                {
                    "code": 403,
                    "msg": "Invalid Param",
                    "description": "参数错误",
                    "data": null
                }
           dbErr:
                 数据库错误
                 {
                    "code": 500,
                    "msg": "DATABASE ERROR",
                    "description": "数据库异常，请重试"
                 }
           Example:
            http://localhost:1337/SysCode/save?codeCategory=%E7%AE%A1%E7%90%86%E7%B1%BB%E5%9E%8B&codeDisplayName=%E7%AE%A1%E7%90%86%E7%B1%BB%E5%9E%8B&description=what
            http://localhost:1337/SysCode/save?sysCodeId=1&codeCategory=%E7%AE%A1%E7%90%86%E7%B1%BB%E6%80%A7&codeDisplayName=%E7%AE%A1%E7%90%86%E7%B1%BB%E6%80%A7&description=whatdes
            
 3、查询功能
      url: /SysCode/read
      paramters:
       * @param pageIndex int
       * @param pageSize int
       * @param codeCategory string (optional)
       * @param codeDisplayName string (optional)
      reponse:
           success:
           {
                "code": 200,
                "msg": "success",
                "total": 5,
                "codeCategory": [
                    {
                        "CodeCategory": "测试14"
                    },
                    {
                        "CodeCategory": "测试"
                    },
                    {
                        "CodeCategory": "测试1"
                    },
                    {
                        "CodeCategory": "测试13"
                    }
                ],
                "data": [
                    {
                        "SysCodeId": 5,
                        "ClientCode": "SHC",
                        "CodeCategory": "测试14",
                        "CodeDisplayName": "打死黑的",
                        "Description": "打死黑的",
                        "CreatedBy": "WW",
                        "CreatedTime": "2014-09-05T06:49:39.000Z",
                        "UpdatedBy": null,
                        "UpdatedTime": null
                    }
                ]
            }
          paramsErr：
              参数错误
              {
                  "code": 403,
                  "msg": "Invalid Param",
                  "description": "参数错误",
                  "data": null
              }
          dbErr:
             数据库错误
             {
                "code": 500,
                "msg": "DATABASE ERROR",
                "description": "数据库异常，请重试"
             }
			  Example:
			    http://localhost:1337/SysCode/read?pageIndex=1&pageSize=10
 4、删除SysCode
       url: /SysCode/delete
       paramter:
        * @param sysCodeId int
       reponse:
           success:
              {
                  "code": 200,
                  "msg": "Successful",
                  "description": ""
              }
           paramsErr：
              参数错误
              {
                  "code": 403,
                  "msg": "Invalid Param",
                  "description": "参数错误",
                  "data": null
              }
          dbErr:
             数据库错误
             {
                "code": 500,
                "msg": "DATABASE ERROR",
                "description": "数据库异常，请重试"
             }
          Example:
            http://localhost:1337/SysCode/delete?sysCodeId=1
           
           
                   
              
              
              
              
