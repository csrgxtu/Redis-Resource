var HashTable = require('hashtable');
var ryhashtable = new HashTable();
module.exports = {

	getNbzjxx: function(){
		//zjly  ZDDM = 'ZYLY'   RYXX_ZJLY.ZJLYDM = DM_SJZD.DMZ
		var tmpValue = {};
		var sqlLYMC = "select zjly.DMZ,zjly.DMMC from DM_SJZD zjly inner join DM_SJZDZB ZB on (ZB.ZDDM = 'ZYLY' and zjly.DM_SJZD_ID = ZB.ID) where zjly.JLZT = 1";
		var sqlZW = "select zw.DMZ,zw.DMMC from DM_SJZD zw inner join DM_SJZDZB zwZB on (zwZB.ZDDM = 'ZW' and zw.DM_SJZD_ID = zwZB.ID)";
		var sqlGW = "select gw.DMZ,gw.DMMC from DM_SJZD gw inner join DM_SJZDZB gwZB on (gwZB.ZDDM = 'GW' and gw.DM_SJZD_ID = gwZB.ID)";
		var sqlXB = "select xb.DMZ,xb.DMMC from DM_SJZD xb inner join DM_SJZDZB xbZB on (xbZB.ZDDM = 'xb' and xb.DM_SJZD_ID = xbZB.ID)";
		XFJWT_CronTask.query(sqlLYMC,function(err,sqlLYMCResult){
			if(err)
				console.log("sqlLYMC err:" + err);
			//console.log(sqlLYMCResult);
			for(var i = 0;i < sqlLYMCResult.length;i++){
				tmpValue[sqlLYMCResult[i].DMZ] = sqlLYMCResult[i].DMMC;
			}
			ryhashtable.put('zjly',tmpValue);			
			//sails.config.OffLineData.ryZJLY = tmpValue;
			XFJWT_CronTask.query(sqlZW,function(err,sqlZWResult){
				if(err)
					console.log("sqlZW err:" + err);
				//console.log(sqlZWResult);
				tmpValue = {};
				for(var i = 0;i < sqlZWResult.length;i++){
					tmpValue[sqlZWResult[i].DMZ] = sqlZWResult[i].DMMC;
				}			
				ryhashtable.put('zw',tmpValue);
				//sails.config.OffLineData.ryZJLY = tmpValue;	
				XFJWT_CronTask.query(sqlGW,function(err,sqlGWResult){
					if(err)
						console.log("sqlZW err:" + err);
					tmpValue = {};
					for(var i = 0;i < sqlGWResult.length;i++){
					tmpValue[sqlGWResult[i].DMZ] = sqlGWResult[i].DMMC;
					}
					ryhashtable.put('gw',tmpValue);			
					//sails.config.OffLineData.ryZJLY = tmpValue;			
					//console.log(sqlGWResult);
					XFJWT_CronTask.query(sqlXB,function(err,sqlXBResult){
						if(err)
							console.log("sqlXB err:" + err);
						//console.log(sqlXBResult);
						tmpValue = {};
						for(var i = 0;i < sqlXBResult.length;i++){
							tmpValue[sqlXBResult[i].DMZ] = sqlXBResult[i].DMMC;
						}

						//console.log(tmpValue);
						//sails.config.OffLineData.ryXB = tmpValue;

						ryhashtable.put('xb',tmpValue);
						//console.log(ryhashtable);
						sails.config.OffLineData.ryZJLY = ryhashtable;
						//console.log(sails.config.OffLineData.ryZJLY.get('gw'));
						var nbzjSql = "select ry.ID,ry.XM,jg.JGTREE,jg.JGJC,ry.ZWDM,ry.GWDM,ry.XBDM,zj.ZJLYDM,dh.BGDH from RYXX_RYJBXX ry inner join RYXX_ZJLY zj on zj.RYID = ry.ID "
								  + "inner join JGXX_XFJG jg on jg.ID = ry.SJJGID left join RYXX_RYTXL dh on dh.RYID = ry.ID " 
								  + "where (ry.SJJGID in (select ID from JGXX_XFJG  where JGTREE like '0100000043000000%')) "
								  + " and ry.SFZJ = 1 order by jg.JGTREE,ry.XM";
						var nbzjSqlTotal =  "select count(*) as total from RYXX_RYJBXX ry inner join RYXX_ZJLY zj on zj.RYID = ry.ID "
								  + "inner join JGXX_XFJG jg on jg.ID = ry.SJJGID "
								  + "where (ry.SJJGID in (select ID from JGXX_XFJG  where JGTREE like '0100000043000000%'))  and ry.SFZJ = 1";
						console.log('nbzjSql = ' + nbzjSql);
						XFJWT_CronTask.query(nbzjSqlTotal,function(err,nbzjSqlTotalResult){
							if(err)
								return res.send({code: 500,msg: 'database err',data: err});
							if(nbzjSqlTotalResult == null || nbzjSqlTotalResult == '')
								return res.send({code: 404,msg: 'no data',data: ''});
							XFJWT_CronTask.query(nbzjSql,function(err,nbzjSqlResult){
								if(err)
									return res.send({code: 500,msg: 'database err',data: err});
								if(nbzjSqlResult == null || nbzjSqlResult == '')
									return res.send({code: 404,msg: 'nbzjSqlResult is null',data:''});
								var tmpValues = [];
								var n = 0;
								nbzjSqlResult[0].ZW = sails.config.OffLineData.ryZJLY.get('zw')[nbzjSqlResult[0].ZWDM];
								nbzjSqlResult[0].GW = sails.config.OffLineData.ryZJLY.get('gw')[nbzjSqlResult[0].GWDM];
								nbzjSqlResult[0].DMZ = '';
								nbzjSqlResult[0].XB = sails.config.OffLineData.ryZJLY.get('xb')[nbzjSqlResult[0].XBDM];
								if(sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[0].ZJLYDM] !=null && sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[0].ZJLYDM] != ''){
									nbzjSqlResult[0].LY = sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[0].ZJLYDM];
									nbzjSqlResult[0].DMZLIST = nbzjSqlResult[0].ZJLYDM;					
								}else{
									nbzjSqlResult[0].LY = '';
									nbzjSqlResult[0].DMZLIST = '';
								}
								
								tmpValues[0] = nbzjSqlResult[0];
								for(var i = 1;i<nbzjSqlResult.length;i++){
									nbzjSqlResult[i].ZW = sails.config.OffLineData.ryZJLY.get('zw')[nbzjSqlResult[i].ZWDM];
									nbzjSqlResult[i].GW = sails.config.OffLineData.ryZJLY.get('gw')[nbzjSqlResult[i].GWDM];
									nbzjSqlResult[i].XB = sails.config.OffLineData.ryZJLY.get('xb')[nbzjSqlResult[i].XBDM];
									if(nbzjSqlResult[i].ZW == 'undefined' || nbzjSqlResult[i].ZW == '' || nbzjSqlResult[i].ZW == null)
										nbzjSqlResult[i].ZW = '';
									if(nbzjSqlResult[i].GW == 'undefined' || nbzjSqlResult[i].GW == '' || nbzjSqlResult[i].GW == null)
										nbzjSqlResult[i].GW = '';
									if(sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[i].ZJLYDM] !=null && sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[i].ZJLYDM] != ''){
										nbzjSqlResult[i].LY = sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[i].ZJLYDM];
										nbzjSqlResult[i].DMZLIST = 	nbzjSqlResult[i].ZJLYDM;				
									}else{
										nbzjSqlResult[i].LY = '';
										nbzjSqlResult[i].DMZLIST = '';
									}
									if(nbzjSqlResult[i].ID == nbzjSqlResult[i-1].ID){
										if(tmpValues[n].LY != null && tmpValues[n].LY != ''){
											tmpValues[n].LY = tmpValues[n].LY  + "," + sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[i].ZJLYDM];
											tmpValues[n].DMZLIST = tmpValues[n].DMZLIST + "," + nbzjSqlResult[i].ZJLYDM;
										}else{
											tmpValues[n].LY = sails.config.OffLineData.ryZJLY.get('zjly')[nbzjSqlResult[i].ZJLYDM];
											tmpValues[n].DMZLIST =  nbzjSqlResult[i].ZJLYDM;
										}
									}else{
										n++;
										tmpValues[n] = nbzjSqlResult[i];
									}
								}

								//console.log(sails.config.OffLineData.ryZJLY.get('zw'));
								//console.log('total = ' + tmpValues.length);
								ryhashtable.put('zjxx',tmpValues);
								ryhashtable.put('total',tmpValues.length);
								//sails.config.OffLineData.ryZJLY = ryhashtable;
								//return res.send({code: 200,msg: 'success',total: nbzjSqlTotalResult[0].total,data: tmpValues});				
							})
						})
					})									

				})			
			})
		})
	}

}