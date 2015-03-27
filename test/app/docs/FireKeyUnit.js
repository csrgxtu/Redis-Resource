1、指定主页面
      url:/KeyUnit/index

2, 创建记录
  URL:/FireKeyUnit/save
  Params:
   * @param fireKeyUnitId int (optional)
   * @param refId string
   * @param name string
   * @param city string
   * @param district string
   * @param address string
   * @param location string
   * @param gisLon float
   * @param gisLat float
   * @param baiduLon float
   * @param baiduLat float
   * @param contactNumber string
   * @param corpRep string
   * @param corpRepContact string
   * @param safetyRep string
   * @param safetyRepContact string
   * @param safetyMgmtRep string
   * @param safetyMgmtRepContact string
   * @param safetyMgmtRep2 string
   * @param safetyMgmtRepContact2 string
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/FireKeyUnit/save?fireKeyUnitId=16384&refId=1&name=test&city=test&district=test&address=fuck&location=test&gisLon=1&gisLat=1&baiduLon=1&baiduLat=1&contactNumber=test&corpRep=test&corpRepContact=test&safetyRep=test&safetyRepContact=test&safetyMgmtRep=test&safetyMgmtRepContact=test&safetyMgmtRep2=test&safetyMgmtRepContact2=test
    http://localhost:1337/FireKeyUnit/save?refId=1&name=test&city=test&district=test&address=fuck&location=test&gisLon=1&gisLat=1&baiduLon=1&baiduLat=1&contactNumber=test&corpRep=test&corpRepContact=test&safetyRep=test&safetyRepContact=test&safetyMgmtRep=test&safetyMgmtRepContact=test&safetyMgmtRep2=test&safetyMgmtRepContact2=test
    
2、创建KeyUnit
      url:/KeyUnit/save
      上传图片和*.zip文件 如form表单一样name = "file"  
      paramters：
            
         city          
         district         
         entityName       not null
         address        not null
         googleLat
         googleLon
         baiduLat
         baiduLon
         contactPerson
         contactNumber
      reponse：
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
3、修改KeyUnit
      url:/KeyUnit/save
      paramters:
         keyUnitId      not null
          
         city          
         district         
         entityName      
         address      
         googleLat
         googleLon
         baiduLat
         baiduLon
         contactPerson
         contactNumber
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
4、查询功能
     url:/KeyUnit/read
     paramters:
        pageIndex   not null
        pageSize      not null
        clientCode
        city
        district
        entityName
        address
     reponse:
       success:
            {
              "code": 200,
              "msg": "SUCCESSFUL",
              "desc": "Successfully read record",
              "total": 2,
              "data": [
                  {
                      "KeyUnitId": 1,
                      "ClientCode": "EBANG1",
                      "City": "长沙2",
                      "District": "雨花区2",
                      "EntityName": "重点单位212",
                      "Address": "韶山南路上海城12",
                      "GoogleLat": 113.2323212,
                      "GoogleLon": 29.23144512,
                      "BaiduLat": 113.3654412,
                      "BaiduLon": 28.23214712,
                      "ContactPerson": "dishy12",
                      "ContactNumber": "1862759498912",
                      "CreatedBy": "WW",
                      "CreatedTime": "2014-09-11T03:06:24.000Z",
                      "UpdatedBy": "WW",
                      "UpdatedTime": "2014-09-11T03:21:48.000Z"
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
     url:/KeyUnit/delete
     paramter:
         keyUnitId    not null
     response:
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
       
       
       
       
       
       
       
       
       
       
       
       
       
       
