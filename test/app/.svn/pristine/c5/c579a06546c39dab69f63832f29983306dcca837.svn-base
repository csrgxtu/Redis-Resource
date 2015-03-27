$(function() {
	initDataGrid();
	searchPoi(pageIndex, pageSize);
	creatMap();
	toCheck('createKeyUnit', '/FireKeyUnit/save');
	toCheck('updateKeyUnit', '/FireKeyUnit/save');
	toCheck('deleteKeyUnit', '/FireKeyUnit/delete');
});

var pageIndex = 1;
var pageSize = 10;
//标注工具事件
$("#createKeyUnit").click(function() {
	var iconIndex = 0;
	markerPoi(map, iconIndex, mkrTool);
	$(document).bind("keydown", "esc", function(ev) {
		mkrTool.close();
	});
	$(document).bind("mousedown", function(e) {
		if (3 == e.which) {
			//单击鼠标右键
			mkrTool.close();
		}
	});
});

//	用MarkerTool标注
function markerPoi(map, iconIndex, mkrTool) {
	var win = $('#updateDiv').html();
	var infoWin = new BMap.InfoWindow(win, {
		offset: new BMap.Size(0, -10)
	});
	var curMkr = null; // 记录当前添加的Mkr
	mkrTool.addEventListener("markend", function(evt) {
		var mkr = evt.marker;
		mkr.openInfoWindow(infoWin);
		setDataByMarker(map, mkr, infoWin);
		curMkr = mkr;
	});

	mkrTool.open(); //打开工具
	var icon = BMapLib.MarkerTool.SYS_ICONS[iconIndex]; //设置工具样式，0-23
	mkrTool.setIcon(icon);
}

function setDataByMarker(map, mkr) {
	var lat = mkr.getPosition().lat;
	var lng = mkr.getPosition().lng;
	geoParse(lat, lng);
	$("#unitBaiduLat").val(lat);
	$("#unitBaiduLon").val(lng);
	$('#newKeyUnit').html('<strong>新增重点单位数据: </strong>');
	$("#submitUpdate").click(function() {
		submitSaveOrUpdate(1);
	});
	$("#cancalSubmit").click(function() {
		map.closeInfoWindow();
	});
}

/**
  解析位置
  在百度云中根据经纬度获得地址name
*/
function geoParse(lat, lon) {
	var g = new BMap.Geocoder();
	var point = new BMap.Point(lon, lat);
	g.getLocation(point, function(msg) {
		$("#unitAddress").val(msg.address);
		$("#unitCity").val(msg.addressComponents.city);
		$("#unitDistrict").val(msg.addressComponents.district);
		$("#unitLocation").val(msg.addressComponents.street + msg.addressComponents.streetNumber);
		$("#unitFireKeyUnitId").val('');
		$("#unitName").val('');
		$("#unitAddress").attr('disabled', 'disabled');
		$("#unitBaiduLat").attr('disabled', 'disabled');
		$("#unitBaiduLon").attr('disabled', 'disabled');
		$("#unitContactNumber").val('');
		$("#unitCorpRep").val('');
		$("#unitCity").attr('disabled', 'disabled');
		$("#unitDistrict").attr('disabled', 'disabled');
		$("#unitCorpRepContact").val('');
		$("#unitSafetyRep").val('');
		$("#unitSafetyRepContact").val('');
		$("#unitSafetyMgmtRep").val('');
		$("#unitSafetyMgmtRepContact").val('');
		$("#unitSafetyMgmtRep2").val('');
		$("#unitSafetyMgmtRepContact2").val('');
	});
}

function initDataGrid() {
	$('#keyUnitTable').datagrid({
		rownumbers: true,
		singleSelect: true,
		autoRowHeight: false,
		pagination: true,
		collapsible: false,
		toolbar: '#toolbar',
		remoteSort: false,
		multiSort: true,
		loadMsg: '正在加载数据，请稍等...',
		striped: true,
		fit: true,
		fitColumns: true,
		columns: [
			[{
				field: 'Name',
				title: '单位',
				width: 80,halign: 'center',
				sortable: true
			}, {
				field: 'Address',
				title: '地址',
				width: 230,halign: 'center',
				sortable: true
			}]
		]
	});
	var p = $('#keyUnitTable').datagrid('getPager');
	$(p).pagination({
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function(pageNumber, pageSize) {
			pageIndex = pageNumber;
			searchPoi(pageNumber, pageSize);
		}
	});
}

