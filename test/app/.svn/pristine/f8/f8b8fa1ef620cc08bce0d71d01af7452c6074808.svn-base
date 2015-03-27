var pageSize = 20;
var pageNumber = 1;
$(function() {
	initDataGrid();
	getCronTaskList(pageNumber, pageSize);
	toCheck('createCronTask', '/CronTask/create');
	toCheck('updateCronTask', '/CronTask/update');
	toCheck('deleteCronTask', '/CronTask/delete');
});

function initDataGrid() {
	$('#dg').datagrid({
		fit: true,
		fitColumns: true,
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
		title: '后台任务管理列表',
		pageSize: 20,
		pageNumber: 1,
		pageList: [20, 40, 60, 80],
		loadMsg: '正在加载数据，请稍等...',
		columns: [
			[{
				field: 'TaskName',
				title: '任务名',
				width: 70,halign: 'center',
				sortable: true
			}, {
				field: 'JGMC',
				title: '机构名称',
				width: 70,halign: 'center',
				sortable: true
			}, {
				field: 'UserName',
				title: '创建人',halign: 'center',
				width: 50,
				sortable: true
			}, {
				field: 'CreatedTime',
				title: '创建时间',halign: 'center',
				width: 80,
				sortable: true
			}, {
				field: 'Task',halign: 'center',
				title: '任务计划',
				width: 300,
				sortable: true
			}, {
				field: '操作',
				title: '操作',halign: 'center',
				width: 80,
				sortable: true,
				formatter: function(value, row, index) {
					return '<a name="btn" onclick="checkDeatil(' + row.CronTaskId + ')">执行记录</a>';
				}
			}]
		],
		onDblClickRow:function(rowIndex, rowData){
			checkDeatil(rowData.CronTaskId);
		}
	});
	var p = $('#dg').datagrid('getPager');
	$(p).pagination({
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function(pageNumber, pageSize) {
			getCronTaskList(pageNumber, pageSize);
		}
	});
	initDialog("addCronTask", 400, 230, "添加新任务");
	initDialog("cronTaskDetails", 700, 500, "任务执行记录");
}

function initDataDetails() {
	$('#dataDetails').datagrid({
		fit: true,
		fitColumns: true,
		collapsible: false,
		remoteSort: false,
		multiSort: true,
		striped: true,
		rownumbers: true,
		singleSelect: true,
		autoRowHeight: true,
		pagination: true,
		url: null,
		pageSize: 8,
		pageNumber: 1,
		pageList: [8, 16, 32, 64],
		loadMsg: '正在加载数据，请稍等...',
		columns: [
			[{
				field: 'DataEndTime',
				title: '最近一次执行记录',
				width: 70,halign: 'center',
				sortable: true
			}, {
				field: 'CompletedTime',
				title: '最近执行完成时间',
				width: 70,halign: 'center',
				sortable: true
			}, {
				field: 'Message',
				title: '记录信息',
				width: 70,halign: 'center',
				sortable: true
			}, {
				field: 'AffectedRecords',
				title: '数据记录条数',
				width: 70,halign: 'center',
				sortable: true
			}, {
				field: 'CreatedTime',
				title: '任务创建时间',halign: 'center',
				width: 70,
				sortable: true
			}]
		]
	});
	var p = $('#dataDetails').datagrid('getPager');
	$(p).pagination({
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function(detailspageNumber, detailspageSize) {
			getCronTaskDetailsList(detailspageNumber, detailspageSize);
		}
	});
}

function getCronTaskDetailsList(detailspageNumber, detailspageSize) {
	$.ajax({
		type: 'post',
		url: '/CronTask/history',
		data: "cronTaskId="+detailsId+"&pageIndex=" + detailspageNumber + "&pageSize=" + detailspageSize,
		success: function(msg) {
			if (msg.code == 200) {
				$('#dataDetails').datagrid('loadData', new dateGridData(msg.data.total, msg.data.recs));
			}
		}
	});
}
var detailsId=null;
var detailspageNumber=1;
var detailspageSize=8;
function checkDeatil(id) {
	detailsId=id;
	$('#cronTaskDetails').dialog('open');
	initDataDetails();
	getCronTaskDetailsList(detailspageNumber, detailspageSize);
}

