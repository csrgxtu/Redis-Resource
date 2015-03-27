1、指定主页面
     url:/Resource/main
2、创建更新资源
     url:/Resource/save
     paramters:
       * @param resourceId int (optional)
       * @param moduleName string
       * @param resourceName string
       * @param resourceUrl string
     reponse:
        success：
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
          http://localhost:1337/Resource/save?moduleName=%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86&resourceName=%E8%B5%84%E6%BA%90%E5%88%9B%E5%BB%BA&resourceUrl=/Resource/save
          http://localhost:1337/Resource/save?resourceId=1&moduleName=%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86&resourceName=%E5%88%9B%E5%BB%BA%E6%9B%B4%E6%96%B0%E8%B5%84%E6%BA%90&resourceUrl=/Resource/save
3、查询功能
    url:/Resource/read
    paramters:
      * @param pageIndex int
      * @param pageSize int
      * @param moduleName string (optional)
      * @param resourceName string (optional)
      * @param resourceUrl string (optional)
    reponse:
       success:
           {
              "code": 200,
              "msg": "Successfully",
              "total": 3,
              "data": [
                  {
                      "ResourceId": 1,
                      "ClientCode": "",
                      "ModuleName": "系统代码",
                      "ResourceName": "创建资源",
                      "ResourceUrl": "/Resource/save",
                      "CreatedBy": "WW",
                      "CreatedTime": "2014-09-09T08:40:13.000Z",
                      "UpdatedBy": null,
                      "UpdatedTime": null
                  },
                  {
                      "ResourceId": 2,
                      "ClientCode": "",
                      "ModuleName": "系统代码",
                      "ResourceName": "修改资源",
                      "ResourceUrl": "/Resource/save",
                      "CreatedBy": "WW",
                      "CreatedTime": "2014-09-09T08:42:17.000Z",
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
        http://localhost:1337/Resource/read?pageIndex=1&pageSize=10
4、删除功能
      url:/Resource/delete
      paramter:
        * @param resourceId int
      response:
         success：
              {
                  "code": 200,
                  "msg": "Successful",
                  "description": ""
              }
       dbErr:
               数据库错误
               {
                  "code": 500,
                  "msg": "DATABASE ERROR",
                  "description": "数据库异常，请重试"
               } 
       paramsErr：
              参数错误
              {
                  "code": 403,
                  "msg": "Invalid Param",
                  "description": "参数错误",
                  "data": null
              }
       Example:
        http://localhost:1337/Resource/delete?resourceId=1     
        
        
        
        
        
        
