var pageSize = 20;

function getUserListInfo(pageIndex, pageSize, organizationId, title, roleId, name) {
	//alert("hello");
	name = $.trim(name);
	$.ajax({
		type: "post",
		url: "/user/read",
		data: "organizationId=" + organizationId + "&title=" + title + "&roleId=" + roleId + "&displayName=" + name + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "",
		success: function(msg) {
			if (msg.code == 200) {
				var users = [];
				var total = msg.data.total;
				//console.log();

				for (var i = 0; i < msg.data.recs.length; i++) {
					var user = new userInfo(msg.data.recs[i]);
					users.push(user);
				}
				//alert(user);
				showUserListInfo(users, pageIndex, pageSize, total, organizationId, title, roleId, name);
			}
		}
	});
}

//初始化权限列表
function getPermissionList() {
	$.ajax({
		type: "post",
		url: "/role/read",
		data: "pageIndex=1&pageSize=100",
		success: function(msg) {
			var data = msg.data.recs;
			$("#permissionSea").empty();
			$("#permissionSea").append("<option value=''>-- 请选择 --</option>");
			for (var i = 0; i < data.length; i++) {
				$("#permissionSea").append("<option value='" + data[i].RoleId + "'>" + data[i].RoleName + "</option>");
				$("#permissionCreate").append("<option value='" + data[i].RoleId + "'>" + data[i].RoleName + "</option>");
				$("#permissionUpdate").append("<option value='" + data[i].RoleId + "'>" + data[i].RoleName + "</option>");
			}
		}
	});
}

//初始化职位列表
function getTitleList() {
		$.ajax({
			type: "post",
			url: "/SysCode/read",
			data: "pageIndex=1&pageSize=100&codeCategory=职位",
			success: function(msg) {
				var data = msg.data;
				//	console.log(data);
				$("#titleSea").empty();
				$("#titleSea").append("<option value=''>-- 请选择 --</option>");
				for (var i = 0; i < data.length; i++) {
					$("#titleSea").append("<option value='" + data[i].CodeDisplayName + "'>" + data[i].CodeDisplayName + "</option>");
					$("#titleCreate").append("<option value='" + data[i].CodeDisplayName + "'>" + data[i].CodeDisplayName + "</option>");
					$("#titleUpdate").append("<option value='" + data[i].CodeDisplayName + "'>" + data[i].CodeDisplayName + "</option>");
				}
			}
		});
	}
	//初始化部门列表

function getOrganizationList() {
	$.ajax({
		type: "post",
		url: "/organization/readOrgTree",
		data: "pageIndex=1&pageSize=100",
		success: function(msg) {
			var data = msg.organization;
			//console.log(data);
			$("#organizationSea").empty();
			$("#organizationSea").append("<option value=''>-- 请选择 --</option>");
			for (var i = 0; i < data.length; i++) {
				$("#organizationSea").append("<option value='" + data[i].ID + "'>" + data[i].JGJC + "</option>");
				$("#organizationCreate").append("<option value='" + data[i].ID + "'>" + data[i].JGJC + "</option>");
				$("#organizationUpdate").append("<option value='" + data[i].ID + "'>" + data[i].JGJC + "</option>");
			}
		}
	});
}

//  加锁提交
function lock(row, rowNum, userId) {
	$.ajax({
		type: "post",
		url: "/user/lockById",
		data: "userId=" + userId,
		success: function(msg) {
			if (msg.code == 200) {
				row.status = "限制登陆";
				$("#dg").datagrid('refreshRow', rowNum)
			} else {
				if (window.console)
					console.log(msg);
				openAlert("加锁失败!", 300, 100);
			}
		}
	});
}


// 解锁提交
function unlock(row, rowNum, userId) {
	$.ajax({
		type: "post",
		url: "/user/unlockById",
		data: "userId=" + userId,
		success: function(msg) {
			if (msg.code == 200) {
				row.status = "可登陆";
				$("#dg").datagrid('refreshRow', rowNum);
			} else {
				if (window.console)
				//console.log(msg);
					openAlert("解锁失败!", 300, 100);
			}
		}
	});
}

