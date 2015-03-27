var Drag={
    "obj":null,
	"init":function(handle, dragBody, e){
		if (e == null) {
			handle.onmousedown=Drag.start;
		}
		handle.root = dragBody;

		if(isNaN(parseInt(handle.root.style.left)))handle.root.style.left="0px";
		if(isNaN(parseInt(handle.root.style.top)))handle.root.style.top="0px";
		handle.root.onDragStart=new Function();
		handle.root.onDragEnd=new Function();
		handle.root.onDrag=new Function();
		if (e !=null) {
			var handle=Drag.obj=handle;
			e=Drag.fixe(e);
			var top=parseInt(handle.root.style.top);
			var left=parseInt(handle.root.style.left);
			handle.root.onDragStart(left,top,e.pageX,e.pageY);
			handle.lastMouseX=e.pageX;
			handle.lastMouseY=e.pageY;
			document.onmousemove=Drag.drag;
			document.onmouseup=Drag.end;
		}
	},
	"start":function(e){
		var handle=Drag.obj=this;
		e=Drag.fixEvent(e);
		var top=parseInt(handle.root.style.top);
		var left=parseInt(handle.root.style.left);
		//alert(left)
		handle.root.onDragStart(left,top,e.pageX,e.pageY);
		handle.lastMouseX=e.pageX;
		handle.lastMouseY=e.pageY;
		document.onmousemove=Drag.drag;
		document.onmouseup=Drag.end;
		return false;
	},
	"drag":function(e){
		e=Drag.fixEvent(e);
							
		var handle=Drag.obj;
		var mouseY=e.pageY;
		var mouseX=e.pageX;
		var top=parseInt(handle.root.style.top);
		var left=parseInt(handle.root.style.left);
		
		if(document.all){Drag.obj.setCapture();}else{e.preventDefault();};//作用是将所有鼠标事件捕获到handle对象，对于firefox，以用preventDefault来取消事件的默认动作：

		var currentLeft,currentTop;
		currentLeft=left+mouseX-handle.lastMouseX;
		currentTop=top+(mouseY-handle.lastMouseY);
		handle.root.style.left=currentLeft +"px";
		handle.root.style.top=currentTop+"px";
		handle.lastMouseX=mouseX;
		handle.lastMouseY=mouseY;
		handle.root.onDrag(currentLeft,currentTop,e.pageX,e.pageY);
		return false;
	},
	"end":function(){
		if(document.all){Drag.obj.releaseCapture();};//取消所有鼠标事件捕获到handle对象
		document.onmousemove=null;
		document.onmouseup=null;
		Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style.left),parseInt(Drag.obj.root.style.top));
		Drag.obj=null;
	},
	"fixEvent":function(e){//格式化事件参数对象
		var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		if(typeof e=="undefined")e=window.event;
		if(typeof e.layerX=="undefined")e.layerX=e.offsetX;
		if(typeof e.layerY=="undefined")e.layerY=e.offsetY;
		if(typeof e.pageX == "undefined")e.pageX = e.clientX + sl - document.body.clientLeft;
		if(typeof e.pageY == "undefined")e.pageY = e.clientY + st - document.body.clientTop;
		return e;
	}
};


function open4(id,divWidth,divHeight,title)
{
	var divMsg=document.getElementById(id).innerHTML;
	var diag = new Dialog();
	diag.Width = divWidth;
	diag.Height = divHeight;
	diag.Title = title;
	diag.InnerHtml=divMsg;
	diag.OKEvent = function(){diag.close();};//点击确定后调用的方法
	diag.show();
}
function open5(id,divWidth,divHeight,title)
{
	var diag = new Dialog();
	diag.Width = divWidth;
	diag.Height = divHeight;
	diag.Title = title;
	diag.InvokeElementId=id;
	//diag.OKEvent = function(){topWin.$id("username").value||Dialog.alert("用户名不能为空");topWin.$id("userpwd").value||Dialog.alert("密码不能为空")};//点击确定后调用的方法
	diag.show();
}

// 自动关闭 提示窗口
function openAlert(info,width,height){
	var str1='<html><body style="background:#ffffff"><table height="100%" border="0" align="center" cellpadding="10" cellspacing="0">\
		<tr><td align="right"><img src="/images/layer/icon_alert.gif" width="34" height="34" align="absmiddle"></td>\
		<td align="left" style="font-size:9pt">';
	var str2='</td></tr>\
		</table></body></html>';
	str1 = escape(str1);
	str2 = escape(str2);
	var str = str1 + info + str2;
	var diag = new Dialog();
	diag.AutoClose=3;
	diag.Width = width;
	diag.Height = height;
	diag.ShowCloseButton=false;
	diag.URL = "javascript:void(document.write(\'"+str+"\'))";
	diag.show();
}