function dateGridData(total, recs) {
	this.total = total;
	this.rows = recs;
}

/**
	提交搜索
*/
function searchPoi(pageIndex, pageSize) {
	$.ajax({
		type: "POST",
		url: "/fireKeyUnit/read",
		data: "address=" + $('#poiScIpt').val() + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "",
		success: function(msg) {
			if (msg.code == 200) {
				$("#keyUnitTable").datagrid('loadData', new dateGridData(msg.data.total, msg.data.recs));
				showWaterInMap(msg.data.recs);
			} else {
				openAlert("获取服务器数据失败!", 300, 100);
			}
		}
	});
}


var map = new BMap.Map("mapBox"); // 创建Map实例
var mkCenter = []; //地图上中心点
var mkrTool = new BMapLib.MarkerTool(map, {
	autoClose: true,
	followText: "添加水源标注"
});
map.enableScrollWheelZoom(); //启动鼠标滚轮缩放地图
map.enableKeyboard(); //启动键盘操作地图
// 启用地图惯性拖拽   
map.enableInertialDragging();

// 展示普通街道、卫星和路网的混合视图   
map.addControl(new BMap.MapTypeControl({
	mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
}));

function creatMap() {
	map.enableScrollWheelZoom(); // 启用滚轮放大缩小 map.enableContinuousZoom(); // 启用地图惯性拖拽，默认禁用 map.enableInertialDragging();                           // 启用连续缩放效果，默认禁用。 map.addControl(new BMap.NavigationControl());           // 添加平移缩放控件
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
	map.addControl(new BMap.OverviewMapControl()); // 添加缩略地图控件
	map.addControl(new BMap.MapTypeControl()); // 添加地图类型控件
	map.centerAndZoom("岳阳", 13);
	/**
	 *  地图拖动事件，拖动加载新的标注点
	 */
	map.addEventListener('dragend', function() {
		var pt = map.getBounds().getCenter();
		if (mkCenter.length > 0) {
			for (var i = 0; i < mkCenter.length; i++) {
				mkCenter[i].setPosition(new BMap.Point(pt.lng, pt.lat));
			}
		} else {
			var point = new BMap.Point(pt.lng, pt.lat);
			var mark = new BMap.Marker(point);
			map.addOverlay(mark);
			mkCenter.push(mark);
		}
	});
}

var markers = new Array(); //地图上当前所有重点单位标注点
//地图上显示数据
function showWaterInMap(waterPois) {
	//在地图上画标注
	for (var i = 0; i < markers.length; i++) {
		map.removeOverlay(markers[i]);
	}
	markers = [];
	for (var i = 0; i < waterPois.length; i++) {
		var pt = new BMap.Point(waterPois[i].BaiduLon, waterPois[i].BaiduLat);
		var marker = new BMap.Marker(pt); // 创建标注
		map.addOverlay(marker);
		//创建点击事件
		marker.addEventListener('click', markerCilck);
		markers.push(marker);
	}
}

function markerCilck(e) {
	var p = e.target;
	var markerlon = p.getPosition().lng;
	var markerlat = p.getPosition().lat;
	var datas = $("#keyUnitTable").datagrid("getData").rows;
	for (var i = 0; i < datas.length; i++) {
		if (datas[i].BaiduLon == markerlon && datas[i].BaiduLat == markerlat) {
			var rowIndex = $("#keyUnitTable").datagrid("getRowIndex", datas[i]);
			$("#keyUnitTable").datagrid("selectRow", rowIndex);
			break;
		}
	}
}

