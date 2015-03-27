var pageSize = 20;

function getImgListInfo(pageIndex,pageSize,taskName,imgType){
	$.ajax({
		type:"post",
		url:"/xfImage/read",
		data:"pageIndex="+pageIndex+"&pageSize="+pageSize+"&zaiQingName="+taskName+"&imageType="+imgType+"",
		success:function(msg){			
			if(msg.code == 200){
				var imgs = [];
				for(var i=0;i<msg.data.length;i++){
					var img = new ImgDeploy(msg.data[i]);
					imgs.push(img);
				}
				showImageList(imgs,msg.total,pageIndex,pageSize,taskName,imgType);
			}else{
				console.log(msg);
				openAlert("获取服务器数据失败1",300,100);
			}
		}
	});
}

function initImgType(){
	$.ajax({
		type:'post',
		url:'/xfimage/getImageTypes',		
		success:function(msg){
			if(msg.code == 200){
				$("#imgTypeSea").empty();
				$("#imgTypeSea").append("<option value=''>--请选择--</option>");
				for(var i =0;i<msg.data.length;i++){
					$("#imgTypeSea").append("<option value='"+msg.data[i].CodeDisplayName+"'>"+msg.data[i].CodeDisplayName+"</option>");
				}
			}else{
				console.log(msg);
				openAlert("初始化图片类型失败",300,100);
			}
		}
	})
}

function showImageInfo(row){
	$("#imgUrl").attr("src",row.url);
	
	var rows = [];
	rows.push(row);
	$("#imgInfoTable").datagrid("loadData",rows);
}

function showImageList(imgs,total,pageIndex,pageSize,taskName,imgType){
	//配置表格数据
	$('#imgListTable').datagrid('loadData', imgs);
	$('#imgListTable').datagrid('selectRow', 0);
	
	
	
	//配置分页样式
	var p = $('#imgListTable').datagrid('getPager');  
	$(p).pagination({  
		pageSize: pageSize, 
		pageNumber:pageIndex,
		total:total,			
		pageList: [20,40,60,80], 		
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		onSelectPage:function(pageNumber,pageSize){
			getImgListInfo(pageNumber,pageSize,taskName,imgType)
		},
		onRefresh:function(pageNumber,pageSize){
			getImgListInfo(pageNumber,pageSize,taskName,imgType)
		}
	}); 
}

$('#imgListTable').datagrid({
	onSelect:function(rowIndex,row){
		showImageInfo(row);
	}
});

$("#searchImg").click(function(){
	var taskName = $("#taskNameSea").val();
	var imgType = $("#imgTypeSea").find("option:selected").val();
	
	getImgListInfo(1,pageSize,taskName,imgType);
})

$("#imgA").click(function(){
	openDeployImg("部署图查看",$("#imgUrl").attr("src"));
})

$("#taskNameSea").keydown(function(){
	if(event.keyCode == '13'){
		$("#searchImg").click();
	}
})

$("#imgTypeSea").change(function(){
	$("#searchImg").click();
})

$(function(){
	initImgType();	
	getImgListInfo(1,pageSize,"","");
})


function ImgDeploy(data){
	this.xfImagesId = data.XfImagesId;
	this.taskName = data.ZaiQingName;
	this.imageType = data.ImageType;
	this.category = data.Category;
	this.url = data.Url;
	this.address = data.Address;
	this.lat = data.BaiduLat;
	this.lon = data.BaiduLon;
	this.createdBy = data.CreatedBy;
	var date = toDate(data.CreatedTime);
	var dateStr= date.Format("yy/MM/dd HH:mm");
	this.createdTime = dateStr;
	this.updatedBy = data.UpdatedBy;
	this.updatedTime = data.UpdatedTime;	
}