function initDialog(id, width, height, title) {
	$('#' + id).dialog({
		title: title,
		width: width,
		height: height,
		closed: true,
		cache: false,
		modal: true
	});
}

function getCronTaskList(pageNumber, pageSize) {
	$.ajax({
		type: 'post',
		url: '/CronTask/read',
		data: "pageIndex=" + pageNumber + "&pageSize=" + pageSize,
		success: function(msg) {
			if (msg.code == 200) {
				$('#dg').datagrid('loadData', new dateGridData(msg.data.total, msg.data.recs));
			}
		}
	});
}

function dateGridData(total, recs) {
	this.total = total;
	this.rows = recs;
}

function testMinMax(id, min, max, title) {
	var value = $('#' + id).val();
	if (value != null && value != '') {
		if (value == '*') {
			return true;
		} else {
			if (!isNaN(value) && value.indexOf('.') == -1 && value >= min && value <= max) {
				return true;
			} else if (value.indexOf('/')) {
				var vals = value.split('/');
				if (vals[1] != null && vals[1] != 0 && vals[1] != '' && !isNaN(vals[1]) && vals[1].indexOf('.') == -1) {
					return true;
				}
			}
		}
	}
	$.messager.alert('警告', title + '错误，请重新填写', 'error');
	$('#' + id).val('*');
	$('#' + id).focus();
	return false;
}

function addCronTask() {
	var addCronTaskTimeMin = $('#addCronTaskTimeMin').val();
	var addCronTaskTimeHour = $('#addCronTaskTimeHour').val();
	var addCronTaskTimeDom = $('#addCronTaskTimeDom').val();
	var addCronTaskTimeMon = $('#addCronTaskTimeMon').val();
	var addCronTaskTimeDow = $('#addCronTaskTimeDow').val();
	var addCronTaskName = $('#addCronTaskName').val();
	var addCronTaskURL = $('#addCronTaskURL').val();
	$.ajax({
		type: 'get',
		url: '/CronTask/create',
		data: "min=" + addCronTaskTimeMin + "&hour=" + addCronTaskTimeHour + "&dom=" + addCronTaskTimeDom + "&mon=" + addCronTaskTimeMon + "&dow=" + addCronTaskTimeDow + "&url=" + addCronTaskURL + "&taskName=" + addCronTaskName,
		success: function(msg) {
			if (msg.code != 200) {
				$.messager.alert('警告', '添加失败，请重新再试！', 'error');
			}
			$('#addCronTask').dialog('close');
		}
	});
	getCronTaskList(pageNumber, pageSize);
}

function updateCronTask() {
	var addCronTaskCronTaskId = $('#dg').datagrid('getSelected').CronTaskId;
	var addCronTaskTimeMin = $('#addCronTaskTimeMin').val();
	var addCronTaskTimeHour = $('#addCronTaskTimeHour').val();
	var addCronTaskTimeDom = $('#addCronTaskTimeDom').val();
	var addCronTaskTimeMon = $('#addCronTaskTimeMon').val();
	var addCronTaskTimeDow = $('#addCronTaskTimeDow').val();
	var addCronTaskURL = $('#addCronTaskURL').val();
	var addCronTaskName = $('#addCronTaskName').val();
	$.ajax({
		type: 'get',
		url: '/CronTask/update',
		data: "cronTaskId=" + addCronTaskCronTaskId + "&taskName=" + addCronTaskName + "&min=" + addCronTaskTimeMin + "&hour=" + addCronTaskTimeHour + "&dom=" + addCronTaskTimeDom + "&mon=" + addCronTaskTimeMon + "&dow=" + addCronTaskTimeDow + "&url=" + addCronTaskURL,
		success: function(msg) {
			if (msg.code != 200) {
				$.messager.alert('警告', '修改失败，请重新再试！', 'error');
			}
			$('#addCronTask').dialog('close');
		}
	});
	getCronTaskList(pageNumber, pageSize);
}

