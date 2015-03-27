module.exports = {

	login: function(req,res){
		var permission = [];
		var sql = "select `jg`.`SJJGID` AS `SJJGID`,`ry`.`SJJGID` AS `OrganizationId`,`jg`.`JGJC` "
				+ "AS `OrgName`,`dm`.`DMMC` AS `Status`,count(1) AS `Cnt` "
				+ "from (((`RYXX_RYJBXX` `ry` join `DM_SJZD` `dm` on(((`dm`.`DMZ` = `ry`.`ZWQKDM`) "
				+ "and (`dm`.`JLZT` = 1)))) join `DM_SJZDZB` `zb` on(((`zb`.`ID` = `dm`.`DM_SJZD_ID`) "
                + "and (`zb`.`ZDDM` = 'ZWQK') and (`zb`.`JLZT` = 1)))) join `JGXX_XFJG` `jg` "
                + "on((`ry`.`SJJGID` = `jg`.`ID`))) where (`ry`.`SJJGID` in "
                + "(select `JGXX_XFJG`.`ID` from `JGXX_XFJG` where (((`JGXX_XFJG`.`JGLB` = '1') "
                + "and (`JGXX_XFJG`.`JGTREE` like concat((select `JGXX_XFJG`.`JGTREE` from `JGXX_XFJG` "
                + "where (`JGXX_XFJG`.`ID` = '380c59ba34aa4e879f60d3fb228bb934')),'%'))) or "
                + "(`JGXX_XFJG`.`ID` = '380c59ba34aa4e879f60d3fb228bb934'))) and (`ry`.`JLZT` = 1) "
                + "and ((`jg`.`JGXZDM` like '03%') or (`jg`.`JGXZDM` like '05%') or "
                + "(`jg`.`JGXZDM` like '09%'))) group by `ry`.`SJJGID`,`jg`.`JGJC`,`dm`.`DMMC` "
                + "order by `ry`.`SJJGID`,`jg`.`JGJC`,`dm`.`DMMC`";

        var sql0 =" select ID,SJJGID,JGMC from JGXX_XFJG where JLZT = 1 and (JGXZDM like '03%' or JGXZDM like '05%' or JGXZDM like '09%') and (  JGLB='1' and JGTREE like "
				+ "(concat(( select JGTREE from JGXX_XFJG where ID='380c59ba34aa4e879f60d3fb228bb934'),'%' )) "
	            + "or ID='380c59ba34aa4e879f60d3fb228bb934')";
         console.log(sql0);
		JGXX_XFJG.query(sql0,function(err,r){
			if(err)
				return res.send({code: 500,msg: 'database err',data: err});
			if(r.length == 0)
				return res.send({code: 404,msg: 'there is nothing',data:'nothing'});
			for(var i = 0;i < r.length;i++){
				permission.push(r[i])
			}
			var info = {
				Name: 'dishy',
				OrganiztionId: '380c59ba34aa4e879f60d3fb228bb934',
				OrgName:'岳阳支队',
				Permission:permission
			}
			//console.log(cookies);
			//var clo = req.cookies
			req.session.info = info;
			//console.log(info);
			return res.send(info);
		})
		
	}
}
