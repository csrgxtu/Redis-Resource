$(function(){
	toCheck('updateVideo', '/xfvideoInfo/update');
	toCheck('deleteVideo', '/xfvideoInfo/delete');
	toCheck('downloadVideo', '/xfvideoInfo/downloadvideo');
});

pageSize = 20;
tasks='adf';
function getVideoType(){
  $.ajax({
        type:"post",
        url:"/sysCode/read",
        data:"pageIndex=1&pageSize=100&codeCategory=视频类别",
        success:function(msg){
          //console.log(msg);
          var data = msg.data;
          if(msg.code == 200){
             $("#videoType").empty();
             $("#videoType").append("<option value=''>-- 请选择 --</option>");
             for(var i = 0;i < data.length;i++){
                $("#videoType").append("<option value='"+data[i].CodeDisplayName+"'>"+data[i].CodeDisplayName+"</option>");
                $("#updateVideoType").append("<option value='"+data[i].CodeDisplayName+"'>"+data[i].CodeDisplayName+"</option>");
             }
           }                
        }
    });
}
function getJGInfo(){
      $.ajax({
        type:"post",
        url:"/organization/readOrgTree",
        data:"pageIndex=1&pageSize=100",
        success:function(msg){                
          var data=msg.organization;
          //console.log(data);
          $("#JGInfo").empty();
          $("#JGInfo").append("<option value=''>-- 请选择 --</option>");
          for(var i =0;i<data.length;i++){
            $("#JGInfo").append("<option value='"+data[i].ID+"'>"+data[i].JGJC+"</option>");     
          }     
        }
    });
}
function getVod(pageIndex,pageSize,organizationId,videoType,createdBy,startTime,endTime){
 var row = $('#dg').datagrid('getSelected');
 var rowIndex;
   $.ajax({
    url:'/xfvideoinfo/read',
    data:'pageIndex='+pageIndex+'&pageSize='+pageSize+'&organizationId='+organizationId+'&videoType='+videoType+''
        +'&userName='+createdBy+'&startTime='+startTime+'&endTime='+endTime,
    success:function(data){
      if(data.code == 200){
       // console.log(data);
        showVideoListInfo(data.data,data.total,pageIndex,pageSize,organizationId,videoType,createdBy,startTime,endTime);
      }
    }
  })
}
function showVideoListInfo(data,total,pageIndex,pageSize,organizationId,videoType,createdBy,startTime,endTime){
  $('#dg').datagrid('loadData', data);
  $('#dg').datagrid('selectRow', 0);
  var p = $('#dg').datagrid('getPager');  
  $(p).pagination({  
    pageSize: pageSize, 
    pageNumber:pageIndex,
    total:total,      
    pageList: [20,40,60,80],    
    beforePageText: '第',
    afterPageText: '页    共 {pages} 页',  
    displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
    onSelectPage:function(pageNumber,pageSize){
      getVod(pageNumber,pageSize,organizationId,videoType,createdBy,startTime,endTime);
    },
    onRefresh:function(pageNumber,pageSize){
      getVod(pageNumber,pageSize,organizationId,videoType,createdBy,startTime,endTime);
    }
  });
}
$(function(){
  getVideoType();
  getJGInfo();
  getVod(1,pageSize,'','','','','');
  var date =  new Date();
  var dateStr = date.Format("yyyy-MM-dd");
  var start = dateStr+" "+"00:00:00";
  var end = dateStr +" "+"23:59:59";
  $("#dg").datagrid({
     onDblClickRow:function(){
       var row = $('#dg').datagrid('getSelected');            
             console.log(row);
       if(row){
         window.open("/xfvideoinfo/videoVodEg?"+row.EncodedFileName+"&"+row.ZaiQingName+"&"+row.JGJC+"&"+row.DisplayName+"&"+row.BeginTime);
        }             
      }
   });
  $('#searchVideo').click(function(){
    var organizationId = $('#JGInfo').val();
    var videoType = $('#videoType').val();
    var createdBy = $('#displayName').val();
    var startTime = $('#startTime').datetimebox('getValue');
    var endTime = $('#endTime').datetimebox('getValue');
    getVod(1,pageSize,organizationId,videoType,createdBy,startTime,endTime);
  });
  $('#downloadVideo').click(function(){
    var row = $('#dg').datagrid('getSelected');
    var rowNum = $('#dg').datagrid('getRowIndex',row);
    if(row){
      window.open("/xfvideoinfo/downloadVideo?videoId="+row.VideoId,"下载");
    }
  })
  $("#updateVideo").click(function(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
      $("#updateVideoId").val(row.VideoId);
      $("#videoOrgUpdate").val(row.JGJC);
      $("#taskUpdate").val(row.ZaiQingName);
      $("#updateVideoType").val(row.VideoType);
      $("#videoAddress").val(row.Address);
      $("#videoDescription").val(row.Description);
      $("#createdByName").val(row.CreatedBy);
      open5("updateVideoTable",300,250,'修改视频信息');
    }
});
 $("#deleteVideo").click(function(){
        var row = $('#dg').datagrid('getSelected');
        var rowNum = $('#dg').datagrid('getRowIndex',row); 
        if(row){
        var xfVideoInfoId =  row.VideoId;
       // alert(xfVideoInfoId);
          Dialog.confirm('您确定删除此视频记录 ?',function(){ 
            $.ajax({
              type:'post',
              url:'/xfvideoinfo/delete',
              data:'videoId='+xfVideoInfoId,
              success:function(data){
                console.log(data);
                if(data.code== 200){
                 //  alert(rowNum);
                   $("#dg").datagrid('deleteRow',rowNum)
                }else{
                    OpenAlert('删除不成功',300,100);
                } 
              }
            })
         })
       }
   });
})



function submitUpdateVideo() {
      var updatedBy = getCookie('userName');
      var xfVideoInfoId =  $("#updateVideoId").val();
      var organizationName = $("#videoOrgUpdate").val();
      var taskName = $("#taskUpdate").val();
      var videoType = $("#updateVideoType").val();
      var description = $('#videoDescription').val();
      var address = $('#videoAddress').val();
      $.ajax({
         type:'post',
         url:'/xfvideoinfo/update',
         contentType:'charset=utf-8',
         data: "videoId="+xfVideoInfoId+"&address="+address+"&description="+description+"&videoType="+videoType,
         success:function(data){
                console.log(data);
                if(data.code == 200){
                  var row = $('#dg').datagrid('getSelected');
                  var rowNum = $('#dg').datagrid('getRowIndex',row);
                  row.Description = description;
                  row.Address = address;
                  row.VideoType = $('#videoType').find('option:selected').text();
                  row.taskName = $('#taskUpdate').find('option:selected').text();
                  $("#dg").datagrid('refreshRow',rowNum);
                  }else{
                 openAlert("修改失败",300,100);
                  }
                 Dialog.close();
          }
      })
}




