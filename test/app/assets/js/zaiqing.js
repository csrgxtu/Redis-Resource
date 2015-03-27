$(function() {
	initDataGrid();
	getZaiQingInfo(pageNumber, pageSize);
	toCheck('createZaiQing', '/ZaiQing/save');
	toCheck('endZaiQing', '/ZaiQing/save');
	toCheck('readZaiQing', '/ZaiQing/read');
	toCheck('sendZaiQingMsg', '/ZaiQingDiaoPai/sendTypeMsg');
	toCheck('searchZaiQin', '/ZaiQing/read');
});

function initDataGrid() {
	$('#jieJingAndTaskTable').datagrid({
		fit: true,
		collapsible: false,
		remoteSort: false,
		multiSort: true,
		striped: true,
		rownumbers: true,
		singleSelect: true,
		autoRowHeight: true,
		pagination: true,
		url: null,
		toolbar: '#toolbar',
		title: '任务列表',
		pageSize: 20,
		pageNumber: 1,
		pageList: [20, 40, 60, 80],
		loadMsg: '正在加载数据，请稍等...',
		rowStyler: function(index, row) {
			if (row.Status =='接警') {
				return 'background-color:rgb(255, 67, 67);';
			}else if (row.Status =='出警') {
				return 'background-color:rgb(255, 134, 33);';
			}else if (row.Status =='灭火') {
				return 'background-color:rgb(119, 119, 252);';
			}else  if (row.Status =='救援') {
				return 'background-color:rgb(94, 253, 94);';
			}
		},
		frozenColumns: [
			[{
				field: 'Address',
				title: '灾情地址',
				width: 200,
				halign: 'center',
				sortable: true
			}, {
				field: 'ZaiQingName',
				title: '灾情简述',
				width: 120,
				halign: 'center',
				sortable: true
			}, {
				field: 'BJR',
				title: '报警人',
				width: 80,
				halign: 'center',
				sortable: true
			}, {
				field: 'PhoneNumber',
				title: '联系电话',
				halign: 'center',
				width: 120,
				sortable: true
			}, {
				field: 'Status',
				title: '状态',
				width: 50,
				halign: 'center',
				sortable: true
			}, {
				field: 'DataSource',
				title: '灾情来源',
				halign: 'center',
				width: 120,
				sortable: true
			}]
		],
		columns: [
			[{
				field: 'Baidu_Lat',
				title: '纬度',
				halign: 'center',
				width: 90,
				sortable: true
			}, {
				field: 'Baidu_Lon',
				title: '经度',
				halign: 'center',
				width: 90,
				sortable: true
			}, {
				field: 'JGJC',
				title: '所属机构',
				halign: 'center',
				width: 90,
				sortable: true
			}, {
				field: 'KeyUnitName',
				title: '单位地址',
				halign: 'center',
				width: 120,
				sortable: true
			}, {
				field: 'Description',
				title: '描述',
				width: 200,
				halign: 'center',
				sortable: true
			}, {
				field: 'SendTime',
				title: '推送时间',
				halign: 'center',
				width: 140,
				sortable: true
			}, {
				field: 'EndTime',
				title: '结束时间',
				halign: 'center',
				width: 140,
				sortable: true
			}]
		]
	});
	var p = $('#jieJingAndTaskTable').datagrid('getPager');
	$(p).pagination({
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function(pageNumber, pageSize) {
			getZaiQingInfo(pageNumber, pageSize);
		}
	});
}

