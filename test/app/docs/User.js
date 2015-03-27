1、指定主页面
   url:/User/main
2、创建更新用户
   url:/User/save
   paramters:
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
     * @param noSequence
   response:
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
     
    例子：
      http://localhost:1337/User/save?userName=lq&displayName=lq&password=lq&title=admin&organizationId=fdjsl2323&imei=23dfsjlf6y77&roleId=1&mobilePhoneNumber=10010&shortNumber=10010
      http://localhost:1337/User/save?userId=91&userName=lq&displayName=%E6%9D%8E%E5%BC%BA&password=lq&title=admin&organizationId=fdjsl2323&imei=23dfsjlf6y77&roleId=1&mobilePhoneNumber=10010&shortNumber=10010
       
3、查找用户
   url:/User/read
   paramters:
     * @param pageIndex int
     * @param pageSize int
	   * @param organizationId string (optional)
	   * @param title string (optional)
	   * @param roleId int (optional)
	   * @param displayName string (optional)
   reponse:
      success:
         {
              "code": 200,
              "msg": "SUCCESSFULL",
              "total": 1,
              "data": [
                  {
                      "CreatedTime": "2014-09-09T02:48:05.000Z",
                      "UserId": 2,
                      "UserName": "tx1",
                      "DisplayName": "田祥1",
                      "Title": "测试者1",
                      "IsLocked": 0,
                      "ContactNumber": "186275949891",
                      "ClientCode": "EBANG1",
                      "OrgName": "HUNAN EBANG",
                      "OrgLevel": 1,
                      "RoleId": 1,
                      "RoleName": "Admin"
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
 例子：
  http://localhost:1337/User/read?pageIndex=1&pageSize=10
  
 4、删除用户：
   url:/User/delete
   paramters: 
    * @param userId int
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
      http://localhost:1337/User/delete?userId=91
       
     
     
     
     
     
     
     
     
     
     
     
