/**
 * @author hl
 * @desc javascript实现文件上传，兼容ie6+，fireifox，chrome，opera主流浏览器，
 * 实现上传文件信息预览，上传文件进度条，已上传百分比，当前已上传文件大小。
 * 服务器端由java实现
 */
function JsUpload(settings){
	this.init(settings);
};

JsUpload.prototype.init = function(settings){
	settings = JsUpload.extend({
		name:'__jsupload__',
		file:null,
		validUrl:'',
		uploadUrl:'',
		progressUrl:''
	},settings || {});
	var name = settings.name,
	file = settings.file,
	form = file.form,
	validUrl = settings.validUrl,
	uploadUrl = settings.uploadUrl,
	progressUrl = settings.progressUrl,
	iframe = JsUpload.iframe(name);
	
	form.target = name;
	
	JsUpload.attr(file,'__target__',name);
	JsUpload.attr(file,'__valid__',validUrl);
	JsUpload.attr(file,'__uploadUrl__',uploadUrl);
	JsUpload.attr(file,'__progressUrl__',progressUrl);
	document.body.appendChild(iframe);
};

JsUpload.prototype.change = function(file,fn){
	//判断当前浏览器是否支持File API
	if(window.File && window.FileList && window.FileReader){
		var _file = file.files[0],_size = 0;
		if(_file.size > 1024 * 1024)
			_size = Math.round(_file.size * 100 / (1024 * 1024)) / 100 + 'MB';
		else
			_size = Math.round(_file.size * 100 / 1024) / 100 + 'KB';
		fn && fn(_file.name,_size,_file.type);
	}else{
		//不支持File API的浏览器发送服务器端获取上传文件大小
		var form = document.createElement('form'),
		target = JsUpload.attr(file,'__target__'),
		action = JsUpload.attr(file,'__valid__'),
		//临时file对象
		clone,
		//当前系统时间
		now = (new Date()).getTime(),
		jsonp = 'jsonp' + now;
		clone = file.cloneNode(true);
		file.style.display = 'none';
		file.parentNode.insertBefore(clone,file);
		
		JsUpload[jsonp] = function(data){
			fn && fn(data.name,data.size,data.type);
		};
		
		jsonp = 'JsUpload.' + jsonp;
		action += (action.indexOf('?') > -1 ? '&callback=' : '?callback=') + jsonp;
		
		form.target = target;
		form.action = action;
		form.method = 'post';
		//动态创建form,兼容
		if(form.encoding){//ie浏览器
		    form.setAttribute('encoding','multipart/form-data');
		    form.setAttribute('enctype','multipart/form-data');//ie8
		}else{//w3c
			form.setAttribute('enctype','multipart/form-data');
		}
		form.appendChild(file);
		document.body.appendChild(form);
		form.submit();
		clone.parentNode.insertBefore(file,clone);
		clone.parentNode.removeChild(clone);
		file.style.display = 'block';
		setTimeout(function(){
			form.parentNode.removeChild(form);
		},50);
	}
};

JsUpload.prototype.upload = function(button,file,fn){
	var uploadUrl = JsUpload.attr(file,'__uploadUrl__');
	
	if(window.File && window.FileList && window.FileReader){
		if(!file.files.length)
			return;
		//暂时禁用上传按钮
		button.disabled = true;
		
		var formData = new FormData(),
		//XMLHttpRequest2 对象，支持上传文件
		xhr = new XMLHttpRequest(),
		//已上传字节数
		uploadedBytes = 0,
		//文件总字节数
		totalBytes = 0;
		
		formData.append('file',file.files[0]);
		JsUpload.bind(xhr.upload,'progress',function(evt){
			if (evt.lengthComputable) {
	          uploadedBytes = evt.loaded;
	          totalBytes = evt.total;
	          var percentComplete = Math.round(uploadedBytes * 100 / totalBytes),
	          //已上传文件大小
	          bytesTransfered = '';
	          if (uploadedBytes > 1024 * 1024)
	            bytesTransfered = Math.round(uploadedBytes * 100 / (1024 * 1024)) / 100 + 'MB';
	          else
	            bytesTransfered = Math.round(uploadedBytes * 100 / 1024) / 100 + 'KB';
	          fn && fn('progress',percentComplete,bytesTransfered);
	          //上传完成，显示上传文件信息
	          if(percentComplete === 100){
	          		button.disabled = false;
					fn && fn('complete');
	          }
	        }else {
	        	button.disabled = false;
	        	fn && fn('fail','上传失败，请稍后重试');
	        }
		});
		JsUpload.bind(xhr,'load',function(evt){
			button.disabled = false;
			fn && fn('load',evt.target.responseText);
		});
		JsUpload.bind(xhr,'error',function(event){
			button.disabled = false;
			fn && fn('error','上传文件发生错误，请稍后重试');
		});
		JsUpload.bind(xhr,'abort',function(){
			button.disabled = false;
			fn && fn('abort','上传文件取消，用户或者浏览器取消了服务器请求');
		});
		xhr.open('POST',uploadUrl);
		xhr.send(formData);
	}else{
		if(!file.value)
			return;
		//暂时禁用上传按钮
		button.disabled = true;
		
		var form = button.form,
		now = (new Date()).getTime(),
		jsonp = 'jsonp' + now,
		action = form.action;
		
		JsUpload[jsonp] = function(data){
			button.disabled = false;
			
			fn && fn('load',data.statusText);
		};
		
		jsonp = 'JsUpload.' + jsonp;
		if(action.indexOf('callback') > -1){
			action = action.replace(/JsUpload.jsonp\d+/,jsonp);
		}else{
			action += (action.indexOf('?') > -1 ? '&callback=' : '?callback=') + jsonp;
		}
	
		form.action = action;
		form.submit();
		
		var progressUrl = JsUpload.attr(file,'__progressUrl__');
		setTimeout(function(){
			JsUpload.progress(progressUrl,button,fn);
		},200);
	}
};