function initZuZhiUser(plan) {
	var str = '#ManDiv';
	if (plan == 1) {
		str = '#ManDivUser';
	}
	planflag = plan;
	$(str).datagrid({
		fit: true,
		fitColumns: true,
		rownumbers: true,
		pagination: true,
		pageSize: 20,
		pageNumber: 1,
		loadMsg: '正在加载数据，请稍等...',
		columns: [
			[{
				field: 'checkbox',
				width: 10,
				checkbox: true
			}, {
				field: 'DisplayName',
				title: '姓名',
				width: 120,
				sortable: true
			}]
		],
		onSelect: function(rowIndex, rowData) {
			var rows=[];
			rows.push(rowData)
			selectRows(rows,plan);
		},
		onSelectAll: function(rows) {
			selectRows(rows,plan);
		},
		onUnselectAll: function(rows) {
			unselectRows(rows,plan);
		},
		onUnselect: function(rowIndex, rowData) {
			var rows=[];
			rows.push(rowData)
			unselectRows(rows,plan);
		},
		onLoadSuccess: function(data) {
			if (data) {
				$.each(data.rows, function(index, item) {
					for (var i = 0; i < zaiqingrenyuan.length; i++) {
						if (zaiqingrenyuan[i].UserId == item.UserId) {
							$(str).datagrid('checkRow', index);
						}
					}
				});
			}
		}
	});
	var p = $(str).datagrid('getPager');
	$(p).pagination({
		layout: ['prev', 'next', 'refresh'],
		displayMsg: '',
		onSelectPage: function(pageNumber, pageSize) {
			getZuZhiUser(pageNumber, pageSize);
		}
	});
}
function selectRows(d,plan) {
	var str = '#ManDiv';
	var table = '#creatuserTable';
	if (plan == 1) {
		str = '#ManDivUser';
		table = '#userTableUser';
	}
	var data=$(table).datagrid("getRows");
	for(var i=0;i<d.length;i++){
		if(!checkIsSelect(data,d[i])){
			$(table).datagrid("appendRow",d[i]);
		}
	}
}

function unselectRows(d,plan){
	var str = '#ManDiv';
	var table = '#creatuserTable';
	if (plan == 1) {
		str = '#ManDivUser';
		table = '#userTableUser';
	}
	var data=$(table).datagrid("getRows");
	for(var i=0;i<d.length;i++){
		if(checkIsSelect(data,d[i])){
			var index=$(table).datagrid("getRowIndex",d[i].UserId);
			$(table).datagrid("deleteRow",index);
		}
	}
}

function checkIsSelect(vals,val){
	for(var i=0;i<vals.length;i++){
		if(vals[i].UserId==val.UserId){
			return true;
		}
	}
	return false;
}

function initTree(plan) {
	var str = '#organizationTree';
	if (plan == 1) {
		str = '#organizationTreeUser';
	}
	$(str).tree({
		lines: true,
		animate: true
	});
	$(str).tree({
		onClick: function(node) {
			$('#zuzhiuserorganizationId').val(node.id);
			getZuZhiUser(pageNumber, pageSize);
		}
	});


}

var planflag = 0;

function getZuZhiUser(pageNumber, pageSize) {
	$.ajax({
		type: "get",
		url: "/User/read",
		data: "pageIndex=" + pageNumber + "&pageSize=" + pageSize + "&organizationId=" + $('#zuzhiuserorganizationId').val(),
		success: function(msg) {
			if (msg.code == 200) {
				var str = '#ManDiv';
				if (planflag == 1) {
					str = '#ManDivUser';
				}
				$(str).datagrid('loadData', new dateGridData(msg.data.total, msg.data.recs));
			} else {
				openAlert("获取数据失败", 300, 100);
			}
		}
	});
}


var pageNumber = 1;
var pageSize = 20;

function getZaiQingInfo(pageNumber, pageSize) {
	$.ajax({
		type: "post",
		url: "/ZaiQing/read",
		data: "pageIndex=" + pageNumber + "&pageSize=" + pageSize + "&sourceType=" + $('#cornFrom').val() + "&startTime=" + $('#starDateInput').datetimebox('getValue') + "&endTime=" + $('#endDateInput').datetimebox('getValue'),
		success: function(msg) {
			if (msg.code == 200) {
				$('#jieJingAndTaskTable').datagrid('loadData', new dateGridData(msg.data.total, msg.data.recs));
			} else {
				openAlert("获取数据失败", 300, 100);
			}
		}
	});
}

function getZuZhiListByZaiQingId(plan) {
	$.ajax({
		type: "post",
		url: "/Organization/readOrgTree",
		success: function(msg) {
			if (msg.code == 200) {
				var str = '#organizationTree';
				if (plan == 1) {
					str = '#organizationTreeUser';
				}
				$(str).tree({
					data: msg.data
				});
			}
		}
	});
}

