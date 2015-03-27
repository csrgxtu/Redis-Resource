var markers=new Array();

var map = new BMap.Map("container");
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

var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "addressInputSearch"
    ,"location" : "岳阳市"
});


var contextMenu = new BMap.ContextMenu();
var txtMenuItem = [  
  {
   text:'标记接警位置',
   callback:function(p){
    var marker = new BMap.Marker(p), px = map.pointToPixel(p);
    map.addOverlay(marker);
	var lat = p.lat;
	var lon = p.lng;
	var infoWindow = new BMap.InfoWindow(inserWindow(lat,lon,"").join(""),{width : 280,height: 380}); 
	marker.openInfoWindow(infoWindow);
	getLocation(lat,lon);
   }
  }
 ];

 for(var i=0; i < txtMenuItem.length; i++){
  contextMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));  
 }
 map.addContextMenu(contextMenu);

 
 //单击行事件
$('#addressTable').datagrid({
	onSelect:function(rowIndex,row){
		for(var i=0; i<markers.length;i++){
			if((markers[i].getPosition().lat == row.lat ) &&(markers[i].getPosition().lng == row.lon)){	
				var infoWindow = new BMap.InfoWindow(inserWindow(row.lat,row.lon,row.title).join(""),{width : 280,height: 380}); 
				markers[i].openInfoWindow(infoWindow);
				getLocation(row.lat,row.lon);							
			}
		}
	}
});
 
 
//根据地址找经纬度并标注
function searchByStationName() {
	if($("#addressInputSearch").val()!=""){				
		var keyword = $("#addressInputSearch").val();
		var options = {
			onSearchComplete: function(results){				
				if (local.getStatus() == BMAP_STATUS_SUCCESS){
					markers=[];
					map.clearOverlays();//清空原来的标注
					
					var rsAll = [];
					var code = 65;					
					for(var i =0 ;i<results.getCurrentNumPois();i++){
						var rs = results.getPoi(i);
						var resAddress = new resultOfAddress(String.fromCharCode(code),rs.title,rs.point);
						rsAll.push(resAddress);
						code ++;
					}
					
					//在地图上创建标注
					createPoiInMap(rsAll);
					
					$("#addressTable").datagrid("loadData",rsAll);	
					$("#addressTable").datagrid("selectRow",0);		
					
				}else{
					openAlert("地址不存在",300,100);
				}
			}
		};
		var local = new BMap.LocalSearch(map, options);
		local.search(keyword);       
    }else{
		openAlert("查询内容为空",300,100);
	}	
}

//保存信息        
function saveMsg(){
    var selEndTime=$("#officeTime").val();
    //======================
    var zaiQingName = document.getElementById("zaiQingName").value;
    var phoneNumber=document.getElementById("teleno").value.replace(/(^\s*)|(\s*$)/g, "");
    var discription=document.getElementById("discription").value;                
    var keyUnitName=document.getElementById("unitName").value.replace(/(^\s*)|(\s*$)/g, "");
    var address=document.getElementById("unitAddress").value.replace(/(^\s*)|(\s*$)/g, "");
    var baiduLat=document.getElementById("result_lat").value;
    var baiduLon=document.getElementById("result_lng").value;
    var BJR=document.getElementById("officeMan").value.replace(/(^\s*)|(\s*$)/g, "");

    //=======================
    var endHour=jQuery("#endHour  option:selected").val();
    var endMinute=jQuery("#endMinute  option:selected").val();
    var endSecond=jQuery("#endSecond  option:selected").val();
    var endTimeStr=selEndTime+" "+endHour+":"+endMinute+":"+endSecond;
    var officeTime=endTimeStr;
    
    var createUser = getCookie("DisplayName");
	if(zaiQingName==''){
		openAlert("灾情简述不能为空",300,100);
		return false;
	}
	if(BJR==''){
		openAlert("报警人不能为空",300,100);
		return false;
	}
	if(phoneNumber==''){
		openAlert("联系电话不能为空",300,100);
		return false;
	}
	if(keyUnitName==''){
		openAlert("火灾单位名称不能为空",300,100);
		return false;
	}
	if(address == ""){
		openAlert("地址不能为空",300,100);
	}									
	$("#saveBtn").attr("disabled",true);
    $.ajax({
        type: "post",
        url: "/ZaiQing/save",
        data: "zaiQingName="+zaiQingName+"&sendTime="+officeTime+"&BJR="+BJR+"&phoneNumber="+phoneNumber+"&keyUnitName="+keyUnitName+"&address="+address+"&baiduLat="+baiduLat+"&baiduLon="+baiduLon+"&description= "+discription,
        success: function(msg){
			$("#saveBtn").attr("disabled",false);
			if(msg.code=='200'){
				openAlert("保存成功",300,100);
				map.closeInfoWindow();
			}else{
				openAlert("保存失败",300,100);
			}
        }
    });
}


