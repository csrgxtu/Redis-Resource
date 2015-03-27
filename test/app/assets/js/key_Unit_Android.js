
var map= new BMap.Map("container");   //创建地图实例
var point =new BMap.Point(113.112833,29.377978);   //创建点坐标

var markers =[];    //重点单位标注
var units=new Array();    //重点单位得到的数据集合
var circles=[];      //圆 行覆盖物
var markersWater=[];    //水源标注

map.centerAndZoom(point,13);         //初始化地图，设置中心点坐标和地图级别

map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());

map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
map.enableKeyboard();//启动键盘操作地图
	// 启用地图惯性拖拽   
map.enableInertialDragging();

	// 展示普通街道、卫星和路网的混合视图   
map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));

/**
 *  地图拖动事件，拖动加载新的标注点
 */ 
map.addEventListener('dragend',function(){
	if(units.length>80){
		createNoName();
	}
});

/**
 *  按钮点击事件
 *
 */
$("#btnSelect").click(function(){	
    var value=$("#poiValue").val();
    getPoiInfo(value);
	
});

/**
 *  清空地图上的数据
 */
function clearMap(){
	map.clearOverlays();
	units=[];
	markers =[];
}

/**
 * 从服务器获取数据
 */
function getPoiInfo(name){

	clearMap();

	$.ajax({
		type:"post",
		url:"/XfKeyUnit/read",
		data:"entityName="+name+"&pageIndex=1&pageSize=1000",
		success:function(msg){	
		//	alert(msg);
			var data=msg.data.points;			
			for(var i=0;i<data.length;i++){
				var unit = new Key_Unit(data[i]);
				units.push(unit);
			}
			
			if(units.length>80){
				createNoName();
			}else{
				var unitLon=units[0].lon;
				var unitLat=units[0].lat;
				var pt=new BMap.Point(unitLon,unitLat);				
				map.centerAndZoom(pt,13); 
				createByName();
			}			
		},
		erro:function(erroMessage){
			console.log(erroMessage);
		}
	});
}

/**
 *
 *  通过数据库中得到的重点单位  在地图上创建 标注，
 *   并添加标注点击事件   数据大于80
 */
function  createNoName(){

	var Westlng=map.getBounds().getSouthWest().lng;     //当前左下角  经度
	var Westlat=map.getBounds().getSouthWest().lat;     //当前左上角  维度
	var Northlng=map.getBounds().getNorthEast().lng;    //当前右下角  经度
	var Northlat=map.getBounds().getNorthEast().lat;    //当前右上角  维度

		// 创建标注
	for(var i=0;i<units.length;i++){	
		var temp=true;				
		if((Westlng<units[i].lon) &&(units[i].lon<Northlng) &&(Westlat<units[i].lat) &&(units[i].lat<Northlat)){		
			for(var j=0;j<markers.length;j++){						
				if((units[i].lon == markers[j].getPosition().lng)  && (units[i].lat == markers[j].getPosition().lat)){													
					temp=false;
					break;
				}
			}
					
			if(temp){	
				var point=new BMap.Point(units[i].lon,units[i].lat);
				var myIcon = new BMap.Icon("/images/keyUnit/unit.png", new BMap.Size(31,45));
				var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
				markers.push(marker);
				map.addOverlay(marker);

				//创建点击事件
				(function(){
					var unit=units[i];
					marker.addEventListener('click', function(){
						var infoWindow = new BMap.InfoWindow(getWindow(unit).join(""),{width : 350,height: 280}); // 创建信息窗口对象			
						this.openInfoWindow(infoWindow);
					});
				})();
			}
		}
	}			
}


/**
 *  通过数据库中得到的重点单位  在地图上创建 标注，
 *   并添加标注点击事件   数据小于80 
 */
function createByName(){
	//alert("==================================================");
	for(var i=0;i<units.length;i++){
		var point=new BMap.Point(units[i].lon,units[i].lat);
		var myIcon = new BMap.Icon("/images/keyUnit/unit.png", new BMap.Size(31,45));
		var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
		markers.push(marker);
		
		map.addOverlay(marker);
		//创建标注点击事件
		(function(){
			var unit=units[i];
			marker.addEventListener('click', function(){
				var infoWindow = new BMap.InfoWindow(getWindow(unit).join(""),{width : 350,height: 280}); // 创建信息窗口对象			
				this.openInfoWindow(infoWindow);
			});
		})();
	}
}	
/**
 *  打开标准建筑层平面图
 */
function showPMT(imageUrl){		
	window.open (imageUrl, '重点单位标准层建筑平面图展示');
}

/**
 *  打开标准层疏散走道图
 */
function showZDT(zdtUrl){
	window.open (zdtUrl, '重点单位标准层疏散走道图展示');
}

/**
 * 下载消防预案
 */
function showXFYA(Unitid){
}

/**
 * 显示500M内的消防栓
 */
