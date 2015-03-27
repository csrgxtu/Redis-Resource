var pageSize=20;

//  获取服务器数据，通过页码
function getOrganization(pageIndex,pageSize,zongdui,zhidui){	
	var data = "pageIndex="+pageIndex+"&pageSize="+pageSize+"&level1Name="+zongdui+"&level2Name="+zhidui+"";
	$.ajax({
		type:"post",
		url:"/organization/read",
		data:data,
		success:function(msg){		
			console.log(msg);			
			if(msg.code == 200){
				var organizations=[];
				var data=msg.data;
				var total=msg.total;
				for(var i=0;i<data.length;i++){
					var organization=new Organizaiton(data[i]);
					organizations.push(organization);
				}				
				showResource(organizations,total,pageIndex,pageSize,zongdui,zhidui);
			}else{
				openAlert("获取服务器数据失败!",300,100);
		  }
		}
	});
}

//获取组织树形结构
function getOrgnizationTree(){
	$.ajax({
		type:'post',
		url:'/organization/readorgtree',
		success:function(msg){
			if(msg.code == 200){
				var data = msg.data;			
				$("#organizationTree").tree("loadData",data);
				var root = $("#organizationTree").tree("getRoot");	
				$("#organizationTree").tree("select",root.target);
			}
		}	
	});
}

function getLevel1(){
	$.ajax({
		type:"post",
		url:"/organization/getLevel1",		
		success:function(msg){			
			if(msg.code == 200){
				$("#zongduiSea").empty();
				$("#zongduiSea").append("<option value=''>--请选择--</option>");
				var data = msg.data;
				for(var i=0;i<data.length;i++){
					$("#zongduiSea").append("<option value='"+data[i].Level1Name+"'>"+data[i].Level1Name+"</option>");
				}				
			}else{
				openAlert("初始化数据失败",300,100);
			}
		}
	})		
}

function getLevel2(){
	$.ajax({
		type:"post",
		url:"/organization/getLevel2",		
		success:function(msg){			
			if(msg.code == 200){
				$("#zhiduiSea").empty();
				$("#zhiduiSea").append("<option value=''>--请选择--</option>");
				var data = msg.data;
				for(var i=0;i<data.length;i++){
					$("#zhiduiSea").append("<option value='"+data[i].Level2Name+"'>"+data[i].Level2Name+"</option>");
				}
				
			}else{
				openAlert("初始化数据失败",300,100);
			}
		}
	})		
}

$("#organizationTree").tree({
	onSelect:function(node){
		var rows = $("#organizationTable").datagrid("getData").rows;		
		for(var i=0;i<rows.length;i++){						
			if(rows[i].dadui == node.text){
				$("#organizationTable").datagrid("selectRow",i)
				break;
			}
		}		
	}
});