$('#createZaiQing').click(function() {
	var row = $("#jieJingAndTaskTable").datagrid("getSelected");
	if (row.DataSource == '消防救援管理系统') {
		$('#flaglaiyuan').html('注：因为该灾情来源于消防救援管理系统，所以基本信息不予更改！！');
		$('#creatzaiQingNamec').attr('disabled', 'disabled');
		$('#creattaskStatusInput').attr('disabled', 'disabled');
		$('#creatphoneNumberc').attr('disabled', 'disabled');
		$('#creataddressc').attr('disabled', 'disabled');
		$('#creattaskEndTimeInput').attr('disabled', 'disabled');
		$('#creatdescriptionc').attr('disabled', 'disabled');
	} else {
		$('#flaglaiyuan').html(' ');
		$('#creatzaiQingNamec').removeAttr("disabled");
		$('#creattaskStatusInput').removeAttr("disabled");
		$('#creatphoneNumberc').removeAttr("disabled");
		$('#creataddressc').removeAttr("disabled");
		$('#creattaskEndTimeInput').removeAttr("disabled");
		$('#creatdescriptionc').removeAttr("disabled");
	}
	//初始化左
	fillingData(row, 0);
	//初始化右
	initTree();
	getZuZhiListByZaiQingId();
	initZuZhiUser();
	open5("diaopaiCreate", 710, 605, "调派信息录入");
});

$("#readZaiQing").click(function() {
	var row = $("#jieJingAndTaskTable").datagrid("getSelected");
	if (row) {
		fillingData(row, 2);
		open5("taskShowDiv", 510, 590, "任务详情");
	}
});

$("#sendZaiQingMsg").click(function() {
	var row = $("#jieJingAndTaskTable").datagrid("getSelected");
	$('#zhilingzaiQingIdc').val(row.ZaiQingId);
	if (row) {
		open5("userInfoDiv", 510, 500, "信息推送");
		initTree(1);
		getZuZhiListByZaiQingId(1);
		initZuZhiUser(1);
		getUserListByZaiQingId(row.ZaiQingId, 2);
	}
});


$("#endZaiQing").click(function() {
	var row = $("#jieJingAndTaskTable").datagrid("getSelected");
	if (row) {
		Dialog.confirm('您确认要结案<font color="red"> ' + row.ZaiQingName + ' </font>吗?',
			function() {
				var updateurl = 'zaiQingId=' + row.ZaiQingId +
					'&status=结案' +
					'&endTime=' + new Date();
				$.ajax({
					type: "post",
					url: "/zaiQing/save",
					data: updateurl,
					success: function(msg) {
						if (msg.code == 200) {
							Dialog.close();
							getZaiQingInfo(pageNumber, pageSize);
						} else if (msg.code == 404) {
							openAlert(msg.msg, 300, 100);
						} else {
							openAlert("修改失败", 300, 100);
						}
					}
				});
			});
	}
});

var zaiqingrenyuan = new Array;

function getUserListByZaiQingId(zaiQingId, plan) {
	$.ajax({
		type: "post",
		url: "/zaiQing/getUserAndOrgByDiaoPaiId",
		data: "zaiQingId=" + zaiQingId,
		success: function(msg) {
			if (msg.code == 200) {
				var str = "#creatuserTable";
				zaiqingrenyuan = msg.data;
				if (plan == 1) {
					str = "#showuserTable";
					zaiqingrenyuan = [];
				} else if (plan == 2) {
					str = '#userTableUser';
					zaiqingrenyuan = msg.data;
				}
				$(str).datagrid("loadData", new dateGridData(msg.data.length, msg.data));
			}
		}
	});
}

function fillingData(row, plan) {
	var str = "";
	if (plan == 0) {
		str = "creat";
		getUserListByZaiQingId(row.ZaiQingId, 0);
	} else if (plan == 1) {
		str = "update";
	} else if (plan == 2) {
		str = "show";
		getUserListByZaiQingId(row.ZaiQingId, 1);
	}
	var date = row.EndTime;
	$("#" + str + "taskEndTimeInput").datetimebox('setValue', date);
	$("#" + str + "taskIdInput").val("");
	$("#" + str + "zaiQingIdc").val(row.ZaiQingId);
	$("#" + str + "zaiQingNamec").val(row.ZaiQingName);
	$("#" + str + "BJRc").val(row.BJR);
	$("#" + str + "phoneNumberc").val(row.PhoneNumber);
	$("#" + str + "latc").val(row.Baidu_Lat);
	$("#" + str + "lonc").val(row.Baidu_Lon);
	$("#" + str + "taskStatusInput").val(row.Status);
	$("#" + str + "typec").val(row.Type);
	$("#" + str + "JGJCc").val(row.JGJC);
	$("#" + str + "addressc").val(row.Address);
	$("#" + str + "createdTimec").val(row.CreatedTime);
	$("#" + str + "descriptionc").val(row.Description);
	$("#" + str + "laiyuan").val(row.DataSource);
	$("#" + str + "KeyUnitName").val(row.KeyUnitName);
}

