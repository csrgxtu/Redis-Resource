1、指定主页面
     url:/Organization/index
2、创建Organization
     url:/Organizaton/save
     paramters:
        clientCode    not null
        orgLevel         not null
        orgName        not null
        parentOrgId   
     reponse:
        success:            
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
3、修改Organization
     url:/Organization/save
     paramters:
        organizationId         not null
        clientCode  
        orgLevel
        orgName
     reponse:
        success:            
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
4、查询功能
     url: /Organization/read
     paramters:
       pageIndex    not null
       pageSize        not null
       clientCode
       orgLevel
       orgName
     reponse:
       success:
          {
            "code": 200,
            "msg": "SUCCESSFUL",
            "desc": "Successfully read record",
            "total": 1,
            "data": [
                {
                    "ParentOrgId": null,
                    "OrganizationId": 2,
                    "ClientCode": "EBANG",
                    "OrgLevel": 2,
                    "OrgName": "CHANGSHA 1",
                    "CreatedBy": "WW",
                    "CreatedTime": "2014-09-12T01:52:01.000Z",
                    "UpdatedBy": "WW",
                    "UpdatedTime": "2014-09-12T02:08:06.000Z"
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
5、删除功能
    url:/Organization/delete
    paramter:
       organizationId   not null
6、获取组织树桩结构
    url:/Organization/readOrgTree
    
       
       
       
       
         
        
        
        
        
        
        