function showXFS(lon,lat,radius){
	 map.closeInfoWindow();

    for(var i=0;i<circles.length;i++){
       map.removeOverlay(circles[i]);
    }
    var point=new BMap.Point(lon,lat);
    map.centerAndZoom(point, 15);
    var circle = new BMap.Circle(point,radius);
    map.addOverlay(circle);
    circle.setStrokeColor("#EA5246");
    circle.setFillOpacity(0.2);
    circle.setStrokeWeight(1);

    circles.push(circle);

    $.ajax({
      type: 'POST',
      url: '/fireHydrant/searchByRadius',
      data:'radius='+radius+'&baiduLat='+lat+'&baiduLon='+lon+'&pageIndex=1&pageSize=100',
      success: function (msg) {
        console.log(msg.data.totalLength+"---水源数量");
        createWaterPoiInMap(lon,lat,msg.data.result);    //在地图上添加水源标注     
      }
    }); 
	
}

/**
 *在地图上添加水源标注 
 */
function createWaterPoiInMap(lon,lat,data){
    console.log(data);
    for(var i=0;i<markersWater.length;i++){
      map.removeOverlay(markersWater[i]);
    }

    for(var i =0;i<data.length;i++){
      var pt = new BMap.Point(data[i].BaiduLon, data[i].BaiduLat);
      var myIcon = new BMap.Icon("/files/XfKeyUnit/hydrant-icon.png", new BMap.Size(21,31));
      var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
      map.addOverlay(marker);

      //创建点击事件
      (function(){
        var poi=new WaterPoi(data[i]);
        var infoWin = new BMap.InfoWindow(waterInfo(poi,lon,lat,pt).join(""),{width : 180,height: 100});
        marker.addEventListener('click', function(){
            this.openInfoWindow(infoWin);
        });
     })();

    markersWater.push(marker);
  }
}

/**
 *   水源标注详细信息
 */	
function waterInfo(poi,lon,lat,point){
  var date =new Date(poi.createtime);
  var dateString =date.Format("yyyy-MM-dd HH:mm:ss");
  var html=[];
  html.push("<strong>水源详细信息: </strong>");
  html.push("<table >");
  html.push("   <tr><td style='text-align:right;'>地址:</td><td> "+poi.name+"</td></tr>");
  html.push("   <tr><td style='text-align:right;'>街道:</td><td> "+poi.address+"</td></tr>");
  html.push("   <tr><td style='text-align:right;'>状态:</td><td> "+poi.Status+"</td></tr>");
  html.push("</table>");
  return html;
}


/** 
 *  重点单位详细信息
 */
function getWindow(unit){
		var html = [];
		html.push('<strong>重点单位信息: </strong>');
		html.push('<table   style="padding:1px;border:0px;width:350px;height:215px;font-size:15px;" border="0">' );
		html.push('<tr >');
		html.push('		<td width="200" height="24%"><p id="name"><strong>名称：</strong>'+unit.name+'</p></td>');
		html.push('		<td rowspan="4"><img src="'+unit.image+'" style="height:150px;width:150px;" id="img"></td>');
		html.push('</tr>');
		html.push('<tr height="24%"  >');
		html.push('		<td><p id="address"><strong>地址：</strong>'+unit.address+'</p></td>');
		html.push('</tr>');		
		html.push('<tr height="22%" ><td><p id="phone"><strong>电话：</strong>'+unit.phone+'</p></td></tr>');
		html.push('</tr>');    
                html.push('<tr height="22%" ><td><p id="phone"><strong>联系人：</strong>'+unit.phone+'</p></td></tr>');
		html.push('<tr >');
		html.push('		<td colspan="2"  valign="top">');
		html.push('			<table height="60px" border="0"  width="340px"><tr height="30px"><td>');
		html.push('				<span  onclick=showPMT("'+unit.pmt+'")>标准层建筑平面图</span>');
		html.push('				</td><td><span onclick=showZDT("'+unit.zdt+'")>标准层疏散走道图</span></td></tr>');
		html.push('				<tr><td><span onclick=showXFYA("'+unit.id+'")>消防预案</span></td>');
		html.push('				<td height="30px"><span onclick=showXFS("'+unit.lon+'","'+unit.lat+'","100")>最近消防栓</span></td></tr>');
	 	html.push('      <tr><td height="30px"><span onclick=showXFS("'+unit.lon+'","'+unit.lat+'","300")>300米内附近消防栓</span>');
		html.push('       <td height="30px"><span onclick=showXFS("'+unit.lon+'","'+unit.lat+'","500")>500米内附近消防栓</span>');
		html.push('			</td></tr></table>');
		html.push('		</td></tr>');		
		html.push('</tr></table> ');
		return html;
}


  /**
   *    实体 。。重点单位
   */
function Key_Unit(data){
		//	console.log(data);
	this.id=data.XfKeyUnitId;
    this.name=data.EntityName;
    this.address=data.Address;
	this.lat=data.BaiduLat;
	this.lon=data.BaiduLon;
    this.person = data.ContactPerson;
    this.phone=data.ContactNumber;
    this.pmt=data.BzcpmtUrl;
    this.zdt=data.ZpmtUrl;
    this.xfya=data.YAUrl;
	this.image=data.ZmzpUrl;
}

  /**
   *显示 标注 对象
   */
  function WaterPoi(data){
    this.id=data.FireHydrantId;
    this.name=data.Name;
    this.lat=data.BaiduLat;
    this.lon=data.BaiduLon;
    this.address=data.Address;
    this.createtime=data.CreatedTime;
    this.Status=data.Status;
  }


//初始化数组中的值
$(function(){
	getPoiInfo("");
});



 //时间格式化
  Date.prototype.Format = function(fmt)
    { //author: meizz   
      var o = {
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "HH+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}



