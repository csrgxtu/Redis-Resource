1、realTimeGps页面
      url:/Gps/realTimeGps
2、historyGps页面  
      url:/Gps/baiduGpsTracks
3、taskGpsSurface
      url:/Gps/takGps
4、taskGpsAndroid
      url:/Gps/taskGps
5、获取Gps信息
    url:/Gps/save
      paramters:
         data{
           batchId:batchId,        not null
           userName:userName,        not null
           deviceType:deviceType,       not null
           deviceNumber:deviceNumber,    not null
           lat:lat,     not null
           lon:lon,      not null
           speed:speed,  
           eventTime:eventTime,    not null
           createdBy:createdBy     not null
         }
      
6、查询功能
    url:/Gps/read
    paramters:
      startTime   not null
      endTime   
    reponse:
       success:
         {
          "code": 200,
          "msg": "SUCCESSFUL",
          "data": [
              {
                  "GpsHistoryId": 3091,
                  "BatchId": 1,
                  "UserName": "王伟",
                  "DeviceType": "Phone",
                  "DeviceNumber": "863077029379777",
                  "BaiduLat": 28.1357,
                  "BaiduLon": 113.012,
                  "Speed": 0.9,
                  "EventTime": "2014-07-28 15:19:08",
                  "CreatedBy": "WW",
                  "CreatedTime": "2014-07-28 15:17:53"
              }]
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
