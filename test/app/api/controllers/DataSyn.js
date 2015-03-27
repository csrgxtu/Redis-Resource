var parseString = require('xml2js').parseString;
var url = "http://tempuri.org/IDataSynchroService/SyschroDataOfString";

var BasicHttpBinding = require('wcf.js').BasicHttpBinding
      , Proxy = require('wcf.js').Proxy
      , binding = new BasicHttpBinding(
            { SecurityMode: "None"
            })
      , proxy = new Proxy(binding, "http://192.168.1.106:11055/DataSynchroService");
 module.exports = {

 	dataUpdate: function(req,res){
 		var data = [];
 		message =  '<?xml version="1.0" encoding="utf-8"?>'
						+ '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
						+ '<soap:Header />'
						 + '<soap:Body>'
							+ '<SyschroDataOfString xmlns="http://tempuri.org/">'
							  + '<tableName>RYXX_RYJBXX</tableName>'
							  + '<JGID>ac688795e4694bde9016a02d2218a2c2</JGID>'
							  + '<beginTime>2014-01-01 00:00:00</beginTime>'
							  + '<endTime>2014-12-01 00:00:00</endTime>'
							+ '</SyschroDataOfString>'
						  + '</soap:Body>'
						+ '</soap:Envelope>';
		getTableData(message,url);	
		function getTableData(mes,ur){
			proxy.send(mes, ur, function(response, ctx) {
				parseString(response, function(err, result) {
				    if (err) {
						console.log(err);
				    }
				    var completed = result['s:Envelope']['s:Body'][0].SyschroDataOfStringResponse[0].isCompleted;
				    console.log("isCompleted = " + completed);
				      
				    var str = result['s:Envelope']['s:Body'][0].SyschroDataOfStringResponse[0].SyschroDataOfStringResult;
				    parseString(str,function(err,res){
				        if (err) {
					       console.log(err);
					       return res.send({
					       		code: 500,
					       		mgs: 2
					       })
				        }
				        var list = res.MainMsg.RYXX_RYJBXX;
				      	var len = res.MainMsg.RYXX_RYJBXX.length;
				        //console.log(res.MainMsg.RYXX_RYJBXX.length);
				        for(var i = 0;i < len; i++){
				        	data.push(list[i])
				        }
				        if (completed == 0) {
				        	getTableData(mes,ur);
				        }else{
				        	console.log("dataresponse:"+JSON.stringify(data));
							console.log("dataresponselength:"+data.length);
				      	  	return res.send({
				      	  		code: 200,
				      	  		msg:'sucess',
				      	  		data: data
				      	  	});
				        };
				    })
				 })
	   		});
		}

 	}
 }