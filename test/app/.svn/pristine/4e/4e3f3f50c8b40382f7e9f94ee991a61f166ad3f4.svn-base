var pageSize=20;

//  获取服务器数据，通过页码
function getFileList(pageIndex,pageSize,type,name){		
	$.ajax({
		type:"post",
		url:"/content/read",
		data:"pageIndex="+pageIndex+"&pageSize="+pageSize+"&contentType="+type+"&contentName="+name,
		success:function(msg){
			if(msg.code == 200){
				var Contents = [];
				for(var i=0;i<msg.data.length;i++){
					var	content = new Content(msg.data[i]);
					Contents.push(content);
				}
				showFileList(Contents,msg.total,pageIndex,pageSize,type,name);	
			}
		}
	});
}

//初始化文件类型
function initContentType(){
	$.ajax({
		type:"post",
		url:"/xfcode/searchContentType",
		success:function(msg){
			if(msg.code == 200){
				var data = msg.data;
				$("#fileTypeSea").empty();
				$("#fileCategoryInput").empty();	
				$("#fileCategoryInputU").empty();
				
				$("#fileTypeSea").append("<option value=''>--请选择--</option>");				
				for(var i=0;i<data.length;i++){
					$("#fileTypeSea").append("<option value='"+data[i].CodeDisplayName+"'>"+data[i].CodeDisplayName+"</option>");
					$("#fileCategoryInput").append("<option value='"+data[i].CodeDisplayName+"'>"+data[i].CodeDisplayName+"</option>");
					$("#fileCategoryInputU").append("<option value='"+data[i].CodeDisplayName+"'>"+data[i].CodeDisplayName+"</option>");		
				}		
			}else{
				console.log(msg);
				openAlert("初始化数据失败，请检查服务器!",300,100);			
			}
		}
	});
}

//提交新增到服务器 --阻断
function submitAddFile(){
	var name = $("#fileNameInput").val();
	var version = $("#versionInput").val();
	var description = $("#descriptionInput").val();
	var file = $("#fileCover").val();
	var filef = $("#addFile").val();
	if(name == ""){
		openAlert("请填写文件名称!",300,100);
		return false;
	}	
	if(description == ""){
		openAlert("请填写文件简介!",300,100);
		return false;
	}
	if(file =="" || filef ==""){
		openAlert("请选择文件!",300,100);
		return false;
	}
	$("#createFileForm").submit();
}

//修改
function submitUpdateFile(){
	var id = encodeHTML($("#fileIdU").val());
	var name = encodeHTML($("#fileNameInputU").val());
	var type = $("#fileCategoryInputU").find("option:selected").val();
	var version = encodeHTML($("#versionInputU").val());
	var isActive = $("#isActiveInputU").find("option:selected").val();
	var description = encodeHTML($("#descriptionInputU").val());
	var updatedBy = getCookie("DisplayName");
	
	if(name == ""){
		openAlert("请填写文件名称!",300,100);
		return false;
	}	
	if(description == ""){
		openAlert("请填写文件简介!",300,100);
		return false;
	}
	$.ajax({
		type:"post",
		url:"/content/update",
		data:"contentId="+id+"&fileName="+name+"&contentType="+type+"&version="+version+"&Description="+description+"&isActive="+isActive+"&updatedBy="+updatedBy+"",
		success:function(msg){			
			if(msg.code == 200){
				var row = $('#fileTable').datagrid('getSelected');
				var rowIndex = $('#fileTable').datagrid('getRowIndex',row);
				row.name = msg.data[0].FileName;
				row.contentType = msg.data[0].ContentType;
				row.description = msg.data[0].Description;
				row.version = msg.data[0].Version;
				row.status = $("#isActiveInputU").find("option:selected").text();
				row.updatedBy = msg.data[0].UpdatedBy;
				row.updatedTime = msg.data[0].UpdatedTime;
				$('#fileTable').datagrid('refreshRow',rowIndex);			
			}else{
				console.log(msg);
				openAlert("提交修改失败!",300,100);
			}
			Dialog.close();
		}
	});
}

