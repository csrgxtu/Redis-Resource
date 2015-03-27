var pageSize = 20;
var pageNumber = 1;
$(function() {
	initDataGrid();
	getLoglist(pageNumber,pageSize);
});

function initDataGrid() {
	$('#dg').datagrid({
		fit:true,
		fitColumns: true,
		collapsible:false,
		remoteSort:false,
		multiSort:true,
		striped:true,
		singleSelect: true,
		autoRowHeight: true,
		pagination: true,
		url: null,
		toolbar:'#toolbar',
		title:'日志管理列表',
		pageSize : 20,
		pageNumber : 1,
		pageList: [20,40,60,80],
		loadMsg:'正在加载数据，请稍等...',
		columns: [
			[{
				field: 'UserName',
				title: '操作人员',
				width: 100,halign: 'center',
				sortable:true
			},{
				field: 'JGMC',
				title: '人员所属',halign: 'center',
				width: 200,
				sortable:true
			},{
				field: 'ResourceName',
				title: '操作项',halign: 'center',
				width: 200,
				sortable:true,
				formatter: function(value, row, index) {
					return '<font color="red">'+row.ModuleName+'</font>----><font color="red">'+row.ResourceName+'</font>';
				}
			},{
				field: 'OperationTypeCode',
				title: '操作类型',halign: 'center',
				width: 100,
				sortable:true
			},{
				field: 'Params',
				title: '记录说明',halign: 'center',
				width: 150,
				sortable:true
			},{
				field: 'CreatedTime',
				title: '操作时间',halign: 'center',
				width: 120,
				sortable:true
			}]
		]
	});
	var p = $('#dg').datagrid('getPager');
	$(p).pagination({  
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		onSelectPage:function(pageNumber,pageSize){
			getLoglist(pageNumber,pageSize);
		}
	}); 
}


function getLoglist(pageNumber,pageSize){
	$.ajax( {
		type : 'post',
		url : '/SystemLog/read',
		data : "pageIndex="+pageNumber+"&pageSize="+pageSize,
		success : function(msg) {
			if(msg.code == 200){
				$('#dg').datagrid('loadData',new dateGridData(msg.data.total,msg.data.recs));
			}	
		}
	});
}

function dateGridData(total,recs){
	this.total=total;
	this.rows=recs;
}