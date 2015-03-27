module.exports = {
	getZQinfo: function(req,res){
		var contentType = res.getHeader('content-type');
		console.log(contentType);
		var startTime = req.param('startTime');
		var endTime = req.param('endTime');
		var JGJC = req.param('JGJC');
		var JGTREE = req.param('JGTREE');
		var pageIndex = req.param('pageIndex');
		var pageSize = req.param('pageSize');
		if(pageIndex == null || pageIndex == '' || pageSize == null || pageSize == '')
			return res.send({code: 403,msg: 'you should set pageInfo',data: ''});
		var start = (pageIndex - 1) * pageSize;
		if(startTime == '' || startTime == null)
			startTime = "2014-01-01 00:00:00";
		
		var permission = req.session.loginInfo.userInfo.Permission;
		var permissionIDS = [];
		for(var i = 0;i < permission.length; i++){
			permissionIDS.push("'"+permission[i].ID+"'");
		}
		var str_p = permissionIDS.join(",");
		var sql = "SELECT jg.JGJC,jg.JGTREE,zq.ID,zq.BJR,zq.LXDH,dmZT.DMMC as 'ZQSTATUS',dmLX.DMMC as 'ZQTYPE',dmDJ.DMMC as 'ZQLEVEL',dmCZ.DMMC AS 'OBJHANDLE',zq.TSSJ as 'SENDTIME',"
				+ "zq.ZQJSSJ as 'OVERTIME',zq.ZHDD as 'ZQADRESS',zq.GIS_X,zq.GIS_Y,zq.GIS_Y,"
                + "zq.ZDDWID,zq.ZDDWMC as 'ZDDWMC',dwLX.DMMC as 'DWTYPE',zq.ZQMS as 'ZQDESCRIBLE' ";
        var sqlTotal = "select count(*) as total";
        var centStr = " from ZHDD_ZQXX zq "
				+ "left join (select dm1.DMZ,dm1.DMMC from DM_SJZD dm1 "
				+ "inner join DM_SJZDZB dm2 on (dm1.DM_SJZD_ID = dm2.ID and dm2.ZDDM = 'ZQZT' and dm1.JLZT = '1')) dmZT on zq.ZQZT = dmZT.DMZ "
				+ "LEFT JOIN (select dm1.DMZ,dm1.DMMC from DM_SJZD dm1 "
				+ "inner join DM_SJZDZB dm2 on (dm1.DM_SJZD_ID = dm2.ID and dm2.ZDDM = 'DWLX' and dm1.JLZT = '1')) dwLX on  zq.DWLXDM = dwLX.DMZ "
				+ "left join (select dm1.DMZ,dm1.DMMC from DM_SJZD dm1 "
				+ "inner join DM_SJZDZB dm2 on (dm1.DM_SJZD_ID = dm2.ID and dm2.ZDDM = 'ZHLX' and dm1.JLZT = '1')) dmLX on zq.ZQLXDM = dmLX.DMZ "
				+ "LEFT JOIN (select dm1.DMZ,dm1.DMMC from DM_SJZD dm1 "
				+ "inner join DM_SJZDZB dm2 on (dm1.DM_SJZD_ID = dm2.ID and dm2.ZDDM = 'ZHDJ' and dm1.JLZT = '1')) dmDJ on zq.ZHDJDM = dmDJ.DMZ "
				+ "LEFT JOIN (select dm1.DMZ,dm1.DMMC from DM_SJZD dm1 "
				+ "inner join DM_SJZDZB dm2 on (dm1.DM_SJZD_ID = dm2.ID and dm2.ZDDM = 'ZHCS' and dm1.JLZT = '1')) dmCZ on zq.CZDXDM = dmCZ.DMZ "
		if(JGTREE != null && JGTREE != ''){
			centStr	+= " inner join JGXX_XFJG jg on (jg.ID = zq.XQZDJGDM and jg.JLZT = '1'  and jg.JGTREE like '" +JGTREE+ "%') ";
		}else{
			centStr	+= " inner join JGXX_XFJG jg on (jg.ID = zq.XQZDJGDM and jg.JLZT = '1') ";
		}
		var endStr = "";
		if(endTime == '' || endTime == null){
			endStr = " where zq.JLZT = '1'  and zq.TSSJ > '"+startTime+"'";
		}else{
			endStr = " where zq.JLZT = '1'  and zq.TSSJ > '"+startTime+"' and zq.ZQJSSJ < '"+endTime+"' ";
		}
		var sql = sql + centStr + endStr + " order by zq.TSSJ desc limit "+start+","+pageSize+"";
		var sqlTotal = sqlTotal + centStr + endStr;
		//console.log('ZQSql = ' + sql);
		XFJWT_Resource.query(sql,function(err,result){
			if(err)
				return res.send({code: 500,msg: 'databases err',data: err});
			XFJWT_Resource.query(sqlTotal,function(err,resultTotal){
				if(err)
					return res.send({code: 500,msg: 'databases total err',data: err});
				return res.send({code: 200,msg: 'successfully',total: resultTotal[0].total,data: result});
			})
			
		})
	},

	getCLInfo: function(req,res){
		var permission = req.session.loginInfo.userInfo.Permission;
		var permissionIDS = [];
		for(var i = 0;i < permission.length; i++){
			permissionIDS.push("'"+permission[i].ID+"'");
		}
		var str_p = permissionIDS.join(",");
		var sql = "select cl.ID,jg.JGJC as SSJG,zt.DMMC as CLZT,cl.ZBMC,cl.CPHM,dj.DMMC as ZBDJ,lx.DMMC as ZBLX from WL_CLXX cl "
				+ "INNER JOIN JGXX_XFJG jg "
				+ "on (cl.SSXFJGID = jg.ID and jg.ID in ( " +str_p+ "))"
				/*+ "select ID  from JGXX_XFJG where JLZT = 1 and (JGXZDM like '03%' or JGXZDM like '05%' or JGXZDM like '09%') and (  JGLB='1' and JGTREE like "
				+ "(concat(( select JGTREE from JGXX_XFJG where ID='380c59ba34aa4e879f60d3fb228bb934'),'%' )) "
				+ "or ID='380c59ba34aa4e879f60d3fb228bb934'))) "*/
				+ "left join DM_SJZD zt on (zt.DM_SJZD_ID = (select ID from DM_SJZDZB where ZDDM = 'CLZT') and zt.DMZ = cl.CLZTDM_MH and zt.JLZT = '1') "
				+ "left join DM_SJZD dj on (dj.DM_SJZD_ID = (select ID from DM_SJZDZB where ZDDM = 'CLDJ') and dj.DMZ = cl.CLDJDM and dj.JLZT = '1') "
				+ "left join DM_SJZD lx on (lx.DM_SJZD_ID = (select ID from DM_SJZDZB where ZDDM = 'ZBQCLB') and lx.DMZ = cl.ZBLXDM and lx.JLZT = '1') "
				+ "where cl.ZBBM like '21%' and cl.JLZT = '1'";
		XFJWT_Resource.query(sql,function(err,result){
			if(err)
				return res.send({code: 500,msg: 'databases err',data: err});
			return res.send({code: 200,msg: 'successfully',data: result});
		})
	},
	getDPCLANDWSInfo: function(req,res){
		var ZQID = req.param('ZQID');
		if(ZQID == null || ZQID == '')
			return res.send({code: 403,msg: 'set ID param',data: ''});
		var sql = "select jg.JGMC,fa.ZQUUID,cl.CLID,zt.DMMC,cl.CLMC,cl.CPHM,cl.DPSL from ZHDD_DPCL cl "
				+ "INNER JOIN JGXX_XFJG jg on (cl.XFJGDM = jg.ID and jg.JLZT = '1') "
				+ "INNER JOIN WL_CLXX cl1 on (cl1.ID = cl.CLID ) "
				+ "left join DM_SJZD zt on (zt.DM_SJZD_ID = (select ID from DM_SJZDZB where ZDDM = 'CLZT') and zt.DMZ = cl1.CLZTDM_MH and zt.JLZT = '1') "
				+ "INNER JOIN ZHDD_DPFA fa on (fa.ID = cl.CDDID and fa.ZQUUID = '"+ZQID+"' and fa.JLZT = '1') ";
		//console.log("ZQINFO getDPCLANDWSInfo sql = " + sql);
		XFJWT_Resource.query(sql,function(err,result){
			if(err)
				return res.send({code: 500,msg: 'databases err',data: err});
			var sqlWS = "select FKSJ,FKNR from ZHDD_HCWS where ZQUUID = '"+ZQID+"'";
			XFJWT_Resource.query(sqlWS,function(err,WSresult){
				if(err)
					return res.send({code: 500,msg: 'databases err',data: err});
				var sqlZQXX = "select * from ZHDD_ZQXX where ID = '"+ZQID+"'";
				XFJWT_Resource.query(sqlZQXX,function(err,resZQXX){
					if(err)
						return res.send({code: 500,msg: 'databases err',data: err});
					return res.send({code: 200,msg: 'successfully',HCWS: WSresult,ZQInfo: resZQXX,data: result});
				})
			})
		})
	}
}