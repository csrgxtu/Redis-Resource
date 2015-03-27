var pageSize=20;

//  获取服务器数据，通过页码
function getResource(pageIndex,pageSize,module,resourceName){	
	$.ajax({
		type:"post",
		url:"/resource/read",
		data:"pageIndex="+pageIndex+"&pageSize="+pageSize+"&moduleName="+module+"&resourceName="+resourceName+"",
		success:function(msg){			
			if(msg.code == 200){
				var resources=[];
				var data=msg.data.recs;
				var total=msg.data.total;				
				for(var i=0;i<data.length;i++){
					var resource=new Resource(data[i]);
					resources.push(resource);
				}
				showResource(total,resources,pageIndex,pageSize,module,resourceName);				
				
			}else{
				openAlert("获取服务器数据失败!",300,100);
			}
		}
	});
}
//get module option
function resourceModule(){
	$.ajax({
		type: 'post',
		url: '/syscode/read',
		data: "pageIndex=1&pageSize=1000&codeCategory=资源模块类别",
		success: function(msg){
			console.log(msg);
			if(msg.code == 200){
				if($("#resourceModuleSea").find("option").length == 0){
					initResourceModule(msg.data);
				}	
			}else{
				openAlert("获取服务器数据失败!",300,100);
			}
		}
	})
}
//提交修改和新增
function  submitToSaveOrUpdate(){
	var id = encodeHTML($("#idInput").val());
	var name = encodeHTML($("#nameInput").val());
	var url = encodeHTML($("#urlInput").val());		
	var module = $("#moduleInput").find("option:selected").text();	
	var user = getCookie("DisplayName");
	
	if(name == ""){
		return false;
		openAlert("代码名称不能为空",300,100);
	}
	if(url == ""){
		return false;
		openAlert("路径不能为空",300,100);
	}
	//提交新增
	if(id == ""){
		$.ajax({
			type:"post",
			url:"/resource/save",
			data:"resourceName="+name+"&resourceUrl="+url+"&moduleName="+module+"",
			success:function(msg){				
				var day = new Date();
				var dayStr = day.Format("yyyy-MM-dd HH:mm:ss");
				if(msg.code == 200){					
					row = {'id':''+msg.data.id+'','name':''+name+'','url':''+url+'','Module':''+module+'','createdBy':''+user+'','createdTime':''+msg.data.CreatedTime+''};
					$("#resourceTable").datagrid("appendRow",row);
					Dialog.close();
				}else{
					console.log(msg);
					openAlert("新增失败!",300,100);
				}
			}
		});
	}else{
		//提交修改	
		$.ajax({
			type:"post",
			url:"/resource/save",
			data:"resourceId="+id+"&resourceName="+name+"&resourceUrl="+url+"&moduleName="+module+"",
			success:function(msg){				
				if(msg.code == 200){
					var row = $("#resourceTable").datagrid("getSelected");
					var rowIndex = $("#resourceTable").datagrid("getRowIndex",row);	
					var day = new Date();
					var dayStr = day.Format("yyyy-MM-dd HH:mm:ss");
					row.name = name;
					row.url = url;					
					row.Module = module;
					row.updatedBy = user;
					row.updatedTime = dayStr;
					$('#resourceTable').datagrid('refreshRow',rowIndex,row);
					Dialog.close();
				}else{	
					console.log(msg);
					openAlert("修改失败!",300,100);
				}
			}
		});
	}
}

function initResourceModule(module){
	$("#moduleInput").empty();
	$("#resourceModuleSea").empty();
	$("#resourceModuleSea").append("<option value=''>--请选择--</option>");
	for(var i=0;i<module.length;i++){
		$("#resourceModuleSea").append("<option value='"+module[i].CodeDisplayName+"'>"+module[i].CodeDisplayName+"</option>");
		$("#moduleInput").append("<option value='"+module[i].CodeDisplayName+"'>"+module[i].CodeDisplayName+"</option>");
	}
}


//显示数据
function showResource(total,resources,pageIndex,pageSize,module,resourceName){
	$('#resourceTable').datagrid('loadData', resources);
	$('#resourceTable').datagrid('selectRow', 0);
	
	//配置分页样式
	var p = $('#resourceTable').datagrid('getPager');  
	
	$(p).pagination({  
		pageSize: pageSize, 
		pageNumber:pageIndex,
		total:total,			
		pageList: [20,40,60,80], 		
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		onSelectPage:function(pageNumber,pageSize){
			getResource(pageNumber,pageSize,module,resourceName);			
		},
		onRefresh:function(pageNumber,pageSize){
			getResource(pageNumber,pageSize,module,resourceName)			
		}
	}); 
}

$("#searchResource").click(function(){
	var module=$("#resourceModuleSea").find("option:selected").val();
	var resourceName=$("#resourceNameSea").val();	
	getResource(1,pageSize,module,resourceName);
});

$("#resourceModuleSea").change(function(){
	$("#searchResource").click();
});

$("#resourceNameSea").keydown(function(event){
	if(event.keyCode == "13"){
		$("#searchResource").click();
	}
});

$("#createResource").click(function(){
	
	$("#idInput").val("");
	$("#nameInput").val("");
	$("#urlInput").val("");		
	$("#moduleInput").val("");	
	
	open5("ResourceSaveOrUpdate",300,140,"添加资源");
});
	
$("#updateResource").click(function(){
	var row = $('#resourceTable').datagrid("getSelected");
	var rowIndex = $('#resourceTable').datagrid('getRowIndex',row);
	$("#idInput").val(row.id);
	$("#nameInput").val(row.name);
	$("#urlInput").val(row.url);		
	$("#moduleInput").val(row.Module);	
	open5("ResourceSaveOrUpdate",300,140,"修改资源信息");		
});

$("#deleteResource").click(function(){
	var row = $('#resourceTable').datagrid("getSelected");
	var rowIndex = $('#resourceTable').datagrid('getRowIndex',row);
	
	Dialog.confirm('您确认要删除资源<font color="red"> '+row.name+' </font>吗?',
	function(){
		$.ajax({
			type:"post",
			url:"/resource/delete",
			data:"resourceId="+row.id,
			success:function(msg){
				if(msg.code == 200){
					$("#resourceTable").datagrid("deleteRow",rowIndex);
					
				}else{
					openAlert("删除失败!",300,100);
				}
			}
		});			
	});
	
});

$(function(){
	toCheck('createResource', "/resource/save");
	toCheck('updateResource', "/resource/save");
	toCheck('deleteResource', "/resource/delete");
	getResource(1,pageSize,"","");
	resourceModule();
});

// resource 实体
function Resource(data){
	this.id=data.ResourceId;
	this.name=data.ResourceName;
	this.url=data.ResourceUrl;
	this.createdBy=data.CreatedBy;
	this.createdTime=data.CreatedTime;
	this.updatedBy=data.UpdatedBy;
	this.updatedTime=data.UpdatedTime;
	this.Module = data.ModuleName;
	
	if(data.ResourceId == null){
		this.id=" ";
	}
	if(data.ResourceName == null){
		this.name=" ";
	}
	if(data.ResourceUrl == null){
		this.url=" ";
	}
	if(data.CreatedBy == null){
		this.createBy=" ";
	}
	if(data.CreatedTime == null){
		this.CreatedTime=" ";
	}
	if(data.UpdatedBy == null){
		this.updatedBy=" ";
	}
	if(data.UpdatedTime == null){
		this.updatedTime=" ";
	}
	if(data.Module = null){
		this.Module = "";
	}
	
}
