var pageSize = 20;

//  获取服务器数据，通过页码   role
function getRoleList(pageIndex, pageSize, name) {
	name = $.trim(name);
	$.ajax({
		type: "post",
		url: "/role/read",
		data: "pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&roleName=" + name,
		success: function(msg) {
			//console.log(msg);
			if (msg.code == 200) {
				var Roles = [];
				for (var i = 0; i < msg.data.recs.length; i++) {
					var role = new Role(msg.data.recs[i]);
					Roles.push(role);
				}
				showRoleList(Roles, msg.data.total, pageIndex, name);
			} else {
				openAlert("获取服务器数据失败!", 300, 100);
			}
		}
	});
}

function dateGridData(total, recs) {
	this.total = total;
	this.rows = recs;
}

//获取服务器数据 user
function getUserListByRoleId(pageindex,pagesize) {
	$.ajax({
		type: "post",
		url: "/user/read",
		data: "pageIndex="+pageindex+"&pageSize="+pagesize+"&roleId=" + roleUserId,
		success: function(msg) {
			console.log(msg);
			if (msg.code == 200) {
				$('#userTable').datagrid('loadData', new dateGridData(msg.data.total, msg.data.recs));
			} else {
				openAlert("获取服务器数据失败", 300, 100);
			}
		}
	});
};

//获取服务器数据，myresources
function getMyResource(roleId) {
	$.ajax({
		type: "post",
		url: "/role/getMsgByRoleId",
		data: "roleId=" + roleId + "",
		success: function(msg) {
			showTreeInfo(msg.data);
		}
	});
}

//获取服务器数据，初始化resourcesAll
function getAllResource() {
	$.ajax({
		type: "post",
		url: "/Resource/getResourceList",
		success: function(msg) {
			console.log(msg);
			showTreeInfo(msg.data);
		}
	});
}

//提交新增/保存
function submitSaveOrUpdate() {
	var id = encodeHTML($("#roleIdInput").val());
	var name = encodeHTML($("#roleNameInput").val());
	var description = encodeHTML($("#roleDescriptInput").val());
	var user = getCookie("DisplayName");

	if (name == "") {
		openAlert("请输入角色名称!", 300, 100);
		return false;
	}

	var nodes = $("#resourceTree").tree("getChecked");
	if (nodes.length <= 0) {
		openAlert("请选择权限", 300, 100);
		return false;
	}

	$("#saveRole").linkbutton('disable');

	var ids = [];
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].id != null) {
			ids.push(nodes[i].id);
		}
	}
	$.ajax({
		type: "post",
		url: "/role/save",
		data: "roleId=" + id + "&roleName=" + name + "&description=" + description + "&resources=" + ids + "&createdBy=" + user + "&updatedBy=" + user + "",
		success: function(msg) {
			$('#saveRole').linkbutton('enable');

			if (msg.code == 200) {
				var day = new Date();
				var dayStr = day.Format("yyyy-MM-dd HH:mm:ss");
				if (id == "") {
					var row = {
						'id': '' + msg.roleId + '',
						'name': '' + name + '',
						'description': '' + description + '',
						'updatedTime': '',
						'updatedBy': '',
						'createdTime': '' + dayStr + '',
						'createdBy': '' + user + ''
					};
					$("#roleTable").datagrid("appendRow", row);
				} else {
					var row = $("#roleTable").datagrid("getSelected");
					var rowIndex = $("#roleTable").datagrid("getRowIndex", row);
					row.name = name;
					row.description = description;
					row.updatedTime = day.Format("yyyy-MM-dd HH:mm:ss");
					row.updatedBy = user;
					$('#roleTable').datagrid('refreshRow', rowIndex, row);
				}
				Dialog.close();
			} else {
				console.log(msg);
				openAlert("操作失败!", 300, 100);
			}
		}
	});


}

// 提交删除ajax 通过id
$("#deleteRole").click(function() {
	var row = $('#roleTable').datagrid('getSelected');
	var rowIndex = $('#roleTable').datagrid('getRowIndex', row);
	Dialog.confirm('您确认要删除角色<font color="red"> ' + row.name + ' </font>吗?',
		function() {
			$.ajax({
				type: "post",
				url: "/role/delete",
				data: "roleId=" + row.id,
				success: function(msg) {
					if (msg.code == 200) {
						$("#roleTable").datagrid('deleteRow', rowIndex);
					} else {
						console.log(msg);
						openAlert("提交删除失败!", 300, 100);
					}
				}
			});
		});
});