//单击行事件
$('#keyUnitTable').datagrid({
	onSelect: function(rowIndex, row) {
		//		$("#updateKeyUnit").click();
		for (var i = 0; i < markers.length; i++) {
			if ((row.BaiduLat == markers[i].getPosition().lat) && (row.BaiduLon == markers[i].getPosition().lng)) {
				var infoWin = new BMap.InfoWindow(creatsubmitUpdate(row).join(""), {
					width : 600,     // 信息窗口宽度
 					height: 400,     // 信息窗口高度    
				});
				markers[i].openInfoWindow(infoWin);
				break;
			}
		}

	}
});

function creatsubmitUpdate(row) {
var html = [];
html.push('<div style="overflow:auto;">');
html.push('<strong>标注位置信息: </strong>');
html.push('<table border="0">');
html.push('<tr>');
html.push('<td style="text-align:right;padding-right:20px;">单位名称:</td>');
html.push('<td colspan="3"> ');
html.push('<input type="text" style="height:30px;width:500px;" class="textbox" value="'+row.Name+'" id="mapunitName" /> ');
html.push('<input type="hidden" id="mapunitFireKeyUnitId" value="'+row.FireKeyUnitId+'"/> ');
html.push('</td>');
html.push('</tr>');
html.push('');
html.push('<tr> ');
html.push('<td style="text-align:right;padding-right:20px;">简单地址: </td> ');
html.push('<td> ');
html.push('<input type="text" style="height:30px;width:200px;" class="textbox" id="mapunitLocation" value="'+row.Location+'"/>  ');
html.push('<input type="hidden" id="mapunitCity"  value="'+row.City+'"/>');
html.push('<input type="hidden" id="mapunitDistrict"  value="'+row.District+'"/>');
html.push('</td>');
html.push('<td style="text-align:right;padding:0 20px;width:55px;"> 单位电话: </td> ');
html.push('<td> ');
html.push('<input type="text" style="height:30px;width:200px;" class="textbox" id="mapunitContactNumber" value="'+row.ContactNumber+'"/>');
html.push('</td>');
html.push('</tr>');
html.push('  ');
html.push('<tr> ');
html.push('<td style="text-align:right;padding-right:20px;">详细地址:</td>  ');
html.push('<td colspan="3">   ');
html.push('<input type="text" style="height:30px;width:500px;" class="textbox" id="mapunitAddress" value="'+row.Address+'" disabled/>  ');
html.push('</td>  ');
html.push('</tr>');
html.push('    ');
html.push('<tr> ');
html.push('<td style="text-align:right;padding-right:20px;">联 系 人: </td>');
html.push('<td>   ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitCorpRep" value="'+row.CorpRep+'"/>    ');
html.push('</td>  ');
html.push('<td style="text-align:right;padding:0 20px;width:55px;"> 联系电话:</td>    ');
html.push('<td>   ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitCorpRepContact" value="'+row.CorpRepContact+'">     ');
html.push('</td>  ');
html.push('</tr>');
html.push('    ');
html.push('<tr> ');
html.push('<td style="text-align:right;padding-right:20px;">负 责 人: </td>');
html.push('<td>   ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitSafetyRep" value="'+row.SafetyRep+'"/>  ');
html.push('</td>  ');
html.push('<td style="text-align:right;padding:0 20px;width:55px;">联系电话:</td>     ');
html.push('<td> ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitSafetyRepContact" value="'+row.SafetyRepContact+'">                           ');
html.push('</td>                  ');
html.push('</tr>                      ');
html.push('          ');
html.push('<tr>                       ');
html.push('<td style="text-align:right;padding-right:20px;">安全员1: </td> ');
html.push('<td>                   ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitSafetyMgmtRep" value="'+row.SafetyMgmtRep+'"/>                            ');
html.push('</td>                  ');
html.push('<td style="text-align:right;padding:0 20px;width:55px;">联系电话:</td>                     ');
html.push('<td>                   ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitSafetyMgmtRepContact" value="'+row.SafetyMgmtRepContact+'">                       ');
html.push('</td>                  ');
html.push('</tr>                      ');
html.push('          ');
html.push('<tr>                       ');
html.push('<td style="text-align:right;padding-right:20px;">安 全 员2: </td>');
html.push('<td>                   ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitSafetyMgmtRep2" value="'+row.SafetyMgmtRep2+'"/>                           ');
html.push('</td>                  ');
html.push('<td style="text-align:right;padding:0 20px;width:55px;">联系电话:</td>                     ');
html.push('<td>                   ');
html.push('<input style="height:30px;width:200px;" type="text" class="textbox" id="mapunitSafetyMgmtRepContact2" value="'+row.SafetyMgmtRepContact2+'">                      ');
html.push('</td>                  ');
html.push('</tr>                      ');
html.push('          ');
html.push('<tr>                       ');
html.push('<td style="text-align:right;padding-right:20px;">所在经度: </td> ');
html.push('<td>                   ');
html.push('<input type="text" style="height:30px;width:200px;" class="textbox" id="mapunitBaiduLon" disabled value="'+row.BaiduLon+'"/>                                 ');
html.push('</td>                  ');
html.push('<td style="text-align:right;padding:0 20px;width:55px;"> 所在纬度: </td>                   ');
html.push('<td>                   ');
html.push('<input type="text" style="height:30px;width:200px;" class="textbox" id="mapunitBaiduLat" disabled value="'+row.BaiduLat+'"/>                                 ');
html.push('</td>                  ');
html.push('</tr>                      ');
html.push('          ');

html.push('<tr height="40px">');
html.push('<td colspan="4" align="center">                              ');
html.push('<a href="/DynamicPlan/getData?id='+row.RefId+'" target="_blank">查看预案</a>');
html.push('</td>');
html.push('</tr>');

html.push('<tr height="40px">         ');
html.push('<td colspan="4" align="center">                              ');
html.push('<button style="height:25px;width:60px;" onclick="submitSaveOrUpdate(3);">&nbsp;保 存&nbsp;</button> &nbsp;&nbsp;&nbsp; ');
html.push('<button style="height:25px;width:60px;" onclick="map.closeInfoWindow();">&nbsp;取 消&nbsp;</button>                  ');
html.push('</td>                  ');
html.push('</tr>                      ');
html.push('</table>');
html.push('</div>');
	return html;
}

