1,
  URL:/ZaiQingDiaoPai/index
  
2, 创建或者更新数据
  URL:/ZaiQingDiaoPai/save
  Param:
      zaiQingId   not null
      diaoPaiDuiXiangIds  not null 
  
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/ZaiQingDiaoPai/save?zaiQingId=26&diaoPaiDuiXiangIds=1,2,3,4
3, 读取数据
  URL:/ZaiQingDiaoPai/read
  Param:
   * @param pageIndex int
   * @param pageSize int
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/ZaiQingDiaoPai/read?pageIndex=1&pageSize=10
4, 删除数据
  URL:/ZaiQingDiaoPai/delete
  Param:
   * @param zaiQingDiaoPaiId int
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/ZaiQingDiaoPai/delete?zaiQingDiaoPaiId=1
5、接警信息推送
  Url: /ZaiQingDiaoPai/sendTypeMsg
  param: msgType
         users     not null 
         zaiQingId    not null
  Example: http://localhost:1337/ZaiQingDiaoPai/sendTypeMsg?msgType=&users=WW,EBANG&zaiQingId=25
  response:
    {
        "code": 200,
        "msg": "sendTypeMsg successfully",
        "data": ""
    }
