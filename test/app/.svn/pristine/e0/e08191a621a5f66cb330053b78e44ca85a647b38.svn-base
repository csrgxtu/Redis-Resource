mqttTopic:
	imageTopic: /xfImage/hnxf/yyxf/ + userName
socketTopic:
	imageTopic: realTimeImageDepoly
1、重点单位
	Url: /FireKeyUnit/key_UnitAndroid
2、获取灾情===>替代以前的获得taskInfo 任务接口
	Url: /ZaiQing/getUnfinishZaiQing
	reponse:
		databaseserr:
			{code: 500,msg: 'databases err',data: err}
		success:
			{
			    "code": 200,
			    "msg": "successfully",
			    "data": [
			        {
			            "ZaiQingId": 25,
			            "ZaiQingName": "车站起火"
			        }
			    ]
			}
3、上传图片
	Url: /XfImage/save
	param: 
		zaiQingId  not null
		imageType  not null
		baiduLat   not null
		baiduLon   not null
		address
		image 	   files
	example: 
		http://124.232.154.82:1337/XfImage/save?zaiQingId=25&imageType=灭火救援&baiduLat=12.11&baiduLon=113.23&address=test
4、上传视频
	rtmp://ip:1935/appname/stream
	param:
		zaiQingId    			not null
		organizationId			not null
		videoType				not null
		createdBy				not null

5、获取视频类别
	Url: /sysCode/read?pageIndex=1&pageSize=100&codeCategory=视频类别
6、获取图片类别
	Url: /sysCode/read?pageIndex=1&pageSize=100&codeCategory=图片类别
7、获取最小会议Number
	Url: /XfVideoInfo/getMinMeetingNumber
8、获取人员信息
	Url: /User/read
	param:
		pageIndex		not null
		pageSize		not null
		organizationId
		title
		roleId
		displayName
9、视频查看
	Url: /XfVideoInfo/read
	param:
		organizationId
		videoType
		category
		startTime
		endTime
		userName    ==>displayName
		pageIndex   not null
		pageSize	not null
10、发送文字消息
	Url: /Xfjwt/sendTextMsg
	param:
		dataMsg   
			{
				
			}