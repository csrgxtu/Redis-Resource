var map= new BMap.Map("mapBox");   //创建地图实例
var mkrTool = new BMapLib.MarkerTool(map, {autoClose: true,followText:"添加重点单位标注"});
map.centerAndZoom("岳阳", 13);
var pagesize=20;                         //重点单位信息列表每页显示个数
var markers =[];                         //当前地图上显示的重点单位标注
var markersWater = new Array();          //当前获取的水源标注
var circles=[];                          //当前界面显示的  圆
var units;                               //存放当前获取的所有重点单位

	
var imagePath = "";                        //存放当前大门图片
var pmtPath_bzc = "";                      //存放当前标准层平面图  
var pmtPath_z = "";                        //存放当前总平面图  
var xfyaPath = "";                         //存放当前消防预案  	
var bstOnePath = "";                       //当前一阶力量部署图
var bstTwoPath = "";                       //当前二阶力量部署图

var tempImage = true;                      //判断是否上传结束
var tempPmt = true;                        //判断是否上传结束
var tempZpmt = true;                        //判断是否上传结束
var tempXfya = true;                       //判断是否上传结束
var tempBstOne = true;                   //判断上传是否结束
var tempBstTwo = true;                   //判断上传是否结束   
       
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());

map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
map.enableKeyboard();//启动键盘操作地图
// 启用地图惯性拖拽   
map.enableInertialDragging();

// 展示普通街道、卫星和路网的混合视图   
map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));

//标注工具事件
$("#createKeyUnit").click(function(){
	var iconIndex = 0;
	markerPoi(map,iconIndex,mkrTool);
	$(document).bind("keydown", "esc", function (ev) { 
		mkrTool.close(); 
	});
	$(document).bind("mousedown",function(e){
		if(3==e.which){
			//单击鼠标右键
			mkrTool.close(); 
		}
	});
});

/**
 * 用MarkerTool标注
 */
function markerPoi(map,iconIndex,mkrTool) {
	var insertWin = new BMap.InfoWindow(inserWindow().join(""),{width : 300,height: 480}); // 创建新增重点单位对象
	var curMkr = null; // 记录当前添加的Mkr
	mkrTool.addEventListener("markend", function(evt){ 
		var mkr = evt.marker;			
		mkr.openInfoWindow(insertWin);
		setDataByMarker(map,mkr);
		curMkr = mkr;
	});
			
	mkrTool.open(); //打开工具
	var icon = BMapLib.MarkerTool.SYS_ICONS[iconIndex]; //设置工具样式，0-23
	mkrTool.setIcon(icon);
}
	
//搜索标注
$("#searchPoiByAddress").click(function(){
	var para=$("#poiScIpt").val();
	getPoiInfo(para,1,pagesize);
});

//编辑标注
$("#updateKeyUnit").click(function(){
	var row = $("#keyUnitTable").datagrid("getSelected");
	var rowIndex = $("#keyUnitTable").datagrid("getRowIndex",row);
	$("#unitid").val(row.id);
	$("#unitName").val(row.name);
	$("#unitAddress").val(row.address);
	$("#unitLat").val(row.baiduLat);
	$("#unitLon").val(row.baiduLon);
	$("#unitPhone").val(row.contactNumber);
	$("#unitPerson").val(row.contactPerson);
	$("#unitImage").attr("src",row.zmzp);
	$("#unitPmt").attr("src",row.bzcpmt);
	$("#unitZdt").attr("src",row.zpmt);
	$("#unitXfya").attr("src",row.ya);
	$("#bstOne").attr("src",row.bstOne);
	$("#bstTwo").attr("src",row.bstTwo);
	$("#btn_Image").hide();
	$("#btn_Pmt").hide();
	$("#btn_Zdt").hide();
	$("#btn_Xfya").hide();
	$("#btn_bstOne").hide();
	$("#btn_bstTwo").hide();

	$("#unitXfyaA").attr("href","/XfKeyUnit/downloadYa?xfKeyUnitId="+row.id+"");

	imagePath = row.zmzp;
	pmtPath_bzc = row.bzcpmt;
	pmtPath_z = row.zpmt;
	xfyaPath = row.ya;
	bstOnePath = row.bstOne;
	bstTwoPath = row.bstTwo;
	
	open5("updateDiv",650,320,"修改重点单位信息");
});