$("#deleteKeyUnit").click(function() {
	var row = $("#keyUnitTable").datagrid("getSelected");
	var rowIndex = $("#keyUnitTable").datagrid("getRowIndex", row);
	Dialog.confirm('您确认要删除重点单位<font color="red"> ' + row.Name + ' </font>吗?',
		function() {
			$.ajax({
				type: "POST",
				url: "/fireKeyUnit/delete",
				data: "fireKeyUnitId=" + row.FireKeyUnitId + "",
				success: function(msg) {
					if (msg.code == 200) {
						searchPoi(pageIndex, pageSize);
					} else {
						openAlert("删除失败！", 300, 100);
					}
				}
			});
		});
});

//编辑标注
$("#updateKeyUnit").click(function() {
	var row = $("#keyUnitTable").datagrid("getSelected");
	var rowIndex = $("#keyUnitTable").datagrid("getRowIndex", row);
	$("#unitFireKeyUnitId").val(row.FireKeyUnitId);
	$("#unitName").val(row.Name);
	$("#unitAddress").val(row.Address);
	$("#unitBaiduLat").val(row.BaiduLat);
	$("#unitBaiduLon").val(row.BaiduLon);
	$("#unitContactNumber").val(row.ContactNumber);
	$("#unitCorpRep").val(row.CorpRep);

	$("#unitCity").val(row.City);
	$("#unitDistrict").val(row.District);
	$("#unitLocation").val(row.Location);
	$("#unitCorpRepContact").val(row.CorpRepContact);
	$("#unitSafetyRep").val(row.SafetyRep);
	$("#unitSafetyRepContact").val(row.SafetyRepContact);
	$("#unitSafetyMgmtRep").val(row.SafetyMgmtRep);
	$("#unitSafetyMgmtRepContact").val(row.SafetyMgmtRepContact);
	$("#unitSafetyMgmtRep2").val(row.SafetyMgmtRep2);
	$("#unitSafetyMgmtRepContact2").val(row.SafetyMgmtRepContact2);
	open5("updateDiv", 650, 350, "修改重点单位信息");
	$("#submitUpdate").click(function() {
		submitSaveOrUpdate(2);
	});
});
$("#cancalSubmit").click(function() {
	map.closeInfoWindow();
	Dialog.close();
});