//删除提交
function deleteUser(rowNum, userId, userName) {
	Dialog.confirm('您确定要删除用户 <font color="red">' + userName + '</font> 吗?',
		function() {
			$.ajax({
				type: "post",
				url: "/user/delete",
				data: "userId=" + userId,
				success: function(msg) {
					if (msg.code == 200) {
						$("#dg").datagrid('deleteRow', rowNum);
					} else {
						if (window.console)
						// console.log(msg);
							openAlert("删除失败!", 300, 100);
					}
				}
			});
		});
}

//提交修改信息
function submitUpdateUser() {
	var id = $("#userIdUpdate").val();
	var loginName = $("#userNameUpdate").val();
	var organization = $("#organizationUpdate").val();
	var userName = $("#userDisplayNameUpdate").val();
	var phone = $("#phoneUpdate").val();
	var shortNumber = $("#shortNumberUpdate").val();
	var title = $("#titleUpdate").val();
	var permission = $("#permissionUpdate").val();
	var imei = $("#imeiUpdate").val();
	var updatedBy = getCookie("DisplayName");

	var NoSequence = $("#NoSequenceUpdate").val();

	if (loginName == "") {
		openAlert("用户名不能为空", 300, 100);
		return false;
	}
	if (userName == "") {
		openAlert("姓名不能为空", 300, 100);
		return false;
	}
	if (phone == "") {
		openAlert("联系电话不能为空", 300, 100);
		return false;
	}
	if (imei == "") {
		openAlert("串号不能为空", 300, 100);
		return false;
	}
	if (shortNumber == "") {
		openAlert("短号不能为空", 200, 100);
		return false;
	} else {
		var reg = /^[1-9]\d{3,16}$/;
		var r = shortNumber.match(reg);

		if (r == null) {
			openAlert('短号格式不对,请输入4位以上的数字!', 200, 100);
			return false;
		}
	}

	if (NoSequence == "") {
		openAlert("序号不能为空", 300, 100);
		return false;
	} else if (isNaN(NoSequence)) {
		openAlert("序号只能为数字", 300, 100);
		return false;
	}

	$("#updateUserBtn").linkbutton('disable');

	$.ajax({
		type: "post",
		url: "/user/save",
		data: 'mobilePhoneNumber=' + phone + '&noSequence=' + NoSequence + "&shortNumber=" + shortNumber + '&userName=' + loginName + '&displayName=' + userName + '&title=' + title + '&organizationId=' + organization + '&imei=' + imei + '&updatedBy=' + updatedBy + "&roleId=" + permission + '&userId=' + id + '',
		success: function(msg) {

			$("#updateUserBtn").linkbutton('enable');
			if (window.console)
			//   console.log(msg);
				if (msg.code == "200") {
					var name = $("#userNameSea").val();
					var title = $("#titleSea").find("option:selected").val();
					var roleId = $("#permissionSea").find("option:selected").val();
					var organizationId = $("#organizationSea").find("option:selected").val();
					getUserListInfo(1, pageSize, organizationId, title, roleId, name);
					Dialog.close();
				} else {
					if (window.console)
						console.log(msg);
					openAlert("修改失败!", 300, 100);
				}
			Dialog.close();
		}
	});

}

//提交修改密码
function submitUpdatePass() {
	var id = $("#userIdUpdatePass").val()
	var newPass = $("#passUpdatePass").val();
	var newPassAgain = $("#passAgainUpdatePass").val();
	//alert(id);
	//alert(newPass);
	//alert(newPassAgain);
	if (newPass == "") {
		openAlert("请输入新密码", 300, 100);
		return false;
	}
	if (newPassAgain == "") {
		openAlert("请确认密码", 300, 100);
		return false;
	}
	if (newPass != newPassAgain) {
		openAlert("两次输入密码不一致", 300, 100);
		return false;
	}

	newPass = calcMD5(newPass.toUpperCase());

	$.ajax({
		type: "post",
		url: "/user/changPassWord",
		data: "userId=" + id + "&password=" + newPass + "",
		success: function(msg) {
			if (msg.code == "200") {
				Dialog.close();
				openAlert("修改成功", 300, 100);
			} else {
				if (window.console)
					console.log(msg);
				openAlert("修改失败", 300, 100);
			}

		}
	});
}