$("#deleteKeyUnit").click(function(){
	var row = $("#keyUnitTable").datagrid("getSelected");
	var rowIndex = $("#keyUnitTable").datagrid("getRowIndex",row);
	Dialog.confirm('您确认要删除重点单位<font color="red"> '+row.name+' </font>吗?',
    function(){
		$.ajax({
			type: "POST",
     	 	url: "/XfKeyUnit/delete",
			data: "xfKeyUnitId="+row.id+"",
			success: function(msg){
				if(msg.code == 200){
					$("#keyUnitTable").datagrid("deleteRow",rowIndex);
				}else{
					console.log(msg);
					openAlert("删除失败！",300,100);
				}
			}
		});
	});
});

function btnClick(){
	if(event.keyCode == 13){
		$("#searchPoiByAddress").click();
	}
}

//提交搜索重点单位
function getPoiInfo(name,pageIndex,pageSize){
	$.ajax({
		type: "POST",
		url: "/XfKeyUnit/read",
		data: "entityName="+name+"&pageIndex="+pageIndex+"&pageSize="+pageSize+"",
		success: function(msg){
			if(msg.code == 200){
				var us=[];
				for(var i=0;i<msg.data.points.length;i++){
					var unit = new Key_Unit(msg.data.points[i]);
					us.push(unit);
				}
				showKeyUnitList(us,msg.data.total,pageIndex,pageSize,name);
			}else{
				console.log(msg);
				openAlert("获取服务器数据失败!",300,100);
			}
		}
	});
}	

//提交搜索附近水源
function  getWaterPoi(lat,lon,radius){
	console.log(lat+lon+radius);
	$.ajax({
		type: 'POST',
		url: '/fireHydrant/searchByRadius',
		data:'radius='+radius+'&baiduLat='+lat+'&baiduLon='+lon+'&pageIndex=1&pageSize=100',
		success: function (msg) {
			console.log(msg);
			if(msg.code == 200){
				var fs = [];
				for(var i=0;i<msg.data.result.length;i++){
					var water = new Water(msg.data.result[i]);
					fs.push(water);
				}
				createWaterPoiInMap(fs);    //在地图上添加水源标注		
			}else{
				console.log(msg);
				openAlert("获取服务器数据失败!",300,100);
			}			
		}
	});
}

// 提交修改
function submitToUpdate(){
	var unitid=$("#unitid").val();
	var name=$("#unitName").val();
	var phone=$("#unitPhone").val();
	var person= $("#unitPerson").val();
	var user=getCookie("userName");

	if(tempImage && tempPmt && tempZpmt && tempXfya && tempBstOne && tempBstTwo){
		$.ajax({
			type:"post",
			url:"/XfKeyUnit/update",
			data:"entityName="+name+"&contactNumber="+phone+"&contactPerson="+person+"&overViewUrl="+imagePath+"&pmtUrl="+pmtPath_bzc+"&zpmtUrl="+pmtPath_z+"&yaUrl="+xfyaPath+"&xfKeyUnitId="+unitid+"&updatedBy="+user+"&bstOneUrl="+bstOnePath+"&bstTwoUrl="+bstTwoPath+"",
			success:function(msg){
				if(msg.code == 200){
					openAlert("提交修改成功!",300,100);
					setTimeout("location.reload()",2000);
				}else{
					console.log(msg);
					openAlert("修改失败！",300,100);
				}
			}
		});
	}
}

//提交新增阻断
function submitToInsert(){
	var name=$("#entityName").val();
	var address = $("#address").val();
	if( name == ""){
		openAlert("请输入单位名称!",300,100);
		return false;
	}
	if( address == ""){
		openAlert("请输入单位地址",300,100);
	}
}	

/**
* 初始化新增标注的值
*/
function setDataByMarker(map,mkr){
	var lat=mkr.getPosition().lat;    //当前维度
	var lng=mkr.getPosition().lng;   //当前经度
	var username=getCookie('userName');
	$("#createdBy").val(username);
	$("#lat").val(lat);
	$("#lng").val(lng);
	geoParse(lat,lng);
}

