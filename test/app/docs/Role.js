1、指定主页面
      url:/Role/index
2、创建更新Role
      url:/Role/save
      paramters:
        * @param roleId int (optional)
        * @param roleName
        * @param description
      reponse:
         sucess:            
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
          http://localhost:1337/Role/save?roleName=guest&description=guest
          http://localhost:1337/Role/save?roleId=19&roleName=guest&description=%E6%B8%B8%E5%AE%A2
3、查询功能
    url:/Role/read
    paramters:
      * @param pageIndex int
      * @param pageSize int
      * @param roleName string (optional)
    reponse:
       success:
         {
            "code": 200,
            "msg": "Successfully",
            "total": 1,
            "data": [
                {
                    "RoleId": 10,
                    "ClientCode": "EBANG",
                    "RoleName": "test2",
                    "Description": "for test",
                    "CreatedBy": "WW",
                    "CreatedTime": "2014-09-15T01:02:14.000Z",
                    "UpdatedBy": null,
                    "UpdatedTime": null
                }
            ]
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
		  参考例子：
		    http://localhost:1337/Role/read?pageIndex=1&pageSize=10
4、删除Role
      url：/Role/delete
      paramter: 
        * @param roleId int
      reponse:
        sucess:            
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
          http://localhost:1337/Role/delete?roleId=19
5、查询属于某个Role下的User
      url：/Role/getUserListByRoleId
      paramter: 
        * @param roleId int
      reponse:
        sucess:            
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
          http://localhost:1337/Role/getUserListByRoleId?roleId=19
         
              
              
              
              
              
              
            