//提交新增
function submitAddUser() {
	var loginName = encodeHTML($("#userNameCreate").val());
	var pass = $("#userPassCreate").val();
	var passAgain = $("#userPassAgainCreate").val();
	var organization = encodeHTML($("#organizationCreate").find("option:selected").val());
	var userName = encodeHTML($("#userDisplayNameCreate").val());
	var phone = $("#phoneCreate").val();
	var title = encodeHTML($("#titleCreate").find("option:selected").val());
	var permission = $("#permissionCreate").find("option:selected").val();
	var imei = $("#imeiCreate").val();
	var createdBy = getCookie("DisplayName");
	var shortNumber = $("#shortNumberCreate").val();
	var NoSequence = $("#NoSequenceCreate").val();
	if (loginName == "") {
		openAlert("用户名不能为空", 300, 100);
		return false;
	}

	if (pass == "") {
		openAlert("密码不能为空", 300, 100);
		return false;
	}

	if (passAgain == "") {
		openAlert("请确认密码", 300, 100);
		return false;
	}

	if (userName == "") {
		openAlert("姓名不能为空", 300, 100);
		return false;
	}
	if (phone == "") {
		openAlert("联系电话不能为空", 300, 100);
		return false;
	}
	if (shortNumber == "") {
		openAlert("短号不能为空", 200, 100);
		return false;
	} else {
		var reg = /^[1-9]\d{3,16}$/;
		var r = shortNumber.match(reg);
		if (r == null) {
			openAlert('短号格式不对,请输入4位以上的数字!', 200, 100);
			return false;
		}
	}
	if (imei == "") {
		openAlert("串号不能为空", 300, 100);
		return false;
	}
	if (pass != passAgain) {
		openAlert("两次输入密码不一致", 300, 100);
		return false;
	}

	if (NoSequence == "") {
		openAlert("序号不能为空", 300, 100);
		return false;
	} else if (isNaN(NoSequence)) {
		openAlert("序号只能为数字", 300, 100);
		return false;
	}

	$("#saveUserBtn").linkbutton("disable");
	pass = calcMD5(pass.toUpperCase());
	$.ajax({
		type: "post",
		url: "/user/save",
		data: "mobilePhoneNumber=" + phone + "&noSequence=" + NoSequence + "&shortNumber=" + shortNumber + "&userName=" + loginName.toUpperCase() + "&displayName=" + userName + "&password=" + pass + "&title=" + title + "&organizationId=" + organization + "&imei=" + imei + "&createdBy=" + createdBy + "&roleId=" + permission + "",
		success: function(msg) {
			$("#saveUserBtn").linkbutton("enable");
			if (msg.code == 200) {
				location.reload();
			} else if (msg.code == 403) {
				openAlert(msg.msg, 300, 100);
			} else {
				console.log(msg);
				openAlert("新建用户失败，请检查用户账号是否重复", 300, 100);
			}
		}
	});
}

function showUserListInfo(users, pageIndex, pageSize, total, orgId, title, roleId, name) {
	//配置表格数据
	$('#dg').datagrid('loadData', users);
	$('#dg').datagrid('selectRow', 0);

	//配置分页样式
	var p = $('#dg').datagrid('getPager');
	$(p).pagination({
		pageSize: pageSize,
		pageNumber: pageIndex,
		total: total,
		pageList: [20, 40, 60, 80],
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function(pageNumber, pageSize) {
			getUserListInfo(pageNumber, pageSize, orgId, title, roleId, name);
		},
		onRefresh: function(pageNumber, pageSize) {
			getUserListInfo(pageNumber, pageSize, orgId, title, roleId, name);
		}
	});
}

$("#searchUser").click(function() {
	var name = $("#userNameSea").val();
	var title = $("#titleSea").find("option:selected").val();
	var roleId = $("#permissionSea").find("option:selected").val();
	var organizationId = $("#organizationSea").find("option:selected").val();

	getUserListInfo(1, pageSize, organizationId, title, roleId, name);
});

$("#userNameSea").keydown(function(event) {
	if (event.keyCode == "13") {
		$("#searchUser").click();
	}
});