/**
  解析位置
  在百度云中根据经纬度获得地址name
*/
function  geoParse(lat,lon){
	var g=new BMap.Geocoder();
	var point=new BMap.Point(lon,lat);
	g.getLocation(point,function(msg){
  	$("#address").val(msg.address);
		$("#city").val(msg.addressComponents.city);
  });
}


	/**
	 *  水源标注信息窗口
	 */
	function getWindow(po){
		var html = [];
		
		html.push('<div style="overflow:auto;height:240px;width:335px;">');
		html.push('<strong>重点单位信息: </strong>');
		html.push('<table border="0"  style="padding:1px;border:0px;width:310px;height:200px;font-size:15px;" border="0">  ');
		html.push('<tr height="150px"><td>');
		html.push(' 	<table border="0" height="150" width="160">');
		html.push('			<tr><td width="45px"><strong>名&nbsp;&nbsp;&nbsp;称:</strong></td><td><span id="name">'+po.name+'</span></td></tr>');
		html.push('     <tr><td><strong>地&nbsp;&nbsp;&nbsp;址:</strong></td><td><span id="address">'+po.address+'</span></td></tr>');
		html.push('     <tr><td><strong>电&nbsp;&nbsp;&nbsp;话:</strong></td><td><span id="phone">'+po.contactNumber+'</span></td></tr>');
		html.push('     <tr><td><strong>联系人:</strong></td><td><span id="person">'+po.contactPerson+'</span></td></tr>');
		html.push('		</table>');
		html.push('</td><td width="150px">');
		html.push('		<table><tr><td><img src="'+po.zmzp+'" id="img" style="height:150px;width:150px;"></td></tr></table>');
		html.push('</td></tr>');
		html.push('<tr><td colspan="2" style="height:50px;">');
		html.push('		<table  border="0"  width="98%">');
		html.push('   	<tr height="20px;" align="center">');
		html.push('				<td><a href="javascript:void(0)" onclick=showXFS("'+po.baiduLat+'","'+po.baiduLon+'","100")>100米内附近消防栓</a></td>');
		html.push('       <td><a href="javascript:void(0)" onclick=showXFS("'+po.baiduLat+'","'+po.baiduLon+'","300")>300米内附近消防栓</a></td>');
		html.push('     </tr><tr height="20px;" align="center">');
		html.push('				<td><a href="javascript:void(0)" onclick=showXFS("'+po.baiduLat+'","'+po.baiduLon+'","500")>500米内附近消防栓</a></td>');
		html.push('       <td><a target="_blank" href="'+po.ya+'")>消防预案查看</a></td>');
		html.push('			</tr></table>');
		html.push('</td></tr>');
		html.push('</table>');
		html.push('</div>');
		return html;
	}

	//新增重点单位信息窗口
	function inserWindow(){
		var html = [];
		html.push('<div style="overflow:auto;height:470;width:310px;">');
		html.push("<strong>添加重点单位信息: </strong>");	
		html.push('<form action="/XfKeyUnit/create" method="post" enctype="multipart/form-data">');
		html.push("<table border='0' width='300px'");
		html.push('  <tr>'); 
		html.push('      <td align="right" width="80px">单位名称：</td>');
		html.push('      <td ><input type="text" maxLength="10" style="height:30px;width:180px;"  name="entityName" id="entityName"  height="29" class="textbox"></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">单位地址：</td>');
		html.push('      <td ><input type="text" style="height:30px;width:180px;" name="address" height="29" class="textbox" id="address">');
		html.push('						<input type="hidden" name="city" id="city"></td>');
		html.push('  </tr>');
		html.push('  <tr>');
		html.push('      <td align="right">联 系 人：</td>');
		html.push('      <td ><input type="text" style="height:30px;width:180px;" name="contactPerson" height="29" class="textbox"></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">单位电话：</td>');
		html.push('      <td ><input type="text" style="height:30px;width:180px;" name="contactNumber" height="29" class="textbox"></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">单位经度：</td>');
		html.push('      <td ><input type="text" style="height:30px;width:180px;" id="lng" height="29" class="textbox" name="baiduLon"></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">单位维度：</td>');
		html.push('      <td ><input type="text" style="height:30px;width:180px;" id="lat" height="29" class="textbox" name="baiduLat"></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">正 门 图：</td>');
		html.push('      <td style="padding-left:3px;"><input type="file" name="zmzp" style="width:180px;" >');
		html.push('			 		<input type="hidden" name="createdBy" id="createdBy"></td>');
		html.push('  </tr>');	
		html.push('  <tr>'); 
		html.push('      <td align="right">总平面图：</td>');
		html.push('      <td style="padding-left:3px;"><input type="file" name="zpmt" style="width:185px;" ></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">标准层平面图：</td>');
		html.push('      <td style="padding-left:3px;"><input type="file" name="bzcpmt" style="width:185px;" ></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">一阶段部署图：</td>');
		html.push('      <td style="padding-left:3px;"><input type="file" name="bstOne" style="width:185px;" ></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">二阶段部署图：</td>');
		html.push('      <td style="padding-left:3px;"><input type="file" name="bstTwo" style="width:185px;" ></td>');
		html.push('  </tr>');
		html.push('  <tr>'); 
		html.push('      <td align="right">消防预案：</td>');
		html.push('      <td style="padding-left:3px;"><input type="file" name="ya" style="width:185px;" ></td>');
		html.push('  </tr>');
		html.push('	 <tr height="40px">');
		html.push('			<td colspan="2" align="center">');
		html.push('				<input type="submit" value="新增" style="height:25px;width:60px;" onclick="return submitToInsert()"> ');
		html.push('				<input type="button" value="取消" style="height:25px;width:60px;" onclick="map.closeInfoWindow()"');
		html.push('   	</td>');
		html.push('	 </tr>');
		html.push('</table>');
		html.push('</form>');

		return html;	
	}