function createPoiInMap(rsAll){
	for(var i =0;i<rsAll.length;i++){
		var pt = new BMap.Point(rsAll[i].lon, rsAll[i].lat);		
		var marker = new BMap.Marker(pt);  // 创建标注
		map.addOverlay(marker);
	
		//创建点击事件
		(function(){
			var lat = rsAll[i].lat;
			var lon = rsAll[i].lon;
			var title = rsAll[i].title;
			var infoWin = new BMap.InfoWindow(inserWindow(lat,lon,title).join(""), {width : 280,height: 380});
			marker.addEventListener('click', function(){
				this.openInfoWindow(infoWin);
				getLocation(lat,lon);				
			});
		})();
		
		markers.push(marker);
	}
}
             
 //设计弹出层内容
function inserWindow(lat,lon,title){
	var createUser = getCookie("DisplayName");
	var myDate = new Date();
	var month=myDate.getMonth()+1;
	var date=myDate.getDate();
	if(month<10){
		month="0"+month;
	}
	if(date<10){
		date="0"+date;
	}
	var dateTime = new Date();
	var dateTimeStr = dateTime.Format("yyyy-MM-dd HH:mm:ss");
				
    var html = [];
	html.push("<div style='overflow:auto;width:300px;height:380px;'>");
    html.push("<strong>灾情信息录入: </strong>");
    html.push('<table border="0">');
    html.push('<tr height="32px">');	
	html.push('		<td align="right">灾情简述:</td>');
	html.push('		<td ><input maxLength="20" onfocus class="textbox" style="height:28px;width:200px;" id="zaiQingName" /></td>');
	html.push('</tr>');
	html.push('<tr height="32px">');	
	html.push('		<td align="right">时  间:</td>');
	html.push('		<td><input class="textbox" value="'+dateTimeStr+'" style="height:28px;width:200px;" id="jjDateInput" disabled /></td>');
	html.push('</tr>');
	html.push('<tr height="32px">');
    html.push('      <td align="right">报 警 人:</td>');
    html.push('      <td ><input maxLength="10" onfocus class="textbox" value = ""style="height:28px;width:200px;" id="officeMan" ></td>');
    html.push('</tr>');
    html.push('<tr heigh="32px">');
    html.push('      <td align="right">联系电话:</td>');
    html.push('      <td ><input maxLength="11" class="textbox" onkeyup="stopWord()" style="height:28px;width:200px;" id="teleno" ></td>');
    html.push('</tr>');
    html.push('<tr height="32px">');
    html.push('      <td align="right">简要说明:</td>');
    html.push('      <td ><input maxLength="40" class="textbox" style="height:28px;width:200px;" id="discription"/></td>');
    html.push('</tr>');
    html.push('<tr height="32px">');
    html.push('      <td align="right">灾情单位:</td>');
    html.push('      <td ><input maxLength="20" class="textbox" style="height:28px;width:200px;"  value="'+title+'" id="unitName"></td>');
    html.push('</tr>');
    html.push('<tr height="32px">');
    html.push('      <td align="right">灾情地址:</td>');
    html.push('      <td ><input maxLength="20" class="textbox" style="height:28px;width:200px;" id="unitAddress" ></td>');
    html.push('</tr>');
    html.push('<tr height="32px">');
    html.push('      <td align="right">经 &nbsp;&nbsp; 度:</td>');
    html.push('      <td ><input  maxLength="10" class="textbox" style="height:28px;width:200px;" value="'+lon+'" id="result_lng" disabled ></td>');
    html.push('</tr>');
    html.push('<tr height="32px">');
    html.push('      <td align="right">纬  &nbsp;&nbsp; 度:</td>');
    html.push('      <td ><input maxLength="10" class="textbox" style="height:28px;width:200px;" value="'+lat+'" id="result_lat" disabled></td>');
    html.push('</tr>');  
	html.push('<tr>');
	html.push('		<td colspan="2" align="center">');
	html.push('			<input type="button" id="saveBtn" value="保存" onclick="return saveMsg()" style="height:25px;width:60px;">');
	html.push('			<input type="button" value="取消" onclick="pageExit()" style="height:25px;width:60px;">');
	html.push('		</td>');
	html.push('</tr>');
    html.push('</table>');
	html.push('</div>');
    return html;
}

//取消关闭弹出层
function pageExit(){
    map.closeInfoWindow();
}

//禁止输入除数字意外的字符
function stopWord(){
	var teleno=document.getElementById("teleno");
    teleno.value=teleno.value.replace(/\D/g,'');
}

//根据经纬度解析出地址
function getLocation(lat,lon){
    var g=new BMap.Geocoder();
    var point=new BMap.Point(lon,lat);
    g.getLocation(point,function(msg){
		console.log($("#unitAddress"));
		$("#unitAddress").val(msg.address);
    });
}

function EnterPress(){ //传入 event
	var k = event.keyCode;
	if(k == 13){	
		document.getElementById("select").focus();
		document.getElementById("select").click();
	}
}

//搜索结果实体
function resultOfAddress(abc,title,point){
	this.abc = abc,
	this.title = title;
	this.lat = point.lat;
	this.lon = point.lng;
}