$("#titleSea").change(function() {
	$("#searchUser").click();
})

$("#permissionSea").change(function() {
	$("#searchUser").click();
});

$("#organizationSea").change(function() {
	$("#searchUser").click();
});


$("#unlockUser").click(function() {
	var row = $('#dg').datagrid('getSelected');
	var rowIndex = $('#dg').datagrid('getRowIndex', row);
	if (row) {
		unlock(row, rowIndex, row.id);
	}
});

$("#lockUser").click(function() {
	var row = $('#dg').datagrid('getSelected');
	var rowIndex = $('#dg').datagrid('getRowIndex', row);
	if (row) {
		lock(row, rowIndex, row.id);
	}
});

$("#createUser").click(function() {
	$("#userNameCreate").val("");
	$("#userDisplayNameCreate").val("");
	$("#userPassCreate").val("");
	$("#userPassAgainCreate").val("");
	$("#organizationCreate").get(0).selectedIndex = 0;
	$("#titleCreate").get(0).selectedIndex = 0;
	$("#permissionCreate").get(0).selectedIndex = 0;
	$("#imeiCreate").val("");
	$("#phoneCreate").val("");


	open5("addUser", 480, 280, "添加新用户");
});

$("#updateUser").click(function() {
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$("#userIdUpdate").val(row.id);
		$("#userNameUpdate").val(row.loginName);
		$("#organizationUpdate").val(row.organizationId);
		$("#userDisplayNameUpdate").val(row.userName);
		$("#titleUpdate").val(row.title);
		$("#phoneUpdate").val(row.phoneNumber);
		$("#permissionUpdate").val(row.roleId);
		$("#imeiUpdate").val(row.imei);
		$("#shortNumberUpdate").val(row.shortNumber);
		$("#NoSequenceUpdate").val(row.NoSequence);
		open5("updateUserTable", 300, 370, "修改用户信息");
	}
});

$("#updatePass").click(function() {
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$("#userIdUpdatePass").val(row.id);
		$("#userNameUpdatePass").val(row.userName);
		$("#userLoginNameUpdatePass").val(row.loginName);
		open5("updateUserPass", 300, 200, "修改密码");
	}
});

$("#deleteUser").click(function() {
	var row = $('#dg').datagrid('getSelected');
	var rowNum = $('#dg').datagrid('getRowIndex', row);
	if (row) {
		deleteUser(rowNum, row.id, row.userName);
	}
});

$("#checkboxPass").click(function() {
	if (this.checked) {
		var loginName = $("#userLoginNameUpdatePass").val();
		$("#passUpdatePass").val(loginName);
		$("#passUpdatePass").attr("disabled", true);
		$("#passAgainUpdatePass").val(loginName);
		$("#passAgainUpdatePass").attr("disabled", true);
	} else {
		$("#passUpdatePass").attr("disabled", false);
		$("#passAgainUpdatePass").attr("disabled", false);
	}
});

$(function() {
	toCheck('createUser', "/user/save");
	toCheck('updateUser', "/user/save");
	toCheck('deleteUser', "/user/delete");
	toCheck('updatePass', "/User/changPassWord");
	toCheck('lockUser', "/user/lockById");
	toCheck('unlockUser', "/user/unlockById");
	getPermissionList();
	getTitleList();
	getOrganizationList();
	getUserListInfo(1, pageSize, "", "", "", "");
});


function userInfo(data) {
	this.id = data.UserId;
	this.loginName = data.UserName;
	this.userName = data.DisplayName;
	this.phoneNumber = data.MobilePhoneNumber;
	this.shortNumber = data.ShortNumber;
	this.title = data.Title;
	this.roleName = data.RoleName;
	this.roleId = data.RoleId;
	this.organization = data.JGJC;
	this.organizationId = data.OrganizationId;
	this.status = "";
	if (data.IsLocked == "" || data.IsLocked == 0) {
		this.status = "可登录";
	} else {
		this.status = "限制登陆";
	}
	this.isLocked = data.IsLocked;
	this.imei = data.Imei;
	this.createdTime = data.CreatedTime;
	this.NoSequence = data.NoSequence;
}