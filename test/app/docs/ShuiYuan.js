1, 创建或者更新水源
  /ShuiYuan/save
    * @param shuiYuanId int (optional)
    * @param refId int
    * @param number string
    * @param name string  not null
    
    * @param road string   
    * @param address string     not null
    * @param type string	not null
    * @param statusCode int		not null
    * @param baiduLon float		not null 
    * @param baiduLat float	  not null
    * @param zpurl string
    * @param fwtd string
    * @param fwtx string
    * @param fwtn string
    * @param fwtb string
  
  Return Json
  
  Example:
   192.168.10.107:1337/ShuiYuan/save?name=TEST12&address=hunan&road=test12&type=test&statusCode=1&baiduLon=12.1234&baiduLat=110.233&fwtd=/files/SYJBXXFWTD/3c968f00-c236-11e4-9338-c177326c7216.jpg
2,上传方位图
	params:
		picTag   not null    enum = ['FWTD','FWTN','FWTX','ZPWJ']
	upload file:
		name = image
	example:192.168.10.107:1337/ShuiYuan/uploadShuiYuanPic?picTag=FWTD
		<input type = 'file' name = 'image'> 
	reponse:
		{
			"code": 200,
			"msg": "upload success",
			"tpUrl": "/files/SYJBXXFWTD/3c968f00-c236-11e4-9338-c177326c7216.jpg"
		}
3, 读取水源信息
  /ShuiYuan/read
    * @param pageIndex int
    * @param pageSize int
    * @param name string (optional)
    * @param city string (optional)
    * @param address string (optional)
  Return Json
  
  Example:
    http://localhost:1337/ShuiYuan/read?pageIndex=1&pageSize=21
4, 删除水源记录
  /ShuiYuan/delete
    * @param shuiYuanId int
  
  Return Json
  
  Example:
    http://localhost:1337/ShuiYuan/delete?shuiYuanId=1
