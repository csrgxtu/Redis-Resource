var pageIndex = 1;
var pageSize = 10;

function initDataGrid() {
	$('#waterTable').datagrid({
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
				title: '简名',
				width: 80,
				halign: 'center',
				sortable: true
			}, {
				field: 'Address',
				title: '地址',
				width: 230,
				halign: 'center',
				sortable: true
			}, {
				field: 'StatusCode',
				title: '状态',
				width: 60,
				halign: 'center',
				sortable: true
			}]
		]
	});
	var p = $('#waterTable').datagrid('getPager');
	$(p).pagination({
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function(pageNumber, pageSize) {
			searchPoi(pageNumber, pageSize);
		}
	});
}

/**
	提交搜索
*/
function searchPoi(pageIndex, pageSize) {
	$.ajax({
		type: "POST",
		url: "/ShuiYuan/read",
		data: "address=" + $('#waterAddress').val() + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "",
		success: function(msg) {
			if (msg.code == 200) {
				$("#waterTable").datagrid('loadData', new dateGridData(msg.data.total, msg.data.recs));
				showWaterInMap(msg.data.recs);
			} else {
				openAlert("获取服务器数据失败!", 300, 100);
			}
		}
	});
}

$('#searchPoiByAddress').click(function() {
	searchPoi(pageIndex, pageSize);
});

$('#deleteWater').click(function() {
	var deleteWater = $('#waterTable').datagrid('getSelected');
	if (deleteWater == null) {
		openAlert("请选择需要删除的行！", 300, 100);
		return;
	}
	$.messager.confirm('确认对话框', '您确认要删除<font color="red"> ' + deleteWater.Address + ' </font>处水源吗?', function(r) {
		if (r) {
			$.ajax({
				type: 'POST',
				url: '/ShuiYuan/delete',
				data: "shuiYuanId=" + deleteWater.ShuiYuanId + "",
				success: function(msg) {
					if (msg.code == 200) {
						var rowIndex = $("#waterTable").datagrid("getRowIndex", deleteWater);
						$("#waterTable").datagrid("deleteRow", rowIndex);
					} else {
						openAlert("提交删除失败!", 300, 100);
					}
				}
			});
		}
	});
});


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

// 添加
$("#createWater").click(function() {
	var iconIndex = 0;
	markerPoi(map, iconIndex, mkrTool);
	$(document).bind("keydown", "esc", function(ev) {
		mkrTool.close();
	});
	$(document).bind("mousedown", function(e) {
		//单击鼠标右键
		if (3 == e.which) {
			mkrTool.close();
		}
	});
});