JsUpload.progress = function(progressUrl,button,fn){
	var now = (new Date()).getTime();
	if(progressUrl.indexOf('ts') > -1){
		progressUrl = progressUrl.replace(/ts=\d+/,'ts=' + now);
	}else{
		progressUrl += (progressUrl.indexOf('?') > -1 ? '&ts=' : '?ts=') + now;
	}
	
	//发送Ajax获取上传进度信息
	JsUpload.Ajax.request({
		url:progressUrl,
		method:'get',
		dataType:'text',
		success:function(data){
			data = (new Function("return " + data))();
		  	
          	var uploadedBytes = data.uploadedBytes,totalBytes = data.totalBytes;
          	var percentComplete = Math.round(uploadedBytes * 100 / totalBytes),bytesTransfered = '';
          	if (uploadedBytes > 1024 * 1024)
            	bytesTransfered = Math.round(uploadedBytes * 100 / (1024 * 1024)) / 100 + 'MB';
          	else
            	bytesTransfered = Math.round(uploadedBytes * 100 / 1024) / 100 + 'KB';

          	fn && fn('progress',percentComplete,bytesTransfered);
          	//上传完成，显示上传文件信息
          	if(percentComplete !== 100)
				setTimeout(function(){
					JsUpload.progress(progressUrl,button,fn);
				},200);
          	else
				button.disabled = false;
		},
		error:function(e){
			throw e;
		}
	});
};

JsUpload.get = function(id){
	var elem = document.getElementById(id);
	if(elem && elem.id !== id){
		elem = null;
		var elems = document.getElementsByName(id),i = 0,length = elems.length,cur;
		for(;i < length;i++){
			cur = elems[i];
			if(cur.id === id){
				elem = cur;
				break;
			}
		}
	}
	return elem;
};

JsUpload.extend = function(target,src){
	for(var prop in src){
		target[prop] = src[prop];
	}
	return target;
};

JsUpload.attr = function(elem,name,value){
	if(typeof value === 'undefined'){
		return elem[name] ? elem[name] : elem.getAttribute(name);
	}else{
		elem.setAttribute(name,value);
	}
};

JsUpload.iframe = function(name){
	var iframe;
	try{
		iframe = document.createElement('<iframe name=' + name + '>');
	}catch(e) {
		iframe = document.createElement('iframe');
		iframe.name = name;
	}
	iframe.src = '';
	iframe.style.cssText = 'display:none;';
	return iframe;
};

JsUpload.Ajax = {
	request:function(options){
		var trans = this.getTransport(),_ajax = this;
		options = JsUpload.extend({
					method:'get',
					async:true,
					dataType:'text'
				},options || {});
		if(!options.method){
			options.method = 'get';
		}
		if(options.method === 'get' && typeof options.data === 'string'){
			options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + options.data;
			options.data = null;
		}
		trans.open(options.method,options.url,options.async);
		if(options.method === 'post'){
			trans.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=UTF-8');
		}
		trans.onreadystatechange = function(){
			_ajax.onStateChange.call(_ajax,trans,options);
		};
		trans.send(options.data || null);
		return trans;
	},
	onStateChange:function(trans,options){
		if(trans.readyState === 4){
			trans.onreadystatechange = function(){
			};
			var s = trans.status;
			if(typeof s === 'number' && s >= 200 && s < 300){
				if(typeof options.success !== 'function'){
					return;
				}
				var data = trans,ctt = trans.getResponseHeader('content-type') || '',xml;
				if(typeof options.dataType === 'string'){
					xml = options.dataType === 'xml' || !options.dataType && ctt.indexOf('xml') >= 0;
					data = xml ? trans.responseXML : trans.responseText;
					if(options.dataType === 'json' || !options.dataType && ctt.indexOf('json') >= 0){
						data = this.parseJSON(data);
					}
				}
				options.success(data);
			}else{
				if(window.closed){
					return;
				}
				if(typeof options.error === 'function'){
					var error = {
						status:trans.status,
						statusText:trans.statusText
					};
					if(trans.readState === 4 && (trans.status === 0 || trans.status === 12030)){
						error.status = -1;
					}
					options.error(error);
				}
			}
		}
	},
	getTransport:function(){
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}else{
			try{
				return new ActiveXObject('Msxml2.XMLHTTP');
			}catch(e){
				try{
					return new ActiveXObject('Microsoft.XMLHTTP');
				}catch(e){
					return false;
				}
			}
		}
	},
	parseJSON:function(data){
		if(typeof data !== 'string' || !data){
			return null;
		}
		data = (data || '').replace(/^\s+/,"").replace(/\s+$/,'');
		if(/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
			return window.JSON && window.JSON.parse ? window.JSON.parse(data) : (new Function("return " + data))();
		}else{
			throw "Invalid JSON: " + data;
		}
	}
};

JsUpload.bind = function(elem,type,fn){
	if(elem.attachEvent){
		elem['on' + fn] = function(){
			fn.call(elem,window.event);
		};
		elem.attachEvent('on' + type,elem['on' + fn]);
	}else{
		elem.addEventListener(type,fn,false);
	}
};
