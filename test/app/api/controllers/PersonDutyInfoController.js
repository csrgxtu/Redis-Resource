module.exports = {

	getPersonInfo: function(req,res){
		var orgName = req.param('orgName');
		if(orgName == null || orgName == '')
			return res.send({code: 404,msg: 'plase set orgName param right',data:''})
		var sql= "select j1.ID,j1.JGMC,j1.JGJC,j2.JGMC as SJMC from JGXX_XFJG j1 "
			   + "inner join JGXX_XFJG j2 on j2.ID = j1.SJJGID where j2.JGMC like'%"+orgName+"%'" ;
		JGXX_XFJG.query(sql,function(err,r0){
			if(err)
				return res.send({code: 500,msg: 'database err',data: err});
			if(r0.length == 0)
				return res.send({code: 404,msg: 'there is nothing',data:'nothing'});
			var sql0 = "select * from RYXX_RYJBXX where SJJGID = '"+r0[0].ID+"'";
			console.log("sql0:"+sql0);
			RYXX_RYJBXX.query(sql0,function(err,r1){
				if(err)
					return res.send({code: 500,msg: 'database err1',data: err});
			})
			//return res.send({code: 200,msg: 'success',data:r0});
		})
	},

	getPersonInfoZDDM: function(req,res){
		var sql = "select ID,DM_SJZD_ID,DMMC from DM_SJZD where DM_SJZD_ID = '94DB1B4C01894F6AA0791D7849B7B01F'";
		DM_SJZD.query(sql,function(err,r0){
			if(err)
				return res.send({code: 500,msg: 'database err',data: err});
			return res.send({code: 200,msg: 'success',data:r0});
		})
	}
}