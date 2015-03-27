//消防人员信息
获取领域类别
	url: localhost:1337/XFRYxx/getZYLY
	response: 
     {"code":200,"msg":"successfully","data":[{"DMZ":"01","DMMC":"灭火指挥领域"},{"DMZ":"02","DMMC":"抢险救援领域"},{"DMZ":"03","DMMC":"信息通信领域"},{"DMZ":"04","DMMC":"消防装备领域"},{"DMZ":"05","DMMC":"其他领域"}]}
 1 获取内部专家信息
   url: /XFRYxx/getNBZJInfo
   param: 
   		NAME   			姓名
   		LY				领域
   		JGJC			机构简称
   		pageIndex	not null	页码 （从1开始）
   		pageSize	not null	页大小
   example:
   		localhost:1337/XFRYxx/getNBZJInfo?pageIndex=1&pageSize=1
   		response:
	       	{
			    "code": 200,
			    "msg": "success",
			    "total": 15,
			    "data": [
			        {
			            "ID": "0190d6185a1448238225eed0df3b8668",
			            "XM": "孙运涛",
			            "LY": "建筑,地下空间火灾,建筑火灾",
			            "JGJC": "云溪中队",
			            "BGDH": "\u0000",
			            "ZW": "中队长",
			            "GW": "战训",
			            "XB": "男"
			        }
			    ]
			}
2 获取外部专家信息
	url：/XFRYXX/getWBZJInfo
	param: 
		NAME			姓名	
		DW				单位
		LY				领域
		WHJG			维护机构
		pageIndex	not null  页码 （从1开始）
		pageSize	not null  页大小
	example: 
		localhost:1337/XFRYXX/getWBZJInfo?NAME=王&DW=&LY=&WHJG=&pageIndex=1&pageSize=1
		response
			{
			    "code": 200,
			    "msg": "success",
			    "total": 27,
			    "data": [
			        {
			            "ID": "0045d8335508435fae2bd35a8ae5ecb3",
			            "NAME": "王波",
			            "LY": "建筑坍塌事故",
			            "SSDW": "建设院",
			            "ZW": null,
			            "BGDH": "0735-3321210",
			            "XB": "男",
			            "WHJG": "资兴市中队"
			        }
			    ]
			}