function updateZaiQing() {
	var updateurl = 'zaiQingId=' + $("#updatezaiQingIdc").val() +
		'&zaiQingName=' + $("#updatezaiQingNamec").val() +
		'&phoneNumber=' + $("#updatephoneNumberc").val() +
		'&keyUnitName=' + $("#updateKeyUnitName").val() +
		'&address=' + $("#updateaddressc").val() +
		'&status=' + $("#updatetaskStatusInput").val() +
		'&description=' + $("#updatedescriptionc").val() +
		'&endTime=' + $("#updatetaskEndTimeInput").datetimebox('getValue');
	$.ajax({
		type: "post",
		url: "/zaiQing/save",
		data: updateurl,
		success: function(msg) {
			if (msg.code == 200) {
				Dialog.close();
				getZaiQingInfo(pageNumber, pageSize);
			} else if (msg.code == 404) {
				openAlert(msg.msg, 300, 100);
			} else {
				openAlert("修改失败", 300, 100);
			}
		}
	});
}

function creatUrl(plan) {
	var url = '';
	var table = '#userTableUser';
	var zaiQingid = '#zhilingzaiQingIdc';
	if (plan == 'creat') {
		table = '#creatuserTable';
		zaiQingid = '#creatzaiQingIdc';
	}
	var ids = '';
	var names = '';
	var duixiangIds = $(table).datagrid('getRows');
	for (var i = 0; i < duixiangIds.length; i++) {
		ids += duixiangIds[i].UserId;
		names += duixiangIds[i].UserName;
		if (i != duixiangIds.length - 1) {
			ids += ',';
			names += ',';
		}
	}
	var zaiqingId = $(zaiQingid).val();
	if (plan == 'creat') {
		url = 'zaiQingId=' + zaiqingId + '&diaoPaiDuiXiangIds=' + ids;
	} else {
		url = "msgType=null&users=" + names + '&zaiQingId=' + zaiqingId;
	}
	return url;
}

function saveZaiQing() {
	var ids = '';
	var duixiangIds = $('#creatuserTable').datagrid('getRows');
	for (var i = 0; i < duixiangIds.length; i++) {
		ids += duixiangIds[i].UserId;
		if (i != duixiangIds.length - 1) {
			ids += ',';
		}
	}
	var updateurl = 'zaiQingId=' + $("#creatzaiQingIdc").val() +
		'&zaiQingName=' + $("#creatzaiQingNamec").val() +
		'&phoneNumber=' + $("#creatphoneNumberc").val() +
		'&keyUnitName=' + $("#creatKeyUnitName").val() +
		'&address=' + $("#creataddressc").val() +
		'&status=' + $("#creattaskStatusInput").val() +
		'&description=' + $("#creatdescriptionc").val() +
		'&endTime=' + $("#creattaskEndTimeInput").datetimebox('getValue') + '&diaoPaiDuiXiangIds=' + ids;
	$.ajax({
		type: "post",
		url: "/zaiQing/save",
		data: updateurl,
		success: function(msg) {
			if (msg.code == 200) {
				Dialog.close();
				getZaiQingInfo(pageNumber, pageSize);
			} else if (msg.code == 404) {
				$.messager.alert('警告', msg.msg, 'error');
			} else {
				openAlert("修改失败", 300, 100);
			}
		}
	});
}

function sendMsg() {
	$.ajax({
		type: "post",
		url: "/ZaiQingDiaoPai/sendTypeMsg",
		data: creatUrl('send'),
		success: function(msg) {
			if (msg.code == 200) {
				Dialog.close();
			} else {
				openAlert("发送失败", 300, 100);
			}
		}
	});
}

function dateGridData(total, recs) {
	this.total = total;
	this.rows = recs;
}