//	用MarkerTool标注
function markerPoi(map, iconIndex, mkrTool) {
	var infoWin = new BMap.InfoWindow(getAddPoiWindow(1, null).join(""), {
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

function setDataByMarker(map, mkr, infoWin) {
	var lat = mkr.getPosition().lat;
	var lng = mkr.getPosition().lng;
	geoParse(lat, lng);
	$("#orilatInput").val(lat);
	$("#orilonInput").val(lng);
	$("#cancelPoiBtn").click(function() {
		map.closeInfoWindow();
	});

	$("#createPoiBtn").click(function() {
		submitSaveOrUpdate(1);
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
		$("#addressInput").val(msg.address);
		$("#streetInput").val(msg.addressComponents.street + msg.addressComponents.streetNumber);
		$("#txtCity").val(msg.addressComponents.city);
		$("#txtDistrict").val(msg.addressComponents.district);
	});
}


/**
	新增Poi窗口
*/
function getAddPoiWindow(plan, water) {
	var obj = new waterPoi(water);
	var str = '';
	var click = '';
	if (plan != 1) {
		str = 'disabled';
		click = 'onclick=submitSaveOrUpdate(2);';
	}
	var html = [];
	html.push('<div style="height:370px;width:570px;overflow:auto;">');
	html.push('<strong>标注位置信息: </strong>');
	html.push('<table border="0">');
	html.push('  <tr>');
	html.push('      <td align="right" width="100px">简 名：</td>');
	html.push('      <td><input maxLength="25"  style="height:30px;width:180px;" value="' + obj.Name + '" class="textbox" id="NameInput" ' + str + '></td>');
	html.push('      <td align="right">编 号：</td>');
	html.push('      <td colspan="2"><input maxLength="25"  style="height:30px;width:180px;" value="' + obj.Number + '" class="textbox" id="NumberInput" ' + str + '></td>');
	html.push('  </tr>');
	html.push('  <tr>');
	html.push('      <td  align="right">地 址：</td>');
	html.push('      <td><input maxLength="25" style="height:30px;width:180px;" value="' + obj.Address + '" class="textbox" id="addressInput" disabled>');
	html.push('				<input type="hidden" id="txtCity" value="' + obj.City + '">');
	html.push('		 		<input type="hidden" id="txtDistrict" value="' + obj.District + '">');
	html.push('		 		<input type="hidden" id="shuiYuanIdInput" value="' + obj.ShuiYuanId + '">');
	html.push('      <td align="right">街 道：</td>');
	html.push('      <td colspan="2"><input maxLength="25"  style="height:30px;width:180px;" value="' + obj.Road + '" class="textbox" id="streetInput" disabled></td>');
	html.push('		 </td>');
	html.push('  </tr>');
	html.push('  <tr>');
	html.push('      <td  align="right">状 态：</td>');
	html.push('      <td><input maxLength="20" style="height:30px;width:180px;" value="' + obj.StatusCode + '" class="textbox" id="statusInput"></td>');
	html.push('      <td  align="right">类 型：</td>');
	html.push('      <td colspan="2"><input maxLength="20" style="height:30px;width:180px;" value="' + obj.Type + '" class="textbox" id="maintype" ' + str + '></td>');
	html.push('  </tr>');
	html.push('  <tr>');
	html.push('      <td  align="right">纬 度：</td>');
	html.push('      <td><input maxLength="12" class="textbox" style="height:30px;width:180px;" value="' + obj.BaiduLat + '" id="orilatInput" disabled></td>');
	html.push('      <td  align="right">经 度：</td>');
	html.push('      <td  colspan="2"><input maxLength="12" style="height:30px;width:180px;" class="textbox" value="' + obj.BaiduLon + '" id="orilonInput" disabled></td>');
	html.push('  </tr>');

	html.push('  <tr>');
	html.push('  <td colspan="5" style="padding-left: 20px;">');
	html.push('  <table>');
	
	html.push('  <tr>');
	
	html.push('  <td>');
	html.push('  <div style="text-align:center"><img id="showImgmain" onclick="showImgByDagrid(\'main\',\'' + obj.ZPURL + '\');" class="showImg"  onerror="this.src=\'/images/livetime.png\'" src="' + obj.ZPURL + '">');
	html.push('</div>');
	html.push('  </td>');
	
	html.push('  <td>');
	html.push('  <div style="text-align:center"><img id="showImgD" onclick="showImgByDagrid(\'D\',\'' + obj.FWTD + '\');" class="showImg" onerror="this.src=\'/images/livetime.png\'" src="' + obj.FWTD + '"></div>');
	html.push('  </td>');
	
	html.push('  <td>');
	html.push('  <div style="text-align:center"><img id="showImgX" onclick="showImgByDagrid(\'X\',\'' + obj.FWTX + '\');" class="showImg" onerror="this.src=\'/images/livetime.png\'" src="' + obj.FWTX + '"></div>');
	html.push('  </td>');
	
	html.push('  <td>');
	html.push('  <div style="text-align:center"><img id="showImgN" onclick="showImgByDagrid(\'N\',\'' + obj.FWTN + '\');" class="showImg" onerror="this.src=\'/images/livetime.png\'" src="' + obj.FWTN + '"></div>');
	html.push('  </td>');
	
	html.push('  <td>');
	html.push('  <div style="text-align:center"><img id="showImgB" onclick="showImgByDagrid(\'B\',\'' + obj.FWTB + '\');" class="showImg" onerror="this.src=\'/images/livetime.png\'" src="' + obj.FWTB + '"></div>');
	html.push('  </td>');
	
	html.push('  </tr>');
	
	html.push('  <tr>');
	html.push('  <td>');
	html.push('  <div style="text-align:center">');
	html.push('  <input type="hidden" id="hidmainImg"  value="' + obj.ZPURL + '">');
	html.push('  <div class="fileBorder"><span class="btnName">上传正面照片</span><input type="file" name="image" id="mainImg"');
	html.push('onchange="initUpload(\'hidmainImg\',\'mainImg\',\'showImgmain\',\'ZPWJ\')"></div>');
	html.push('  </td>');
	html.push('  <td>');
	html.push('  <div style="text-align:center">');
	html.push('  <input type="hidden" id="hidDImg" value="' + obj.FWTD + '">');
	html.push('  <div class="fileBorder"><span class="btnName">上传东面照片</span><input type="file" name="image" id="DImg"');
	html.push('onchange="initUpload(\'hidDImg\',\'DImg\',\'showImgD\',\'FWTD\')"></div>');
	html.push('  </td>');
	html.push('  <td>');
	html.push('  <div style="text-align:center">');
	html.push('  <input type="hidden" id="hidXImg" value="' + obj.FWTX + '">');
	html.push('  <div class="fileBorder"><span class="btnName">上传西面照片</span><input type="file" name="image" id="XImg"');
	html.push('onchange="initUpload(\'hidXImg\',\'XImg\',\'showImgX\',\'FWTX\')"></div>');
	html.push('  </td>');
	html.push('  <td>');
	html.push('  <div style="text-align:center">');
	html.push('  <input type="hidden" id="hidNImg" value="' + obj.FWTN + '">');
	html.push('  <div class="fileBorder"><span class="btnName">上传南面照片</span><input type="file" name="image" id="NImg"');
	html.push('onchange="initUpload(\'hidNImg\',\'NImg\',\'showImgN\',\'FWTN\')"></div>');
	html.push('  </td>');
	html.push('  <td>');
	html.push('  <div style="text-align:center">');
	html.push('  <input type="hidden" id="hidBImg" value="' + obj.FWTB + '">');
	html.push('  <div class="fileBorder"><span class="btnName">上传北面照片</span><input type="file" name="image" id="BImg"');
	html.push('onchange="initUpload(\'hidBImg\',\'BImg\',\'showImgB\',\'FWTB\')"></div>');
	html.push('  </td>');
	html.push('  </tr>');
	html.push('  </table>');
	html.push('  </td>');
	html.push('  </tr>');

	html.push('  <tr align="center" height="40px">');
	html.push('	     <td  colspan="5">');
	html.push('      	<input type="button" value="保存" ' + click + ' style="height:25px;width:60px;" id="createPoiBtn">');
	html.push('			&nbsp;&nbsp;&nbsp;');
	html.push('			<input type="button" onclick="map.closeInfoWindow();" value="取消" style="height:25px;width:60px;" id="cancelPoiBtn" >');
	html.push('	     </td>');
	html.push('  </tr>');
	html.push('</table>');
	html.push('</div>');
	return html;
}

function showImgByDagrid(plan, url) {
	if (url == null || url == 'null'|| url == '') {
		$.messager.alert('警告', '暂无图片，请上传照片后放大查看！', 'info');
		return;
	}
	$('#win').window({
		width: 400,
		height: 500,
		minimizable:false,
		collapsible:false,
		maximizable:false,
		title:'查看图片',
		modal: true
	});
	$('#showImgInDagrid').attr('src',url);
}

function initUpload(hidImg, fileId, showId, fw) {
	$.ajaxFileUpload({
		url: 'uploadShuiYuanPic', //用于文件上传的服务器端请求地址
		type: 'post',
		data: {
			picTag: fw
		},
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: fileId, //文件上传域的ID
		dataType: 'json', //返回值类型 一般设置为json
		success: function(data, status) {
			if (data.code == 200) {
				$('#' + hidImg).val(data.tpUrl);
				$('#' + showId).attr('src', data.tpUrl);
			} else {
				$.messager.alert('警告', data.msg, 'info');
			}
		}
	})
}


function submitSaveOrUpdate(plan) {
	if (checkSubmit() == true) {
		return;
	}
	var str = '';
	if (plan != 1) {
		str = '&shuiYuanId=' + $('#shuiYuanIdInput').val();
	}
	$.ajax({
		type: 'POST',
		url: '/ShuiYuan/save',
		data: "number=" + $('#NumberInput').val() +
			"&name=" + $('#NameInput').val() +
			"&city=" + $('#txtCity').val() +
			"&district=" + $('#txtDistrict').val() +
			"&address=" + $('#addressInput').val() +
			"&type=" + $('#maintype').val() +
			"&statusCode=" + $('#statusInput').val() +
			"&gisLon=" + 113.0426408114 +
			"&gisLat=" + 29.3883015597 +
			"&baiduLon=" + $('#orilonInput').val() +
			"&baiduLat=" + $('#orilatInput').val() +
			"&zpwj=" + $('#hidmainImg').val() +
			"&fwtd=" + $('#hidDImg').val() +
			"&fwtx=" + $('#hidXImg').val() +
			"&fwtn=" + $('#hidNImg').val() +
			"&fwtb=" + $('#hidBImg').val() +
			"&road=" + $('#streetInput').val() + str,
		success: function(msg) {
			if (msg.code == 200) {
				searchPoi(pageIndex, pageSize);
				openAlert("操作成功", 300, 100);
				map.closeInfoWindow();

			} else {
				openAlert("提交失败！", 300, 100);
			}
		}
	});
}

function checkSubmit() {
	if ($('#NameInput').val() == '') {
		$.messager.alert('警告', '简名不能为空！');
		return true;
	}
	if ($('#NumberInput').val() == '') {
		$.messager.alert('警告', '编号不能为空！');
		return true;
	}
	if ($('#statusInput').val() == '') {
		$.messager.alert('警告', '状态不能为空！');
		return true;
	}
	if ($('#maintype').val() == '') {
		$.messager.alert('警告', '类型不能为空！');
		return true;
	}
	if ($('#orilonInput').val() == '') {
		$.messager.alert('警告', '经度不能为空！');
		return true;
	}
	if ($('#orilatInput').val() == '') {
		$.messager.alert('警告', '纬度不能为空！');
		return true;
	}
	return false;
}

var markers = new Array(); //地图上当前所有水源标注点
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
	var datas = $("#waterTable").datagrid("getData").rows;
	for (var i = 0; i < datas.length; i++) {
		if (datas[i].BaiduLon == markerlon && datas[i].BaiduLat == markerlat) {
			var rowIndex = $("#waterTable").datagrid("getRowIndex", datas[i]);
			$("#waterTable").datagrid("selectRow", rowIndex);
			break;
		}
	}
}

//单击行事件
$('#waterTable').datagrid({
	onSelect: function(rowIndex, row) {
		for (var i = 0; i < markers.length; i++) {
			if ((row.BaiduLat == markers[i].getPosition().lat) && (row.BaiduLon == markers[i].getPosition().lng)) {
				var infoWin = new BMap.InfoWindow(getAddPoiWindow(2, row).join(""), {
					offset: new BMap.Size(0, 0)
				});
				markers[i].openInfoWindow(infoWin);
				break;
			}
		}
	}
});

$(function() {
	initDataGrid();
	searchPoi(pageIndex, pageSize);
	creatMap();
	toCheck('createWater', '/ShuiYuan/save');
	toCheck('deleteWater', '/ShuiYuan/delete');
});

function dateGridData(total, recs) {
	this.total = total;
	this.rows = recs;
}

/**
 *   水源信息实体
 */
function waterPoi(dataOfServer) {
	if (dataOfServer != null) {
		this.ShuiYuanId = dataOfServer.ShuiYuanId;
		this.OrganizationId = dataOfServer.OrganizationId;
		this.RefId = dataOfServer.RefId;
		this.Number = dataOfServer.Number;
		this.Name = dataOfServer.Name;
		this.City = dataOfServer.City;
		this.District = dataOfServer.District;
		this.Road = dataOfServer.Road;
		this.Address = dataOfServer.Address;
		this.Type = dataOfServer.Type;
		this.StatusCode = dataOfServer.StatusCode;
		this.GisLon = dataOfServer.GisLon;
		this.GisLat = dataOfServer.GisLat;
		this.BaiduLon = dataOfServer.BaiduLon;
		this.BaiduLat = dataOfServer.BaiduLat;
		this.ZPURL = dataOfServer.ZPURL;
		this.FWTD = dataOfServer.FWTD;
		this.FWTX = dataOfServer.FWTX;
		this.FWTN = dataOfServer.FWTN;
		this.FWTB = dataOfServer.FWTB;
		this.CreatedBy = dataOfServer.CreatedBy;
		this.CreatedTime = dataOfServer.CreatedTime;
		this.UpdatedBy = dataOfServer.UpdatedBy;
		this.UpdatedTime = dataOfServer.UpdatedTime;
	} else {
		this.ShuiYuanId = '';
		this.OrganizationId = '';
		this.RefId = '';
		this.Number = '';
		this.Name = '';
		this.City = '';
		this.District = '';
		this.Road = '';
		this.Address = '';
		this.Type = '';
		this.StatusCode = '';
		this.GisLon = '';
		this.GisLat = '';
		this.BaiduLon = '';
		this.BaiduLat = '';
		this.ZPURL = '';
		this.FWTD = '';
		this.FWTX = '';
		this.FWTN = '';
		this.FWTB = '';
		this.CreatedBy = '';
		this.CreatedTime = '';
		this.UpdatedBy = '';
		this.UpdatedTime = '';
	}
}