var map= new BMap.Map("mapGps");   //创建地图实例
var lushu;
map.centerAndZoom("岳阳", 13);

map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());

map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
map.enableKeyboard();//启动键盘操作地图
 // 启用地图惯性拖拽
map.enableInertialDragging();

  // 展示普通街道、卫星和路网的混合视图
map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));

//保存所有接受到的gps数据
var GpsInfoAll =new Array();

//对该用户的每一段不同的gps轨迹 保存到数组中
var gpsSOfUser= new Array(
		{color:"#FF8080",start:"",end:"",markid:"",gps:new Array()},
		{color:"#80FF80",start:"",end:"",markid:"",gps:new Array()},
        {color:"#0080FF",start:"",end:"",markid:"",gps:new Array()},
		{color:"#FF80FF",start:"",end:"",markid:"",gps:new Array()},
        {color:"#800000",start:"",end:"",markid:"",gps:new Array()},
		{color:"#408080",start:"",end:"",markid:"",gps:new Array()},
        {color:"#800040",start:"",end:"",markid:"",gps:new Array()},
		{color:"#99668B",start:"",end:"",markid:"",gps:new Array()},
        {color:"#2FD08F",start:"",end:"",markid:"",gps:new Array()},
		{color:"#15720E",start:"",end:"",markid:"",gps:new Array()},
        {color:"#512c35",start:"",end:"",markid:"",gps:new Array()},
		{color:"#57057A",start:"",end:"",markid:"",gps:new Array()}
	);

/**
 *  显示历史轨迹,数据只有该markid的所有数据
 *	gpsOfMarkid
 */ 
function  showGpsBymarkid(gpsOfMarkid){
	var gps=gpsOfMarkid.gps;
	var len=gps.length-1;
	
	 //设置起点 和 终点
	var start=new BMap.Point(gps[0].lon,gps[0].lat);
	var end=new BMap.Point(gps[len].lon,gps[len].lat);
	
	var labelsta = new BMap.Label("起",{offset:new BMap.Size(0,0),position:start});
	var labelend = new BMap.Label("终",{offset:new BMap.Size(0,0),position:end});
	
	var polyline = new BMap.Polyline([
		new BMap.Point(0,0),
		new BMap.Point(0,0)
		],
		{strokeColor:gpsOfMarkid.color, strokeWeight:5, strokeOpacity:1}
	);
	
	var Pois=[];
	for(var i =0;i<gps.length;i++){
		Pois.push(new BMap.Point(gps[i].lon,gps[i].lat));
	}
	polyline.setPath(Pois);
	
	map.addOverlay(labelsta);
	map.addOverlay(labelend);
	map.addOverlay(polyline);
    
}



/**
 *  处理所有数据，并把数据给每个imie赋值
 */
function  dealGpsWithMarkid(){
	var  n=0;          //记录当前第几个用户
	var  markidTemp="";    //临时变量，记录imie	
	
	for(var i=0;i<GpsInfoAll.length;i++){
		if(GpsInfoAll[i].markid == markidTemp){
			gpsSOfUser[n].gps.push(GpsInfoAll[i]);
		}else{
			if(n>=12){
				break;
			}else{
				gpsSOfUser[n].markid=GpsInfoAll[i].markid;
				gpsSOfUser[n].gps.push(GpsInfoAll[i]);
				markidTemp=GpsInfoAll[i].markid;		
			}
			n++;
		}
	}
	for(var i=0;i<gpsSOfUser.length;i++){			
		if(gpsSOfUser[i].markid != ""  &&  gpsSOfUser[i].markid != null){				
			gpsSOfUser[i].start = gpsSOfUser[i].gps[0].eventtime;
			gpsSOfUser[i].end = gpsSOfUser[i].gps[gpsSOfUser[i].gps.length-1].eventtime;
			gpsSOfUser[i].username = gpsSOfUser[i].gps[0].username;
			$("#gpsList").datagrid("appendRow",gpsSOfUser[i]);
		}		
	}
}

