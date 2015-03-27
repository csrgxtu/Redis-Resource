
var parseString = require('xml2js').parseString;
var url = "http://tempuri.org/IDataSynchroService/SyschroDataOfString";
var BasicHttpBinding = require('wcf.js').BasicHttpBinding;
var Proxy = require('wcf.js').Proxy;
module.exports = {
	dataUpdate: function(req,res){
		var tableName = req.param('tableName');
		var cronTaskName = req.param('cronTaskName');
		var JGID = req.param('JGID');
		var beginTime;
		if(tableName == '' || tableName == null || cronTaskName == '' || cronTaskName == null)
			return res.send({code: 404,msg: 'you should set tableName'});
		var	endTime = UtilityService.getCurrentTime();
		if(JGID == '' || JGID == null)
			JGID = "ac688795e4694bde9016a02d2218a2c2";
		var taskBeginTimesql = "select ct.CronTaskId,ct.TaskName,cthis.DataEndTime from xfjwt_CronTaskHistory cthis "
							 + "right join xfjwt_CronTask ct on (ct.CronTaskId = cthis.CronTaskId and ct.TaskName = '"+cronTaskName+"') " 
							 + "order by cthis.DataEndTime desc limit 1";
		JGXX_XFJG.query(taskBeginTimesql,function(err,taskBeginTimesqlResult){
			if(err)
				return res.send({code: 500,msg: 'databaseserr',data: err});
			if(taskBeginTimesqlResult.length == 0){
				return res.send({code: 404,msg: 'data is null',data: ''})
			}else{
				if(taskBeginTimesqlResult[0].DataEndTime == '' || taskBeginTimesqlResult[0].DataEndTime == null){
					beginTime = "2015-01-20 00:00:00";
				}else{
					beginTime = taskBeginTimesqlResult[0].DataEndTime;
					var binding = new BasicHttpBinding(
					            { SecurityMode: "None"
					            });
					var proxy = new Proxy(binding, "http://192.168.10.10:11055/DataSynchroService");
					var message =  "<?xml version='1.0' encoding='utf-8'?>"
											+ "<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>"
											+ "<soap:Header />"
											 + "<soap:Body>"
												+ "<SyschroDataOfString xmlns='http://tempuri.org/'>"
												  + "<tableName>"+tableName+"</tableName>"
												  + "<JGID>"+JGID+"</JGID>"
												  + "<beginTime>"+beginTime+"</beginTime>"
												  + "<endTime>"+endTime+"</endTime>"
												+ '</SyschroDataOfString>'
											  + '</soap:Body>'
											+ '</soap:Envelope>';
					getTableData(message,url,taskBeginTimesqlResult[0].CronTaskId,endTime);
				}
			}
		})
		function getTableData(mes,ur,cronTaskId,time){
			proxy.send(mes, ur, function(response, ctx) {
				    console.log("response = " + response);
				parseString(response, function(err, result) {
				    if (err) {
						console.log(err);
				    }
				    var completed = result['s:Envelope']['s:Body'][0].SyschroDataOfStringResponse[0].isCompleted;
				    console.log("isCompleted = " + completed);
				      
				    var str = result['s:Envelope']['s:Body'][0].SyschroDataOfStringResponse[0].SyschroDataOfStringResult;
				    parseString(str,function(err,res2){
				        if (err) {
					       console.log(err);
				        }
				        if(res2 == null || res2 == '')
				        	return res.send({code: 404,msg: 'nothing has found 1'});
				        //console.log("res2 = " + res2);
				        if(!res2.MainMsg.hasOwnProperty(""+tableName+""))
				        	return res.send({code: 404,msg: 'nothing has found 2'});
				        var list = res2.MainMsg[tableName];
				      	var len = res2.MainMsg[tableName].length;
				        console.log(len);
				        for(var i = 0;i < len; i++){
				        	var KY =  "";
				        	var VALUE = "";
	        				for(var key in list[i]){
	        					KY += key+",";
	        					VALUE += "'"+list[i][key]+"'";
	 							VALUE +=",";       					
	        				}
				        	KY = KY.substring(0,KY.length - 1);
				        	VALUE = VALUE.substring(0,VALUE.length - 1);
				        	var sql = "replace into "+tableName+"("+KY+") values("+VALUE+")";
				        	console.log("sql = " + sql);
				        	RYXX_RYJBXX.query(sql,function(err,r1){
				        		if(err)
				        			console.log(err);
				        	})
				        }
				        if (completed == 0) {
				        	getTableData(mes,ur);
				        }else{
				        	var createValues = {};
				        	createValues.CompletedTime = UtilityService.getCurrentTime();
				        	createValues.CronTaskId = cronTaskId;
				        	createValues.DataEndTime = time;
				        	createValues.CreatedTime = UtilityService.getCurrentTime();
				        	XFJWT_CronTaskHistory.create(createValues)
				        	.exec(function(err,result){
				        		if(err)
				        			return res.send({code: 500,msg: 'databaseserr',data: ''});
				        		return res.send("OK");
				        	})
				        };
				    })
				 })
	   		});
		}
	},
	findAndUpdate: function(req,res){
		var test = "SWGL_ZBGL_MRZB not found ZBSX";

		User.findOrCreate({name:"dishy3"})
		.exec(function(err,result){
			if(err)
				console.log(err);
			console.log(result);
		})
	}
}    
