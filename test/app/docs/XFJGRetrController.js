1 消防人员信息

2 应急联动信息
  url: /XFJGRetr/getYYLDDWInfo
  param:
  	   DWMC     单位名称
  	   YJFWNR		应急服务内容
  	   DWDZ			单位地址
  	   DWLX		单位类型
  	   JGTREE			JGTREE
  	   pageIndex  not null   start with 1
  	   pageSize  not null
 example: 
 	localhost:1337/XFJGRetr/getYYLDDWInfo?DWMC=安化县人民医院&pageIndex=1&pageSize=10&DWLX=医疗救护&JGTREE=0100000043000000430090004300922443009354
 	response:
{"code":200,"msg":"success","total":1,"data":
	[{"ID":"006045525580415d8a5629c1cdcd7ded",
	"DWMC":"安化县人民医院","LXR":"\u0000","LXDH":"\u0000","YJFWNR":"\u0000","DWDZ":"\u0000","DWLX":"医疗救护","JGJC":"安化中队","JGTREE":"0100000043000000430090004300922443009354"}]}
 应急联动单位类型
  url: localhost:1337/XFJGRetr/readYYLDDWLX
  response:
	{"code":200,"msg":"successfully","data":[{"DMZ":"22","DMMC":"武警"},{"DMZ":"02","DMMC":"交管"},{"DMZ":"07","DMMC":"供气"},{"DMZ":"08","DMMC":"供热"},{"DMZ":"12","DMMC":"公路"},{"DMZ":"01","DMMC":"治安"},{"DMZ":"11","DMMC":"铁路"},{"DMZ":"25","DMMC":"陆航"},{"DMZ":"03","DMMC":"反恐"},{"DMZ":"20","DMMC":"林业"},{"DMZ":"06","DMMC":"供电"},{"DMZ":"05","DMMC":"供水"},{"DMZ":"09","DMMC":"通信"},{"DMZ":"04","DMMC":"应急"},{"DMZ":"13","DMMC":"民航"},{"DMZ":"10","DMMC":"医疗救护"},{"DMZ":"16","DMMC":"安监部门"},{"DMZ":"19","DMMC":"水利部门"},{"DMZ":"15","DMMC":"气象部门"},{"DMZ":"26","DMMC":"建筑单位"},{"DMZ":"14","DMMC":"环保部门"},{"DMZ":"23","DMMC":"防化部队"},{"DMZ":"17","DMMC":"海事部门"},{"DMZ":"18","DMMC":"地震部门"},{"DMZ":"24","DMMC":"工程兵部队"},{"DMZ":"99","DMMC":"其他有关单位"},{"DMZ":"21","DMMC":"新闻宣传部门"}]}
3 战勤保障单位及保障能力
  url: /XFJGRetr/BZDWInfo
  param: 
      BZDW    保障单位
      BZLB	  保障类别
      WHJG	  维护机构
  example: 
  		localhost:1337/XFJGRetr/BZDWInfo?pageIndex=1&pageSize=100&WHJG=一中队&BZLB=其他社会机构&BZDW=市林业局
  	  response:
{"code":200,"msg":"success","total":1,"data":[{"ID":"402886f538e7436f01391fc30cd22964","BZDW":"市林业局","ZYMC":null,"BZLB":"其他社会机构","BZNL":"资源保护","LXDH":"8847110","WHJG":"一中队"}]}
 保障单位类型
 url: localhost:1337/XFJGRetr/readBZDWLX
 reponse:
	{"code":200,"msg":"successfully","data":[{"DMZ":"04","DMMC":"通信"},{"DMZ":"03","DMMC":"油料"},{"DMZ":"01","DMMC":"餐饮"},{"DMZ":"02","DMMC":"住宿"},{"DMZ":"09","DMMC":"医疗救护"},{"DMZ":"05","DMMC":"交通运输"},{"DMZ":"07","DMMC":"车辆修理"},{"DMZ":"08","DMMC":"器材修理"},{"DMZ":"10","DMMC":"特种装备"},{"DMZ":"06","DMMC":"装备器材供应"},{"DMZ":"99","DMMC":"其他社会机构"}]}