function showWaterPoi(water){
	var html=[];
	var dis = parseInt(water.distance*1609);
	html.push("<div style='width:230px;height:140px;overflow:auto;'>");
	html.push("<strong>水源详细信息: </strong>");
	html.push("<table border='0' width='230px'>");
	html.push("	  <tr><td width='40px'>街道:</td>");
	html.push("		<td><input class='textbox' style='heigh:25px;width:180px;' value='"+water.name+"' disabled></td></tr>");
	html.push("	  <tr><td >地址:</td>");
	html.push("		<td><input class='textbox' style='height:25px;width:180px;' value='"+water.address+"' disabled></td></tr>");
	html.push("   <tr><td >状态:</td>");
	html.push("		<td><input class='textbox' style='height:25px;width:180px;' value='"+water.status+"' disabled></td></tr>");
	html.push("   <tr><td >距离:</td>");
	html.push("		<td><input class='textbox' style='height:25px;width:180px;' value='约&nbsp;"+dis+"&nbsp;米' disabled></td></tr>");
	html.push("</table>");
	html.push("</div>");
	return html;
}

function showKeyUnitList(keyUnits,total,pageIndex,pageSize,parameter1){		
	
	$("#keyUnitTable").datagrid('loadData', keyUnits);
	
	//配置分页样式
	var p = $('#keyUnitTable').datagrid('getPager');  
	$(p).pagination({  
		pageSize: pageSize, 
		pageNumber:pageIndex,
		total:total,			
		pageList: [20,40,60], 		
		beforePageText: '第',
		afterPageText: '页 共{pages}页',  
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		onSelectPage:function(pageNumber,pageSize){
			getPoiInfo(parameter1,pageNumber,pageSize);
		},
		onRefresh:function(pageNumber,pageSize){
			getPoiInfo(parameter1,pageNumber,pageSize);			
		}
	});
	
	createPoiInMap(keyUnits);	
	$('#keyUnitTable').datagrid('selectRow', 0);
}

//单击行事件
$('#keyUnitTable').datagrid({
	onSelect:function(rowIndex,row){
		for(var i=0; i<markers.length;i++){
			if((markers[i].getPosition().lat == row.baiduLat ) &&(markers[i].getPosition().lng == row.baiduLon)){	
				var infoWin = new BMap.InfoWindow(getWindow(row).join(""),{width : 310,height: 230}); // 创建新增重点单位对象
				markers[i].openInfoWindow(infoWin);
				break;
			}
		}
	}
});

function createPoiInMap(keyUnits){
		map.clearOverlays();
		markers = [];

    for(var i =0;i<keyUnits.length;i++){
		var pt = new BMap.Point(keyUnits[i].baiduLon, keyUnits[i].baiduLat);         
		var myIcon = new BMap.Icon("/files/xfjwt/unit.png", new BMap.Size(30,30));
		var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
		map.addOverlay(marker);
		//创建点击事件
		(function(){
			var keyU = keyUnits[i];
			var infoWin = new BMap.InfoWindow(getWindow(keyU).join(""),{width : 310,height: 230}); // 创建新增重点单位对象
			marker.addEventListener('click', function(){
				var rows = $("#keyUnitTable").datagrid("getData").rows;				
				for(var i=0;i<rows.length;i++){
					if(keyU.id == rows[i].id){
						$("#keyUnitTable").datagrid("selectRow",i);
						break;
					}
				}
		  		this.openInfoWindow(infoWin);
			});
		})();
		markers.push(marker);
	}
}
	