//修改  或 新增
function submitOrganizationSaveOrUpdate(){
	var id = encodeHTML($("#organizationId").val());
	var zongdui = encodeHTML($("#zongduiInput").val());
	var zhidui = encodeHTML($("#zhiduiInput").val());
	var dadui = encodeHTML($("#daduiInput").val());
	var lon = encodeHTML($("#lonInput").val());
	var lat = encodeHTML($("#latInput").val());
	
	var createdBy = getCookie("DisplayName");
	var updatedBy = getCookie("DisplayName");
	
	if(zongdui == ""){
		openAlert("总队不能为空",300,100);
		return false;
	}
	if(zhidui == ""){
		openAlert("支队不能为空",300,100);
		return false;
	}
	if(dadui == ""){
		openAlert("大队不能为空",300,100);
		return false;
	}
	
	if(id == ""){
		//新增
		$.ajax({
			type:"post",
			url:"/organization/create",
			data:"level1Name="+zongdui+"&level2Name="+zhidui+"&level3Name="+dadui+"&createdBy="+createdBy+"&lat="+lat+"&lon="+lon+"",
			success:function(msg){				
				if(msg.code == 200){
					var row = new Organizaiton(msg.data);
					$("#organizationTable").datagrid("appendRow",row);					
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
			url:"/organization/update",
			data:"organizationId="+id+"&level1Name="+zongdui+"&level2Name="+zhidui+"&level3Name="+dadui+"&updatedBy="+updatedBy+"&lat="+lat+"&lon="+lon+"",
			success:function(msg){
				if(msg.code == 200){
					console.log(msg);
					var row = $("#organizationTable").datagrid("getSelected");
					var rowIndex = $("#organizationTable").datagrid("getRowIndex",row);
					row.zongdui = msg.data[0].Level1Name;
					row.zhidui = msg.data[0].Level2Name;
					row.dadui = msg.data[0].Level3Name;
					row.lat = msg.data[0].Lat;
					row.lon = msg.data[0].Lon;
					row.updatedBy = msg.data[0].UpdatedBy;
					row.updatedTime = msg.data[0].UpdatedTime;
					$("#organizationTable").datagrid("refreshRow",rowIndex);
					Dialog.close();
				}else{
					console.log(msg);
					openAlert("修改失败!",300,100);
				}
			}
		});
	}	
};

function showResource(organizations,total,pageIndex,pageSize,zongdui,zhidui,zhongdui){
	$("#organizationTable").datagrid("loadData",organizations);
	$('#organizationTable').datagrid('selectRow', 0);
	
	//配置分页样式
	var p = $('#organizationTable').datagrid('getPager');  
	$(p).pagination({  
		pageSize: pageSize, 
		pageNumber:pageIndex,
		total:total,			
		pageList: [20,40,60,80], 		
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		onSelectPage:function(pageNumber,pageSize){
			getOrganization(pageNumber,pageSize,zongdui,zhidui);			
		},
		onRefresh:function(pageNumber,pageSize){
			getOrganization(pageNumber,pageSize,zongdui,zhidui);			
		}
	}); 
}

$("#searchOrganization").click(function(){
	var zongdui = $("#zongduiSea").find("option:selected").val();
	var zhidui = $("#zhiduiSea").find("option:selected").val();	
	getOrganization(1,pageSize,zongdui,zhidui);
});

$("#zongduiSea").change(function(){
	$("#searchOrganization").click();
});

$("#zhiduiSea").change(function(){
	$("#searchOrganization").click();
});

$("#daduiSea").change(function(){
	$("#searchOrganization").click();
});

$("#createOrganization").click(function(){
	$("#organizationId").val("");
	$("#zongduiInput").val("");
	$("#zhiduiInput").val("");
	$("#daduiInput").val("");
	$("#lonInput").val("");
	$("#latInput").val("");
	open5("organizationDiv",300,220,"新增组织架构信息");	
});

$("#updateOrganization").click(function(){
	var row = $("#organizationTable").datagrid("getSelected");
	$("#organizationId").val(row.id);
	$("#zongduiInput").val(row.zongdui);
	$("#zhiduiInput").val(row.zhidui);
	$("#daduiInput").val(row.dadui);
	$("#lonInput").val(row.lon);
	$("#latInput").val(row.lat);
	open5("organizationDiv",300,220,"修改组织架构信息");
});

$("#deleteOrganization").click(function(){
	var row = $("#organizationTable").datagrid("getSelected");
	var rowIndex = $("#organizationTable").datagrid("getRowIndex",row);
	Dialog.confirm('您确认要删除组织<font color="red"> '+row.dadui+' </font>吗?',
	function(){
		$.ajax({
			type:"post",
			url:"/organization/delete",
			data:"organizationId="+row.id,
			success:function(msg){
				if(msg.code == 200){
					$("#organizationTable").datagrid("deleteRow",rowIndex);					
				}else{
					console.log(msg);
					openAlert("删除失败!",300,100);
				}
			}
		})
	});
});

$(function(){
	getLevel1();
	getLevel2();
	getOrganization(1,pageSize,"","");
	getOrgnizationTree();
});

// resource 实体
function Organizaiton(data){
	this.id=data.OrganizationId;
	this.zongdui=data.Level1Name;
	this.zhidui=data.Level2Name;
	this.dadui=data.Level3Name;
	this.zhongdui=data.Level4Name;
	this.lat=data.Level4GisLat;
	this.lon=data.Level4GisLon;
	this.createdBy=data.CreatedBy;
	this.createdTime=data.CreatedTime;
	this.updatedBy=data.UpdatedBy;
	this.updatedTime=data.UpdatedTime;
	
	if(data.OrganizationId == null){
		this.id="";
	}
	if(data.Level1Name == null){
		this.zongdui="";
	}
	if(data.Level2Name == null){
		this.zhidui="";
	}
	if(data.Level3Name == null){
		this.dadui="";
	}
	if(data.Lat == null){
		this.lat="";
	}
	if(data.Lon == null){
		this.lon="";
	}
	if(data.CreatedBy == null){
		this.createdBy="";
	}
	if(data.CreatedTime == null){
		this.createdTime="";
	}
	if(data.UpdatedBy == null){
		this.updatedBy="";
	}
	if(data.UpdatedTime == null){
		this.updatedTime="";
	}
	
}