function checkSubmit(plan) {
	var checkupdate='';
	if(plan==3){
		checkupdate='map';
	}
	if ($('#'+checkupdate+'unitName').val() == '') {
		$.messager.alert('警告', '单位名称不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitContactNumber').val() == '') {
		$.messager.alert('警告', '单位电话不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitLocation').val() == '') {
		$.messager.alert('警告', '详细地址不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitCorpRep').val() == '') {
		$.messager.alert('警告', '联系人不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitCorpRepContact').val() == '') {
		$.messager.alert('警告', '联系人的联系电话不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitSafetyRep').val() == '') {
		$.messager.alert('警告', '负责人不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitSafetyRepContact').val() == '') {
		$.messager.alert('警告', '负责人的联系电话不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitSafetyMgmtRep').val() == '') {
		$.messager.alert('警告', '安全员1不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitSafetyMgmtRepContact').val() == '') {
		$.messager.alert('警告', '安全员1的联系电话不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitSafetyMgmtRep2').val() == '') {
		$.messager.alert('警告', '安全员2不能为空！');
		return true;
	}
	if ($('#'+checkupdate+'unitSafetyMgmtRepContact2').val() == '') {
		$.messager.alert('警告', '安全员2的联系电话不能为空！');
		return true;
	}
	return false;
}

function submitSaveOrUpdate(plan) {
	if (checkSubmit(plan) == true) {
		return;
	}
	var str = '';
	var checkupdate='';
	if(plan==3){
		checkupdate='map';
	}
	var url="name=" + $('#'+checkupdate+'unitName').val() +
			"&city=" + $('#'+checkupdate+'unitCity').val() +
			"&district=" + $('#'+checkupdate+'unitDistrict').val() +
			"&address=" + $('#'+checkupdate+'unitAddress').val() +
			"&location=" + $('#'+checkupdate+'unitLocation').val() +
			"&gisLon=" + 113.0426408114 +
			"&gisLat=" + 29.3883015597 +
			"&baiduLon=" + $('#'+checkupdate+'unitBaiduLon').val() +
			"&baiduLat=" + $('#'+checkupdate+'unitBaiduLat').val() +
			"&contactNumber=" + $('#'+checkupdate+'unitContactNumber').val() +
			"&corpRep=" + $('#'+checkupdate+'unitCorpRep').val() +
			"&corpRepContact=" + $('#'+checkupdate+'unitCorpRepContact').val() +
			"&safetyRep=" + $('#'+checkupdate+'unitSafetyRep').val() +
			"&safetyRepContact=" + $('#'+checkupdate+'unitSafetyRepContact').val() +
			"&safetyMgmtRep=" + $('#'+checkupdate+'unitSafetyMgmtRep').val() +
			"&safetyMgmtRepContact=" + $('#'+checkupdate+'unitSafetyMgmtRepContact').val() +
			"&safetyMgmtRep2=" + $('#'+checkupdate+'unitSafetyMgmtRep2').val() +
			"&safetyMgmtRepContact2=" + $('#'+checkupdate+'unitSafetyMgmtRepContact2').val();
	if (plan != 1) {
		str = '&fireKeyUnitId=' + $('#'+checkupdate+'unitFireKeyUnitId').val();
		url=url+ str;
	}
	console.log(url);
	$.ajax({
		type: 'POST',
		url: '/FireKeyUnit/save',
		data:  url,
		success: function(msg) {
			if (msg.code == 200) {
				searchPoi(pageIndex, pageSize);
				map.closeInfoWindow();
				Dialog.close();
			} else {
				openAlert("提交失败！", 300, 100);
			}
		}
	});
}