6 灭火药剂
   灭火药剂类型：
	url: localhost:1337/XFJGRetr/getMHYJLX
	response: 
               {"code":200,"msg":"successfully","data":[{"DMZ":"40000000","DMMC":"灭火药剂","CHILDREN":[{"DMZ":"41000000","DMMC":"水灭火剂"},{"DMZ":"42000000","DMMC":"泡沫灭火剂"},{"DMZ":"43000000","DMMC":"干粉灭火剂"},{"DMZ":"44000000","DMMC":"气体灭火剂"},{"DMZ":"49000000","DMMC":"其他灭火剂"}]}]}
  灭火药剂信息
	url and example: localhost:1337/XFJGRetr/getMHYJInfo?jgtree=010000004300000043006000&jgID=380c59ba34aa4e879f60d3fb228bb934&zblxdm=43010200
	param:
		jgID
		jgtree
		zblxdm
	reponse:
		{"code":200,"msg":"successfully","data":[{"ZBQCMC":"ABC类干粉灭火剂","ZBQCFLDM":"43010200","KCSL":5,"JGJC":"岳阳支队"}]}
7 车辆信息
    车辆装备信息
	url: localhost:1337/XFJGRetr/getCLZBInfo
	param: pageIndex  not null
		pageSize  not null
		jgtree
	example: localhost:1337/XFJGRetr/getCLZBInfo?pageIndex=1&pageSize=1&jgtree=010000004300000043001000
        reponse: 
{"code":200,"total":352,"msg":"success","data":[{"JGID":"e4b2343d84034f6db30fb14c49e84f26","JGJC":"特勤一中队","ID":"402886f5446638f80144679bef631d8f","GGXH":"MG5160TXFHX40","CLZL":"专勤类消防","CLLX":"化学洗消消防车（HX）","SB":"贝麦克斯","ZRRXM":"郑磊","YS":"红色","CPHM":"WJ湘6025X","CCRQ":"2002-02-09 00:00:00","ZBRQ":"2002-11-28 00:00:00","BFRQ":"0000-00-00 00:00:00","YXQZ":"2020-05-25 00:00:00","LJYXSJ":0,"LJSYCS":0,"CLBH":0}]}
   消防车辆类型
  url: localhost:1337/XFJGRetr/getXFCLX
  param: 目前没传参数
  response:
	{"code":200,"msg":"successfully","data":[{"DMZ":"21010000","DMMC":"消防车","CHILDREN":[{"DMZ":"21010100","DMMC":"灭火类消防车"},{"DMZ":"21010200","DMMC":"举高类消防车"},{"DMZ":"21010300","DMMC":"专勤类消防"},{"DMZ":"21010400","DMMC":"战勤保障消防车"},{"DMZ":"21010500","DMMC":"机场消防车（JX）"},{"DMZ":"21010600","DMMC":"防爆消防车"},{"DMZ":"21010700","DMMC":"轨道消防车（GD）"},{"DMZ":"21019900","DMMC":"其他类消防车"}]}]}
8 装备器材
    装备器材类别
	url: localhost:1337/XFJGRetr/getZBQCLB
        reponse: 
     {"code":200,"msg":"successfully","data":[{"DMZ":"10000000","DMMC":"消防人员防护装备"},{"DMZ":"20000000","DMMC":"消防车、船（艇）、飞行器"},{"DMZ":"30000000","DMMC":"灭火器材装备"},{"DMZ":"40000000","DMMC":"灭火药剂"},{"DMZ":"50000000","DMMC":"抢险救援器材"},{"DMZ":"60000000","DMMC":"消防通信指挥装备"},{"DMZ":"70000000","DMMC":"特种消防装备"},{"DMZ":"80000000","DMMC":"防火检查与火灾调查装备"},{"DMZ":"90000000","DMMC":"其他类消防装备器材"}]}
  
