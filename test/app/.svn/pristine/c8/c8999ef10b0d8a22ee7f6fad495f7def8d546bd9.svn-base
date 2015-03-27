var pageSize=20;


//  获取服务器数据，通过页码
function getCode(pageIndex,pageSize,category,name){		
	$.ajax({
		type:"post",
		url:"/syscode/read",
		data:"codeCategory="+category+"&codeDisplayName="+name+"&pageIndex="+pageIndex+"&pageSize="+pageSize+"",
		success:function(msg){	
			console.log(msg);		
			if(msg.code == 200){
				var xfCodes = [];
				for(var i=0;i<msg.data.length;i++){
					var	xfCode = new XfCode(msg.data[i]);
					xfCodes.push(xfCode);
				}
				//console.log(xfCodes);
				showCode(xfCodes,msg.total,pageIndex,pageSize,category,name);
				
				if($("#codeTypeSea").find("option").length == 0){
					initCodeType(msg.codeCategory);
				}
			}else{
				openAlert("获取服务器数据失败!",300,100);
			}
		}		
	});
}

function submitToCreateOrUpdate(){
	var codeId = encodeHTML($("#codeIdInput").val());
	var codeName = encodeHTML($("#codeNameInput").val());
	var codeCategory = encodeHTML($("#codeTypeInput").val());
	var description = encodeHTML($("#codeDescriptionInput").val());
	var updatedBy = getCookie("DisplayName");
	var createdBy = getCookie("DisplayName");	
	if(codeName == ""){
		openAlert("代码名称不能为空",300,100);
		return false;
	}
	if(description == ""){
		openAlert("代码简介不能为空",300,100);
		return false;
	}
	
	if(codeId == ""){
		//新增
		$.ajax({
			type:"post",
			url:"/syscode/save",
			data:"codeCategory="+codeCategory+"&codeDisplayName="+codeName+"&description="+description+"",
			success:function(msg){					
				if(msg.code == 200){				
					var row = new XfCode(msg.data);
					row.id = msg.data.id;
					$("#codeTable").datagrid("appendRow",row);
					Dialog.close();
				}else{
					console.log(msg);
					openAlert("新增失败!",300,100);
				}
			}
		});
	}else{
		//修改
		$.ajax({
			type:"post",
			url:"/syscode/save",
			data:"sysCodeId="+codeId+"&codeDisplayName="+codeName+"&codeCategory="+codeCategory+"&description="+description+"",
			success:function(msg){				
				console.log(msg);
				if(msg.code == 200){
					var row = $("#codeTable").datagrid("getSelected");
					var rowIndex = $("#codeTable").datagrid("getRowIndex",row);
					row.category = msg.data[0].CodeCategory;
					row.name = msg.data[0].CodeDisplayName;
					row.description = msg.data[0].Description;
					row.updatedBy = msg.data[0].UpdatedBy;
					row.updatedTime = msg.data[0].UpdatedTime;					
					$("#codeTable").datagrid("refreshRow",rowIndex);					
					Dialog.close();
				}else{
					console.log(msg);
					openAlert("修改失败!",300,100);
				}
			}
		});
	}	
}

function initCodeType(codeCategory){
	$("#codeTypeSea").empty();
	$("#codeTypeInput").empty();
	$("#codeTypeSea").append("<option value=''>--请选择--</option>");
	for(var i =0;i<codeCategory.length;i++){
		$("#codeTypeSea").append("<option value='"+codeCategory[i].CodeCategory+"'>"+codeCategory[i].CodeCategory+"</option>");
		$("#codeTypeInput").append("<option value='"+codeCategory[i].CodeCategory+"'>"+codeCategory[i].CodeCategory+"</option>");		
	}	
}

function showCode(xfCodes,total,pageIndex,pageSize,category,name){	
	//配置表格数据
	$('#codeTable').datagrid('loadData', xfCodes);
	$('#codeTable').datagrid('selectRow', 0);
	
	//配置分页样式
	var p = $('#codeTable').datagrid('getPager');  
	$(p).pagination({  
		pageSize: pageSize, 
		pageNumber:pageIndex,
		total:total,			
		pageList: [20,40,60,80], 		
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		onSelectPage:function(pageNumber,pageSize){
			getCode(pageNumber,pageSize,category,name);			
		},
		onRefresh:function(pageNumber,pageSize){
			getCode(pageNumber,pageSize,category,name);			
		}
	});
}

$("#createCode").click(function(){
	$("#codeIdInput").val("");		
	$("#codeNameInput").val("");
	$("#codeTypeInput").get(0).selectedIndex = 0;
	$("#codeDescriptionInput").val("");		
	open5("createOrUpdateDiv",300,150,"添加系统代码");	
});

$("#searchCode").click(function(){
	var category=$("#codeTypeSea").find("option:selected").val();
	var name=$.trim($("#codeNameSea").val());	
	getCode(1,pageSize,category,name);
});

$("#codeTypeSea").change(function(){
	$("#searchCode").click();	
});

$("#codeNameSea").keydown(function(event){
	if(event.keyCode == "13"){
		$("#searchCode").click();	
	}
});
	
$("#deleteCode").click(function(){
	var row = $("#codeTable").datagrid("getSelected");
	var rowIndex = $("#codeTable").datagrid("getRowIndex",row);
	Dialog.confirm('您确定要删除代码 <font color="red">'+row.name+'</font> 吗?',
	function(){
		$.ajax({
			type:"post",
			url:"/syscode/delete",
			data:"sysCodeId="+row.id,
			success:function(msg){
				if(msg.code == 200){
					$("#codeTable").datagrid("deleteRow",rowIndex);
				}else{
					openAlert("删除失败!",300,100);
				}
			}
		});
	}); 
});
	
$("#updateCode").click(function(){
	var row = $("#codeTable").datagrid("getSelected");
	if(row){
		$("#codeNameInput").val(row.name); 
		console.log(row.category);
		$("#codeTypeInput").val(row.category);
		$("#codeDescriptionInput").val(row.description);
		$("#codeIdInput").val(row.id);
		open5("createOrUpdateDiv",280,140,"修改系统代码");
	}
});

$(function(){
	toCheck('createCode', "/syscode/save");
	toCheck('updateCode', "/syscode/save");
	toCheck('deleteCode', "/syscode/delete");
	getCode(1,pageSize,"","");
	
});


// resource 实体
function XfCode(data){
	this.id=data.SysCodeId;
	if(data.SysCodeId == null){
		this.id="";
	}
	
	this.category=data.CodeCategory;
	if(data.CodeCategory == null){
		this.category="";
	}
	
	this.name=data.CodeDisplayName;
	if(data.CodeDisplayName == null){
		this.name="";
	}
	
	this.description=data.Description;
	if(data.Description == null){
		this.description="";
	}
	
	this.createdBy=data.CreatedBy;
	if(data.CreatedBy == null){
		this.createdBy="";
	}
	
	this.createdTime=data.CreatedTime;
	if(data.CreatedTime == null){
		this.createdTime="";
	}
	
	this.updatedBy=data.UpdatedBy;
	if(data.UpdatedBy == null){
		this.updatedBy="";
	}
	
	this.updatedTime=data.UpdatedTime;
	if(data.UpdatedTime == null){
		this.updatedTime="";
	}

}
