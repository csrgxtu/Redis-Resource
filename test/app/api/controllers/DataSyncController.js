var dataUpdateUrl = "http://192.168.6.112:11010/attachment/filemanage/configFile!showFile.action";
var parseString = require('xml2js').parseString;
var wgetCmd = require('child_process').exec
var url = "http://tempuri.org/IDataSynchroService/SyschroDataOfString";
var BasicHttpBinding = require('wcf.js').BasicHttpBinding;
var Proxy = require('wcf.js').Proxy;
var binding = new BasicHttpBinding(
                                            { SecurityMode: "None"
                                            });
var proxy = new Proxy(binding, "http://192.168.10.10:11055/DataSynchroService");
module.exports = {
	dataUpdate: function(req,res){
		var tableName = req.param('tableName');
		var cronTaskName = tableName;
		var JGID = req.param('JGID');
		var beginTime;
		var count = 0;
		if(tableName == '' || tableName == null || cronTaskName == '' || cronTaskName == null)
			return res.send({code: 404,msg: 'you should set tableName'});
		var	endTime = UtilityService.getCurrentTime();
		if(JGID == '' || JGID == null)
			JGID = "ac688795e4694bde9016a02d2218a2c2";
		var taskBeginTimesql = "select ct.CronTaskId,ct.TaskName,cthis.DataEndTime from xfjwt_CronTaskHistory cthis "
							 + "right join xfjwt_CronTask ct on (ct.CronTaskId = cthis.CronTaskId ) " 
							 + "where ct.TaskName = '"+cronTaskName+"'order by cthis.DataEndTime desc limit 1";
console.log("===============================================");
		console.log('sql = ' + taskBeginTimesql);
		JGXX_XFJG.query(taskBeginTimesql,function(err,taskBeginTimesqlResult){
			if(err)
				return res.send({code: 500,msg: 'databaseserr',data: err});
			if(taskBeginTimesqlResult.length == 0){
				return res.send({code: 404,msg: 'itaskBeginTimesqlResult data is null',data: ''})
			}else{
				if(taskBeginTimesqlResult[0].DataEndTime == '' || taskBeginTimesqlResult[0].DataEndTime == null){
					beginTime = "2015-01-01 00:00:00";
				}else{
					beginTime = taskBeginTimesqlResult[0].DataEndTime;
				}
				console.log("tableName = " + tableName + " beginTime = " + beginTime + " endTime = " + endTime + " JGID = " + JGID );

		console.log('============================================');
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
				console.log("cronTaskId = " + taskBeginTimesqlResult[0].CronTaskId);
				getTableData(message,url,taskBeginTimesqlResult[0].CronTaskId,endTime,beginTime,count);
			}
		})
		function cronTaskHistoryRecords(cronTaskId,time,code,description,beginTime,count){
			var createValues = {};
        	createValues.CompletedTime = UtilityService.getCurrentTime();
        	createValues.CronTaskId = cronTaskId;
        	if(code == 404){
        		createValues.DataEndTime = beginTime;
        	}else{
        		createValues.DataEndTime = time;
        	}
        	createValues.CreatedTime = UtilityService.getCurrentTime();
        	createValues.Message = description;
			createValues.AffectedRecords = count;
        	XFJWT_CronTaskHistory.create(createValues)
        	.exec(function(err,result){
        		if(err)
        			return res.send({code: 500,msg: 'databaseserr',data: err});
        		return res.send({code: code,msg: description});
        	})
		}
		function getTableData(mes,ur,cronTaskId,time,beginTime,count){
			proxy.send(mes, ur, function(response, ctx) {
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
					       return res.send({code: 500,msg: 'parseString is err',data: err})
				        }
				        if(res2 == null || res2 == ''){
				        	cronTaskHistoryRecords(cronTaskId,time,404,'无数据',beginTime,count);
				        }else{
					        if(!res2.MainMsg.hasOwnProperty(""+tableName+"")){
					        	cronTaskHistoryRecords(cronTaskId,time,404,'没有表' + tableName,beginTime,count);
					        }else{
						        var list = res2.MainMsg[tableName];
						      	var len = res2.MainMsg[tableName].length;
							count += len;
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
						        	getTableData(mes,ur,cronTaskId,time,beginTime,count);
						        }else{
									cronTaskHistoryRecords(cronTaskId,time,200,'数据同步成功',beginTime,count);
						        };
						    }
					    }
				    })
				 })
	   		});
		}
	},
    tableFileUpdate:function(req,res){
	    var tableName = req.param('tableName');
	    if(tableName == '' || tableName == '')
	    	return res.send({code: 404,msg: 'tableName is null',data: ''});
	    var taskName = tableName + "File";
		var taskFindSql = "select * from xfjwt_CronTask  "
		    + "where taskName = '"+taskName+"'";
		var taskFindSqlTotal = "select his.*,count(*) as total from xfjwt_CronTaskHistory his inner join xfjwt_CronTask task "
		    + "on task.CronTaskId = his.CronTaskId "
		    + "where task.taskName = '"+taskName+"' group by his.CronTaskId";
		var SJC,downFjSql,downFjSqlTotal,dataTotal;
		XFJWT_CronTask.find({TaskName: taskName})
		.exec(function(err,crontaskResult){
			if(err)
			    return res.send({code: 500,msg: 'databaseserr',data: err});
			if(crontaskResult == '' || crontaskResult == null)
			    return res.send({code: 404,msg: 'no '+tableName+'task',data: ''});
			XFJWT_CronTaskHistory.query(taskFindSql,function(err,findResult){
			    if(err)
					return res.send({code: 500,msg: 'databaseserr',data: err});
			    if(findResult == '' || findResult == null || findResult.total < 2){
					SJC = "2015-02-06 12:00:00";
			    }else{
					SJC = findResult[1].DataEndTime;
			    }
			    if(tableName == "YAGL_MHDW_FJXX" ){
			    	downFjSql = "select ID,FJDZ from "+tableName+" where FJDZ is not null and SJC > '"+SJC+"'";
			    	downFjSqlTotal = "select count(*) as total from "+tableName+" where FJDZ is not null and SJC > '"+SJC+"'";
				}else if(tableName == "YAGL_YATPXX" || tableName == "YAGL_YAZHTX"){	
					downFjSql = "select ID,URL from "+tableName+" where URL is not null and SJC > '"+SJC+"'";
					downFjSqlTotal = "select count(*) as total from "+tableName+" where URL is not null and SJC > '"+SJC+"'" ;
				}else if(tableName == "SY_SYJBXX"){
					downFjSql = "select sy.ID,xtbZP.URL as ZPWJ,xtbD.URL as FWTD,xtbN.URL as FWTN,xtbX.URL as FWTX,xtbB.URL as FWTB from "+tableName+" sy "
							  + " inner join XTB_XTBINDDXCC xtbZP on xtbZP.ID = sy.ZPWJURL "
							  + " inner join XTB_XTBINDDXCC xtbD on xtbD.ID = sy.FWTD "
							  + " inner join XTB_XTBINDDXCC xtbN on xtbN.ID = sy.FWTN "
							  + " inner join XTB_XTBINDDXCC XTbX on xtbX.ID = sy.FWTX "
							  + " inner join XTB_XTBINDDXCC XTbB on xtbB.ID = sy.FWTB "
							  + " where sy.ID is not null and SJC > '"+SJC+"'";
					downFjSql = "select count(*) as total from "+tableName+" sy "
							  + " inner join XTB_XTBINDDXCC xtbZP on xtbZP.ID = sy.ZPWJURL "
							  + " inner join XTB_XTBINDDXCC xtbD on xtbD.ID = sy.FWTD "
							  + " inner join XTB_XTBINDDXCC xtbN on xtbN.ID = sy.FWTN "
							  + " inner join XTB_XTBINDDXCC XTbX on xtbX.ID = sy.FWTX "
							  + " inner join XTB_XTBINDDXCC XTbB on xtbB.ID = sy.FWTB "
							  + " where sy.ID is not null and SJC > '"+SJC+"'";
				}
				YAGL_MHDW_FJXX.query(downFjSqlTotal,function(err,downFjSqlTotalResult){
					if(err)
						return res.send({code: 500,msg: 'data downFjSqlTotalResult baseserr',data: err});
					if(downFjSqlTotalResult == '' || downFjSqlTotalResult == null)
						return res.send({code: 403,msg: "no data find from "+tableName+"",data: ''});
					dataTotal = downFjSqlTotalResult[0].total;
				    YAGL_MHDW_FJXX.query(downFjSql,function(err,downFjSqlResult){
						if(err)
						    return res.send({code: 500,msg: 'data downFjSqlResult baseserr',data: err});
						var tuple = [];
						var entity;
						for (var i = 0; i < dataTotal; i++) {
							if(taskName == 'YAGL_MHDW_FJXX'){
						    	entity = new entityUrl(downFjSqlResult[i].ID,downFjSqlResult[i].FJDZ,"","","","","");
							}else if(tableName == "YAGL_YATPXX" || tableName == "YAGL_YAZHTX"){
								entity = new entityUrl(downFjSqlResult[i].ID,downFjSqlResult[i].URL,"","","","","");
							}else if(tableName == 'SY_SYJBXX'){
								entity = new entitySY(downFjSqlResult[i].ID,"",downFjSqlResult[i].ZPWJ,downFjSqlResult[i].FWTD,downFjSqlResult[i].FWTN,downFjSqlResult[i].FWTX,downFjSqlResult[i].FWTB);
							}
						    tuple.push(entity);
						}
						var count = 0;
						wgetCmdFunction(res,tuple,dataTotal,count,dataUpdateUrl,tableName);
				    })
				})
			})
		})

		function wgetCmdFunction(res,tuple,total,count,dataUpdateUrl,tableName){
		    if(count == total)
				return res.send({code: 200,msg: 'data update successfully',data: ''});
		    var endstr = tuple[count].split('.').pop();
		    var type;
		    if(positon.length > 4)
				type = '.jpg';
		    type = endstr;
		    if(tableName == 'SY_SYJBXX'){
		    	var wgt = "wget -O "+sails.config.values[tableName] + tuple[count].ID+"."+type+" " + dataUpdateUrl;
		    	var zpwj = wgt + tuple[count].ZPWJ;
		    	var fwtd = wgt + tuple[count].FWTD;
		    	var fwtn = wgt + tuple[count].FWTN;
		    	var fwtx = wgt + tuple[count].FWTX;
		    	var fwtb = wgt + tuple[count].FWTB;
		    	var scpGG = "scp " + sails.config.values[tableName] + tuple[count].ID+"."+type+" ";
		    	var scpwj = scpGG + sails.config.values.AP1FilePath.SY_SYZPWJ;
		    	var scpfwtd = scpGG + sails.config.values.AP1FilePath.SY_SYFWTD;
		    	var scpfwtn = scpGG + sails.config.values.AP1FilePath.SY_SYFWTN;
		    	var scpfwtx = scpGG + sails.config.values.AP1FilePath.SY_SYFWTX;
		    	var scpfwtb = scpGG + sails.config.values.AP1FilePath.SY_SYFWTB;
		    	var childzp = wgetCmd(zpwj,function(error, stdout, stderr){
					if(error)
					    return res.send({code: 500,msg: 'data update err',data: error});
					var childSecondzp = wgetCmd(scpwj,function(error,stdout,stderr){
					    if(error)
							return res.send({code: 500,msg: 'data update err',data: error});
					    var childfwtd = wgetCmd(fwtd,function(error, stdout, stderr){
							if(error)
							    return res.send({code: 500,msg: 'data update err',data: error});
							var childSecondfwtd = wgetCmd(scpfwtd,function(error,stdout,stderr){
							    if(error)
									return res.send({code: 500,msg: 'data update err',data: error});
							    var childfwtn = wgetCmd(fwtn,function(error, stdout, stderr){
									if(error)
									    return res.send({code: 500,msg: 'data update err',data: error});
									var childSecondfwtn = wgetCmd(scpfwtn,function(error,stdout,stderr){
									    if(error)
											return res.send({code: 500,msg: 'data update err',data: error});
							    		var childfwtx = wgetCmd(fwtx,function(error, stdout, stderr){
											if(error)
											    return res.send({code: 500,msg: 'data update err',data: error});
											var childSecondfwtx = wgetCmd(scpfwtx,function(error,stdout,stderr){
											    if(error)
													return res.send({code: 500,msg: 'data update err',data: error});
											    var childfwtb = wgetCmd(fwtb,function(error, stdout, stderr){
													if(error)
													    return res.send({code: 500,msg: 'data update err',data: error});
													var childSecondfwtb = wgetCmd(scpfwtb,function(error,stdout,stderr){
													    if(error)
															return res.send({code: 500,msg: 'data update err',data: error});
													 	count = count + 1;
														wgetCmdFunction(res,tuple,total,count,dataUpdateUrl,tableName); 	
													})
											    })											    	
											})
									    })							    	
									})
							    })							    	
							})
					    })	
					})
			    })
		    }else{
			    var child = wgetCmd("wget -O "+sails.config.values[tableName] + tuple[count].ID+"."+type+" " + dataUpdateUrl + tuple[count].URL,function(error, stdout, stderr){
				if(error)
				    return res.send({code: 500,msg: 'data update err',data: error});
				var childSecond = wgetCmd("scp " + sails.config.values[tableName] + tuple[count].ID+"."+type+" " + sails.config.values.AP1FilePath[tableName],function(error,stdout,stderr){
				    if(error)
						return res.send({code: 500,msg: 'data update err',data: error});
				    	count = count + 1;
				   		wgetCmdFunction(res,tuple,total,count,tableName,dataUpdateUrl);
					})
			    })
			}
		}
		function entityURL(ID,URL,ZPWJ,FWTD,FWTN,FWTX,FWTB){
			this.ID = ID;
			this.URL = URL;
			this.ZPWJ = ZPWJ;
			this.FWTD = FWTD;
			this.FWTX = FWTX;
			this.FWTB = FWTB;
		}
    },
    SYJBXXFileUpdate:function(req,res){
	var taskFindSql = "select * from xfjwt_CronTask where taskName = " 
	    + " 'SY_SYJBXXFile'";
	var taskFindSqlTotal = "select his.*,count(*) as total from "
	    + " xfjwt_CronTaskHistory his inner join xfjwt_CronTask task "
	    + " on task.CronTaskId = his.CronTaskId where task.taskName = "
	    + " 'SY_SYJBXX' group by his.CronTaskId";
	var CJSJ;
	XFJWT_CronTask.find({TaskName: 'SY_SYJBXX'})
	    .exec(function(err,crontaskResult){
		if(err)
		    return res.send({code:500,msg:'database err',data: err});
		
	    })
    },
    tableFileUpdateaccordIDURL:function(req,res){
	var ID = req.param('ID');
	var URL = req.param('URL');
	
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