function createWaterPoiInMap(waters){
	for(var i=0;i<markersWater.length;i++){
		map.removeOverlay(markersWater[i]);		
	}
		
	for(var i =0;i<waters.length;i++){
		var pt = new BMap.Point(waters[i].lon, waters[i].lat);
		var myIcon = new BMap.Icon("/files/xfjwt/hydrant-icon.png", new BMap.Size(21,31));
		var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
		map.addOverlay(marker);
	
		//创建点击事件
		(function(){
			var infoWin = new BMap.InfoWindow(showWaterPoi(waters[i]).join(""), {offset: new BMap.Size(0,0)});
			marker.addEventListener('click', function(){
				this.openInfoWindow(infoWin);
			});
		})();
		
		markersWater.push(marker);
	}
} 

  /**
   * 实体 。。重点单位
   */ 
function Key_Unit(dataOfServer){
	this.id = dataOfServer.XfKeyUnitId;
	this.city = dataOfServer.City;
    this.name = dataOfServer.EntityName;
    this.address = dataOfServer.Address;
	this.googleLat = dataOfServer.GoogleLat;
	this.googleLon = dataOfServer.GoogleLon;
    this.baiduLat = dataOfServer.BaiduLat;
    this.baiduLon = dataOfServer.BaiduLon;
    this.bzcpmt = dataOfServer.BzcpmtUrl;
    this.zmzp = dataOfServer.ZmzpUrl;
	this.zpmt = dataOfServer.ZpmtUrl;
	this.bstOne = dataOfServer.BstOne;
	this.bstTwo = dataOfServer.BstTwo;
	this.ya = dataOfServer.YAUrl;
	this.contactPerson = dataOfServer.ContactPerson;
	if(dataOfServer.ContactPerson == null){
		this.contactPerson = "";
	}
	this.contactNumber = dataOfServer.ContactNumber;
	if(dataOfServer.ContactNumber == null){
		this.contactNumber = "";
	}
	
	this.createdBy = dataOfServer.CreatedBy;
	if(dataOfServer.CreatedBy == null){
		this.createdBy = "";
	}
	
	this.createdTime = escape(dataOfServer.CreatedTime);
	if(dataOfServer.CreatedTime == null){
		this.createdTime = "";
	}
	this.updatedBy = dataOfServer.UpdatedBy;
	if(dataOfServer.UpdatedBy == null){
		this.updatedBy = "";
	}
	this.updatedTime = escape(dataOfServer.UpdatedTime);
	if(dataOfServer.UpdatedTime == null){
		this.updatedTime = "";
	}
}

/**
 *  水源 实体
 *  id  name  lat  lon  address  status  distance
 */
 function Water(data){
	this.id = data.FireHydrantId;
	this.name = data.Name;
	this.lat = data.BaiduLat;
	this.lon = data.BaiduLon;
	this.address = data.Address;
	if(data.Address = null){
		this.address = "";
	}
	this.status = data.Status;
	if(data.Status == null){
		this.status = "";
	}
	this.distance = data.distance;
 }

/**
 * 显示 标注 对象
 */
function Poi(id,name,lat,lon,address,createtime,tel){
	this.id=id;
	this.name=name;
    this.lat=lat;
    this.lon=lon;
    this.address=address;
    this.createtime=createtime;
    this.tel=tel;
}

function openImage(url){
	openDeployImg("",url);
	
}

$("#unitImageA").click(function(){
	var url = $("#unitImage").attr("src");
	openDeployImg('重点单位大门图显示',url);
});

$("#unitPmtA").click(function(){
	var url = $("#unitPmt").attr("src");
	openDeployImg('标准层平面图',url);
});
	
$("#unitZdtA").click(function(){
	var url = $("#unitZdt").attr("src");
	openDeployImg('总平面图',url);
});

$("#bstOneA").click(function(){
	var url = $("#bstOne").attr("src");
	openDeployImg('一阶段力量部署图',url);
});

$("#bstTwoA").click(function(){
	var url = $("#bstTwo").attr("src");
	openDeployImg('二阶段力量部署图',url);
});