//查询
$("#searchRole").click(function() {
	var name = $("#roleNamesea").val();
	getRoleList(1, pageSize, name);
});

$("#roleNamesea").keydown(function(event) {
	if (event.keyCode == "13") {
		$("#searchRole").click();
	}
});

//弹出新增层
$("#createRole").click(function() {
	getAllResource();
	$("#userListTd").css("display", "none");
	$("#roleIdInput").val("");
	$("#roleNameInput").val("");
	$("#roleDescriptInput").val("");
	open5("rolePermissionDiv", 320, 500, "新建角色");

});

var roleUserId;
var pageindex=1;
var pagesize=10;

//弹出修改层
$("#updateRole").click(function() {
	var row = $('#roleTable').datagrid('getSelected');
	if (row) {
		roleUserId=row.id;
		getUserListByRoleId(pageindex,pagesize); //获取当前role 用户信息		
		getMyResource(row.id); //获取当前role资源信息
		$("#roleIdInput").val(row.id);
		$("#roleNameInput").val(row.name);
		$("#roleDescriptInput").val(row.description);
		$("#userListTd").css("display", "");
		open5("rolePermissionDiv", 440, 500, "修改角色信息");
	}
});

//树状图显示数据
function showTreeInfo(resources) {
	$("#resourceTree").tree("loadData", resources);
}


//表格显示数据
function showRoleList(Roles, total, pageIndex, name) {
	//配置表格数据
	$('#roleTable').datagrid('loadData', Roles);
	$('#roleTable').datagrid('selectRow', 0);

	//配置分页样式
	var p = $('#roleTable').datagrid('getPager');
	$(p).pagination({
		pageSize: pageSize,
		pageNumber: pageIndex,
		total: total,
		pageList: [20, 40, 60, 80],
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function(pageNumber, pageSize) {
			//getUserListInfo(pageNumber,pageSize,name);
			getRoleList(pageNumber, pageSize, $('#roleNamesea').val());
		},
		onRefresh: function(pageNumber, pageSize) {
			getRoleList(pageNumber, pageSize, '');
		}
	});
}

$(function() {
	toCheck('createRole', "/role/save");
	toCheck('updateRole', "/role/save");
	toCheck('deleteRole', "/role/delete");
	//初始化数据
	initPage();
	getRoleList(1, pageSize, "");
});

function initPage() {
	var gp = $('#userTable').datagrid('getPager');
	gp.pagination({
		layout: ['prev', 'next'],
		displayMsg:'',
		onSelectPage: function (pageNumber, pageSize){
			getUserListByRoleId(pageNumber,pageSize);
		}
	});
}

//  role实体
function Role(data) {
	this.id = data.RoleId;
	this.name = data.RoleName;
	if (data.RoleName == null) {
		this.name = "";
	}
	this.description = data.Description;
	if (data.Description == null) {
		this.description = "";
	}
	this.createdBy = data.CreatedBy;
	if (data.CreatedBy == null) {
		this.createdBy = "";
	}

	this.createdTime = data.CreatedTime;
	if (data.CreatedTime == null) {
		this.createdTime = "";
	}

	this.updatedBy = data.UpdatedBy;
	if (data.UpdatedBy == null) {
		this.updatedBy = "";
	}

	this.updatedTime = data.UpdatedTime;
	if (data.UpdatedTime == null) {
		this.updatedTime = "";
	}
}

// Permission 实体
function Permission(data) {
	this.roleId = data.roleId;
	this.roleName = data.roleName;
	if (data.roleName == null) {
		this.roleName = "";
	}
	this.description = data.description;
	if (data.description == null) {
		this.description == "";
	}
	this.permission = [];
	for (var i = 0; i < data.permission.length; i++) {
		var per = new Resource(data.permission[i]);
		this.permission.push(per);
	}
}

//Resource 实体
function Resource(data) {
	this.id = data.ResourceId;
	this.name = data.ResourceName;
	this.module = data.Module;
	if (data.ResourceName == "") {
		this.name = "";
	}
	this.resourceUrl = data.ResourceUrl;
	if (data.ResourceUrl == null) {
		this.resourceUrl = "";
	}
	if (data.Module == null) {
		this.module = "";
	}
}