function deleteCronTask() {
	var addCronTaskCronTaskId = $('#dg').datagrid('getSelected').CronTaskId;
	$.ajax({
		type: 'get',
		url: '/CronTask/delete',
		data: "cronTaskId=" + addCronTaskCronTaskId,
		success: function(msg) {
			if (msg.code != 200) {
				$.messager.alert('警告', '删除失败，请重新再试！', 'error');
			}
			$('#addCronTask').dialog('close');
		}
	});
	getCronTaskList(pageNumber, pageSize);
}

$("#saveUserBtn").click(function() {
	if (testMinMax('addCronTaskTimeMin', 0, 59, '分钟') && testMinMax('addCronTaskTimeHour', 0, 23, '小时') && testMinMax('addCronTaskTimeDom', 1, 31, '天') && testMinMax('addCronTaskTimeMon', 1, 12, '月') && testMinMax('addCronTaskTimeDow', 0, 6, '星期')) {
		var addCronTaskName = $('#addCronTaskName').val();
		if (addCronTaskName != null && addCronTaskName != '') {
			var value = $('#addCronTaskURL').val();
			if (value != null && value != '' && value != '/') {
				if ($('#addCronTaskHidden').val() == 'save') {
					addCronTask();
				} else {
					updateCronTask();
				}
			} else {
				$.messager.alert('警告', '任务URL错误，请重新填写', 'error');
				$('#addCronTaskURL').focus();
			}
		} else {
			$.messager.alert('警告', '任务名填写错误，请重新填写', 'error');
			$('#addCronTaskName').focus();
		}
	}
});

$("#createCronTask").click(function() {
	initDialog("addCronTask", 400, 200, "添加新任务");
	$('#addCronTaskTimeMin').val('*');
	$('#addCronTaskTimeHour').val('*');
	$('#addCronTaskTimeDom').val('*');
	$('#addCronTaskTimeMon').val('*');
	$('#addCronTaskTimeDow').val('*');
	$('#addCronTaskURL').val('/');

	$('#addCronTaskHidden').val('save');
	$('#addCronTask').dialog('open');
});
$("#closeAddCronTask").click(function() {
	$('#addCronTask').dialog('close');
});

$("#updateCronTask").click(function() {
	var addCronTaskCronTask = $('#dg').datagrid('getSelected');
	if (addCronTaskCronTask == null) {
		$.messager.alert('警告', '请选择需要修改的行！', 'error');
		return;
	}
	initDialog("addCronTask", 400, 200, "修改任务");
	$('#addCronTaskTimeMin').val('*');
	$('#addCronTaskTimeHour').val('*');
	$('#addCronTaskTimeDom').val('*');
	$('#addCronTaskTimeMon').val('*');
	$('#addCronTaskTimeDow').val('*');
	$('#addCronTaskURL').val('/');
	$('#addCronTaskHidden').val('update');
	$('#addCronTask').dialog('open');
});
$("#closeAddCronTask").click(function() {
	$('#addCronTask').dialog('close');
});

$("#deleteCronTask").click(function() {
	var addCronTaskCronTask = $('#dg').datagrid('getSelected');
	if (addCronTaskCronTask == null) {
		$.messager.alert('警告', '请选择需要删除的行！', 'error');
		return;
	}
	$.messager.confirm('确认对话框', '您确定要删除任务号为："' + addCronTaskCronTask.CronTaskId + '"的任务吗？', function(r) {
		if (r) {
			deleteCronTask();
		}
	});
});