$(function(){
	//重点单位 大门
	var file_image = document.getElementById('unitImage_file'),
	uploadUrl = '/XfKeyUnit/saveZmzp',
	upload_image = document.getElementById('btn_Image'),
	jsUpload = new JsUpload({name:'__jsupload__',file:file_image,uploadUrl:uploadUrl});

	JsUpload.bind(upload_image,'click',function(event){
		tempImage=false;
		jsUpload.upload(this,file_image,function(cur,args1,args2){
			switch(cur){				
				
				case 'fail':
				case 'load':
				case 'error':
				case 'abort':
					tempImage=true;
					$("#unitImage").attr("src",args1);
					imagePath=args1;		
					break;
				default:
					break;
			}
		});
	});

	//平面图提交
  var file_pmt = document.getElementById('unitPmt_file'),
  uploadUrl = '/XfKeyUnit/saveBzcpmt',
  upload_pmt = document.getElementById('btn_Pmt'),
  jsUpload = new JsUpload({name:'__jsupload__',file:file_pmt,uploadUrl:uploadUrl});
  JsUpload.bind(upload_pmt,'click',function(event){
		tempPmt = false;
    jsUpload.upload(this,file_pmt,function(cur,args1,args2){
      switch(cur){

        case 'fail':
        case 'load':
        case 'error':
        case 'abort':
          tempPmt=true;
          $("#unitPmt").attr("src",args1);
          pmtPath_bzc = args1;
          break;
        default:
          break;
      }
    });
  });

	//总平面图
  var file_zdt = document.getElementById('unitZdt_file'),
  uploadUrl = '/XfKeyUnit/saveZpmt',
  upload_zdt = document.getElementById('btn_Zdt'),
  jsUpload = new JsUpload({name:'__jsupload__',file:file_zdt,uploadUrl:uploadUrl});
  JsUpload.bind(upload_zdt,'click',function(event){
		tempZpmt = false;
    jsUpload.upload(this,file_zdt,function(cur,args1,args2){
      switch(cur){

        case 'fail':
        case 'load':
        case 'error':
        case 'abort':
          tempZpmt = true;
          $("#unitZdt").attr("src",args1);
          pmtPath_z = args1;
          break;
        default:
          break;
      }
    });
  });

    //消防预案提交
  var file_xfya = document.getElementById('unitXfya_file'),
  uploadUrl = '/XfKeyUnit/saveYA',
  upload_xfya = document.getElementById('btn_Xfya'),
  jsUpload = new JsUpload({name:'__jsupload__',file:file_xfya,uploadUrl:uploadUrl});
  JsUpload.bind(upload_xfya,'click',function(event){
		tempXfya=false;
    jsUpload.upload(this,file_xfya,function(cur,args1,args2){
      switch(cur){

        case 'fail':
        case 'load':
        case 'error':
        case 'abort':
          tempXfya=true;
          $("#unitXfya").attr("src",args1);
          xfyaPath=args1;
          break;
        default:
          break;
      }
    });
  });
  
	//一阶力量部署图
	var file_bsto = document.getElementById('bstOne_file'),
	uploadUrl = '/XfKeyUnit/saveBstOne',
	upload_bsto = document.getElementById('btn_bstOne'),
	jsUpload = new JsUpload({name:'__jsupload__',file:file_bsto,uploadUrl:uploadUrl});
	JsUpload.bind(upload_bsto,'click',function(event){
		tempBstOne = false;
		jsUpload.upload(this,file_bsto,function(cur,args1,args2){
			switch(cur){
				case 'fail':
				case 'load':
				case 'error':
				case 'abort':
				tempBstOne = true;
				$("#bstOne").attr("src",args1);
				bstOnePath = args1;
				break;
			default:
				break;
			}
		});
	});
  
	//二阶力量部署图
	var file_bstt = document.getElementById('bstTwo_file'),
	uploadUrl = '/XfKeyUnit/saveBstTwo',
	upload_bstt = document.getElementById('btn_bstTwo'),
	jsUpload = new JsUpload({name:'__jsupload__',file:file_bstt,uploadUrl:uploadUrl});
	JsUpload.bind(upload_bstt,'click',function(event){
		tempBstTwo = false;
		jsUpload.upload(this,file_bstt,function(cur,args1,args2){
			switch(cur){
				case 'fail':
				case 'load':
				case 'error':
				case 'abort':
				tempBstTwo = true;
				$("#bstTwo").attr("src",args1);
				bstTwoPath = args1;
				break;
			default:
				break;
			}
		});
	});
});

	// radius米内的水源
function showXFS(lat,lon,radius){ 
	map.closeInfoWindow();

	for(var i=0;i<circles.length;i++){	
		map.removeOverlay(circles[i]);
	}
	
	var point=new BMap.Point(lon,lat);
	map.centerAndZoom(point, 14);
  var circle = new BMap.Circle(point,radius);
	map.addOverlay(circle);
	circle.setStrokeColor("#E6423B");
	circle.setFillOpacity(0.2);
	circle.setStrokeWeight(1);

	circles.push(circle);
			
	getWaterPoi(lat,lon,radius);		
}


//初始化地图
getPoiInfo("",1,pagesize);