$("#gpsList").datagrid({
	onClickRow:function(rowIndex,row){
		map.clearOverlays();	
		var rows = $("#gpsList").datagrid("getSelections");		
		
		if(rows.length > 0 ){	
		    map.centerAndZoom(new BMap.Point(rows[0].gps[0].lon, rows[0].gps[0].lat), 15);
		    try {
		        var Pois = [];
		        for (var i = 0; i < rows[0].gps.length; i++) {
		            Pois.push(new BMap.Point(rows[0].gps[i].lon, rows[0].gps[i].lat));
		        }
		        if (lushu != undefined)
		            lushu.stop();
		        lushu = new BMapLib.LuShu(map, Pois, {
		            defaultContent: "",//"从天安门到百度大厦"
		            autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
		            icon: new BMap.Icon('/images/car.png', new BMap.Size(52, 26), { anchor: new BMap.Size(27, 13) }),
		            speed: 450,
		            enableRotation: true,//是否设置marker随着道路的走向进行旋转
		            landmarkPois: [
		            ]
		        });
		        lushu.start();
		    }
		    catch (e)
		    { }
		}		
		
		for(var i=0;i<rows.length;i++){
			showGpsBymarkid(rows[i]);	
		}
	}

});

//清除数据
function clearData(){
	GpsInfoAll=[];
	map.clearOverlays();

	for(var i=0;i<gpsSOfUser.length;i++){
		gpsSOfUser[i].gps.length = 0 ;
		gpsSOfUser[i].markid = "";
		gpsSOfUser[i].start = "";
		gpsSOfUser[i].end = "";		
	}	
	
	var rows = $("#gpsList").datagrid("getData").rows;				
	
	for(var i = rows.length-1;i>=0;i--){
		var rowIndex = $("#gpsList").datagrid("getRowIndex",rows[i]);
		$("#gpsList").datagrid("deleteRow",rowIndex);
		
	}		
}

/**
 * 在服务器上gps数据
    参数，username，starttime ，endtime
 */
function getGpsInfoInServer(username,starttime,endtime){
		
	$("#select").linkbutton('disable');
	
	clearData();		
	$.ajax({
		type:"post",
		url:"/Gps/read",
		data:"startTime="+starttime+"&endTime="+endtime+"",
		success:function(msg){			
			console.log("startTime="+starttime+"&endTime="+endtime+"");
			if(msg.code == 200){
				$("#select").linkbutton('enable');
				var data=msg.data;			
				for(var i=0;i<data.length;i++){
					var gps=new gpsInfo(data[i]);
					GpsInfoAll.push(gps);
				}			
				if(data.length > 0){
					map.centerAndZoom(new BMap.Point(data[0].BaiduLon,data[0].BaiduLat),15);
				}
				dealGpsWithMarkid();
			}			
		}
	});
}

$("#select").click(function(){	
	var sdate=$("#sdate").datetimebox('getValue');
	var edate=$("#edate").datetimebox('getValue');
	var username = getCookie("userName");
	getGpsInfoInServer(username,sdate,edate);
})

$(function(){
	var date =  new Date();
	var dateStr = date.Format("yyyy-MM-dd");
	var start = dateStr+" "+"00:00:00";
	var end = dateStr +" "+"23:59:59";
	$('#sdate').datetimebox("setValue",start);
	$('#edate').datetimebox("setValue",end);
	toCheck('select', '/Gps/historyGps');
//	$("#select").click();
})


	/**
	 *  gpsInfo信息实体
	 *  markid  标志
	 *	username  用户名
	 *	imie   串号
	 *	lat   纬度
	 *	lon   经度
	 *	speed  速度
	 */
function gpsInfo(data){
	this.markid=data.BatchId;
	this.username=data.UserName;
	this.imie=data.DeviceNumber;
	this.lat=data.BaiduLat;
	this.lon=data.BaiduLon;
	this.speed=data.Speed;
	var date = toDate(data.EventTime);
	var dateStr = date.Format("yy/MM/dd HH:mm");
	this.eventtime=dateStr;
}

