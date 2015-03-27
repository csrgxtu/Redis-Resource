1,
  URL:/ZaiQing/index
2, 创建数据
  URL:/ZaiQing/save
  Param:
   * @param zaiQingId int (optional)
   * @param refZaiQingId string    
   * @param JGID string    //机构
   * @param JGJC string	//机构简称
   * @param phoneNumber string  
   * @param status string  
   * @param type string
   * @param level string
   * @param GIS_X float
   * @param GIS_Y float
   * @param GIS_H float
   * @param baiduLat float
   * @param baiduLon float
   * @param keyUnitId string
   * @param keyUnitName string
   * @param address string
   * @param description string
   * @param sendTime datetime
   * @param endTime datetime
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/ZaiQing/save?refZaiQingId=test&JGID=test&JGJC=test&phoneNumber=10086&status=test&type=test&level=test&GIS_X=12.12&GIS_Y=12.12&GIS_H=121.1&baiduLat=12.12&baiduLon=12.121&keyUnitId=test&keyUnitName=test&address=test&description=test&sendTime=2015-01-11 10:20:00&endTime=2015-01-11 10:30:00&zaiQingId=1
3、更新数据
	url: /zaiQing/save
	param: 
	  zaiQingId         not null
		zaiQingName
		phoneNumber
		keyUnitName
		address
		status
		description
		endTime
    diaoPaiDuiXiangIds
	reponse:
		1、数据源为消防救援管理系统，不可更改
			{
				"code": 404,
				"msg": "此数据为消防救援管理系统数据录入数据，不可更新！如有疑问请联系管理员！",
				"data": ""
			}
		2、消防警务通灾情，可修改
			{
				"code": 200,
				"msg": "SUCCESSFUL",
				"desc": "数据操作成功",
				"data": [
					{
						"ZaiQingId": 25,
						"RefZaiQingId": null,
						"ZaiQingName": "起火",
						"JGID": "380c59ba34aa4e879f60d3fb228bb934",
						"BJR": null,
						"JGJC": "岳阳支队",
						"PhoneNumber": "5555555",
						"Status": "完结",
						"Type": null,
						"Level": null,
						"GIS_X": null,
						"GIS_Y": null,
						"GIS_H": null,
						"Baidu_Lat": 29.479785,
						"Baidu_Lon": 113.490624,
						"KeyUnitId": null,
						"KeyUnitName": "临湘车站",
						"Address": "湖南省岳阳市临湘市福桥路3号",
						"Description": "完结了的测试",
						"SendTime": "2015-01-14 19:22:44",
						"EndTime": "2015-01-17 00:00:00",
						"CreatedBy": "HC",
						"CreatedTime": "2015-01-14 19:22:44",
						"UpdatedBy": "HC",
						"UpdatedTime": "2015-01-17 13:43:54"
					}
				]
			}
		3、数据库错误
			{code: 500,msg: 'databases err',data: ''}
	example:
	    http://localhost:1337/ZaiQing/save?zaiQingId=25&zaiQingName=车站起火&keyUnitName=临湘车站&address=湖南省岳阳市临湘市福桥路3号&status=完结&description=完结了的测试&endTime=2015-01-17 00:00:00
4, 读取数据
  URL:/ZaiQing/read
  Param:
   * @param pageIndex int  not null
   * @param pageSize int	not null
   sourceType    值可为 '','xfjwt','xfjygl'
   startTime
   endTime 
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/ZaiQing/read?pageIndex=1&pageSize=1&sourceType=xfjygl
  response:
	{
    "code": 200,
    "msg": "SUCCESSFUL",
    "desc": "数据操作成功",
    "data": {
        "recs": [
            {
                "ZaiQingId": 26,
                "ZaiQingName": "火车站起火",
                "RefZaiQingId": "1",
                "JGID": "380c59ba34aa4e879f60d3fb228bb934",
                "JGJC": "岳阳支队",
                "PhoneNumber": "13245678",
                "Status": null,
                "Type": null,
                "Level": null,
                "GIS_X": null,
                "GIS_Y": null,
                "GIS_H": null,
                "Baidu_Lon": 113.131523,
                "Baidu_Lat": 29.15081,
                "KeyUnitId": null,
                "KeyUnitName": "岳阳荣家湾站",
                "Address": "湖南省岳阳市岳阳县东方路19号",
                "Description": " 123456dfdfdf",
                "SendTime": "2015-01-14 19:22:44",
                "EndTime": null,
                "CreatedBy": "HC",
                "CreatedTime": "2015-01-14 19:27:04",
                "UpdatedBy": null,
                "UpdatedTime": null,
                "BJR": "黄超",
                "DataSource": "消防救援管理系统"
            }
        ],
        "total": 3
    }
}
5, 删除数据
  URL:/ZaiQing/delete
  Param:
   * @param zaiQingId int
  Return:
    参数错误，数据库错误，操作成功
  Example:
    http://localhost:1337/ZaiQing/delete?zaiQingId=1
6、根据灾情获取用户信息
  Url: /ZaiQing/getUserAndOrgByDiaoPaiId
  param: zaiQingId    not null
7、获取与用户相关灾情信息
  Url: /ZaiQing/getZaiQingByUserId
  param: userId not null