function showFileList(Contents,total,pageIndex,pageSize,type,name){
	//配置表格数据
	$('#fileTable').datagrid('loadData',Contents);
	$('#fileTable').datagrid('selectRow', 0);
	
	//配置分页样式
	var p = $('#fileTable').datagrid('getPager');  
	$(p).pagination({  
		pageSize: pageSize, 
		pageNumber:pageIndex,
		total:total,			
		pageList: [20,40,60,80], 		
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		onSelectPage:function(pageNumber,pageSize){
			getFileList(pageNumber,pageSize,type,name);			
		},
		onRefresh:function(pageNumber,pageSize){
			getFileList(pageNumber,pageSize,type,name);			
		}
	}); 
}

$("#createFile").click(function(){
	var createBy = getCookie("DisplayName");
	$("#createdBy").val(createBy);
	open5('fileCreateDiv',300,300,'添加新文件'); 
});

$("#downLoadFile").click(function(){
	var row = $("#fileTable").datagrid("getSelected");	
	window.open("/xfjwt/downloadcontent?contentId="+row.id,""+row.name+"下载");
});

$("#updateFile").click(function(){
	var row = $('#fileTable').datagrid('getSelected');	
	$("#fileIdU").val(row.id);
	$("#fileNameInputU").val(row.name);
	$("#fileCategoryInputU").val(row.contentType);
	$("#versionInputU").val(row.version);
	$("#isActiveInputU").val(row.isActive);
	$("#descriptionInputU").val(row.description);
	open5("fileUpdateDiv",300,270,"修改文件信息");
});

$("#deleteFile").click(function(){
	var row = $('#fileTable').datagrid('getSelected');
	var rowIndex = $('#fileTable').datagrid('getRowIndex',row);
	Dialog.confirm('您确认要删除文件<font color="red"> '+row.name+' </font>吗?',
    function(){
		$.ajax({
			type:"post",
			url:"/content/delete",
			data:"contentId="+row.id,
			success:function(msg){
				if(msg.code == 200){
					$('#fileTable').datagrid('deleteRow',rowIndex);					
				}else{
					console.log(msg);
					openAlert("提交删除失败!",300,100);
				}
			}
		});
	});	
});

$("#searchFile").click(function(){
	var type=$("#fileTypeSea").find("option:selected").val();
	var name=encodeHTML($("#fileNameSea").val());	
	getFileList(1,pageSize,type,name);
});

$("#fileTypeSea").change(function(){
	$("#searchFile").click();
});

$("#fileNameSea").keydown(function(event){
	if(event.keyCode == "13"){
		$("#searchFile").click();
	}	
});

$(function(){
	toCheck('createFile', "/Content/save");
	toCheck('updateFile', "/Content/save");
	toCheck('deleteFile', "/Content/delete");
	initContentType();
	getFileList(1,pageSize,"","");
	
});


// file 实体
function Content(data){
	this.id = data.ContentId;
	if(data.ContentId == null){
		this.id="";
	}
	
	this.name = $.trim(data.FileName); 
	if(data.FileName == null){
		this.name =""; 
	}
	
	this.contentType = $.trim(data.ContentType);
	if(data.ContentType == null){
		this.contentType="";
	}
	
	this.description = $.trim(data.Description);
	if(data.Description == null){
		this.description="";
	}
	
	this.filePath = data.FilePath;
	if(data.FilePath == null){
		this.filePath = "";
	}
	
	this.version= $.trim(data.Version);
	if(data.Version == null){
		this.version = "";
	}
	
	this.isActive = data.IsActive;
	if(data.IsActive == null){
		this.isActive ="";
	}
	this.status = "不可用";
	if(data.IsActive == 0){
		this.status = "不可用";
	}else{
		this.status = "可用";
	}
	
	this.downloadUrl = data.DownloadUrl;
	if(data.DownloadUrl == null){
		this.downloadUrl ="";
	}
	
	this.createBy=data.CreatedBy;
	if(data.CreatedBy == null){
		this.createBy="";
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
