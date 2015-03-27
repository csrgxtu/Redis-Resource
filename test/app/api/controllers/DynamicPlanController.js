/**
 * Author: Archer Reilly
 * Date: 11/Jan/2014
 * File: DynamicPlanController.js
 * Desc: controller for dynamic plan
 *
 * Produced By Ebang.
 */
module.exports = {
  /**
   * index
   * view
   *
   */
  index: function(req, res) {
    console.log('DEBUG: ');
    console.log(sails.config.OffLineData.codes.get(req.param('q')));
    return res.send('there is no view');
  },

  /**
   * detail
   *
   * @param id string
   * @return view
   */
  detail: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var sql = "SELECT DXMC FROM YAGL_YAJBXX WHERE DXID = '" + id
      + "'";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK)
      }
      
      var DXMC = recs[0].DXMC;
      return res.view('xfjwt/dynamicPlan', {layout: null, id: id, dxmc: DXMC});
    });
  },
  
  /**
   * getData
   * get data from table, all in one
   *
   * @param id string
   * @return RESTful Json
   */
  getData: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
   
    var sql1 = "SELECT JBXX.YABH AS YABH, JBXX.YAZL AS YAZL, JBXX.DXMC AS DXMC,"
      + " MHDW.DWDZ AS DXDZ, JBXX.SFKQY AS SFKQY, JBXX.SFMYA AS SFMYA,"
      + " XFJG.JGMC AS ZZDWID, JBXX.ZZRMC AS ZZRMC, JBXX.ZZRQ AS ZZRQ FROM "
      + " YAGL_YAJBXX JBXX LEFT JOIN YAGL_YAQTDXXX QTDXXX ON JBXX.DXID = "
      + " QTDXXX.ID LEFT JOIN JGXX_XFJG XFJG ON XFJG.ID = JBXX.ZZDWID"
      + " LEFT JOIN YAGL_MHDW MHDW ON MHDW.ID = JBXX.DXID"
      + " WHERE JBXX.DXID = '" + id + "'";
    var sql2 = "SELECT MHDW.DWMC, MHDW.DWPYJC, MHDW.DWDZ,"
      + " MHDW.DWDH, MHDW.YZBM, MHDW.DWDZYX, MHDW.DWDJ"
      + ", MHDW.XZQY, MHDW.DWCLSJ, MHDW.DWXZ,"
      + " MHDW.FRDB, MHDW.FRDBDH, MHDW.AQZRR,"
      + " MHDW.FRDBDH, MHDW.AQZRRSFZ, MHDW.AQZRRDH"
      + ", MHDW.ZJZXFGLR, MHDW.ZJZXFGLRSFZ"
      + ", MHDW.ZJZXFGLRDH, MHDW.DWZSX"
      + ", MHDW.DWCSX, MHDW.JJSYZ, XFJG.JGMC AS XFGXJGID"
      + ", MHDW.GDZC, MHDW.ZDMJ, MHDW.JZMJ,"
      + " MHDW.JZSL, MHDW.ZGRS, MHDW.ZDXFSS,"
      + " MHDW.GIS_X, MHDW.GIS_Y, MHDW.BZ, MHDW.DLWZ"
      + " FROM YAGL_MHDW MHDW INNER JOIN JGXX_XFJG XFJG ON XFJG.ID = MHDW.XFGXJGID"
      + " WHERE MHDW.ID = '" + id + "'";
    var sql3 = "";
    var sql4 = "SELECT ZDBWMC, ZDBWWZ,"
      + " SZCS, SZGD, JZMJ,"
      + " XFDTS, SSCKS, AQCKS,"
      + " JZJGDM, SYXZDM, FHBZSLQKDM"
      + ", WXYQKDM, HZQKDM,"
      + " NHDJDM, MHSS, WXX,"
      + " CZCS, ZYSX, ZRR,"
      + " LXDH"
      + " FROM YAGL_MHDW_ZDBW WHERE MHDWID = '" + id + "'";
    var sql5 = "SELECT DWJBQKMS, ZBPLQK,"
      + " XFTDHSLTD, NBXFSS,"
      + " FHSS, XFKZSXX, QT"
      + " FROM YAGL_MHDW_KZXX WHERE MHDWID = '" + id + "'";
    var sql6 = "SELECT '无' AS ZQGM, FSDD,"
      + " '无' AS ZQTD, ZQSD.BZ FROM YAGL_ZQSD ZQSD INNER JOIN YAGL_YAJBXX JBXX"
      + " ON JBXX.ID = ZQSD.YAID WHERE JBXX.DXID = '" + id + "'";
    var sql7 = "SELECT XFJG.JGMC AS SSDWID, CLLXDM, CLDJDM, SJZD.DMMC AS ZZGNDM"
      + ", CPHM, '无' AS GJCS FROM YAGL_CLDJ"
      + " CLDJ INNER JOIN JGXX_XFJG XFJG ON XFJG.ID = CLDJ.SSDWID"
      + " INNER JOIN YAGL_YAJBXX JBXX ON JBXX.ID = CLDJ.YAID INNER JOIN "
      + " DM_SJZD SJZD on SJZD.DMZ = CLDJ.ZZGNDM "
      + " WHERE"
      + " JBXX.DXID = '" + id + "' and SJZD.DM_SJZD_ID = 'F62580E917D64A72BA5AAF5B1F2F4B6D'";
    var sql8 = "SELECT sjzd.DMMC AS ZBMC, XFJG.JGMC AS SSDWID, QTZBDJ.ZBSL"
      + " FROM YAGL_QTZBDJ QTZBDJ INNER JOIN JGXX_XFJG XFJG"
      + " ON XFJG.ID = QTZBDJ.SSDWID INNER JOIN YAGL_YAJBXX JBXX ON"
      + " JBXX.ID = QTZBDJ.YAID inner join DM_SJZD sjzd on "
      + " sjzd.DMZ = QTZBDJ.ZBLXDM WHERE JBXX.DXID = '" + id + "'"
      + " and sjzd.DM_SJZD_ID = '64140328C93C4B09BF06DD3A3D1148F3'";
    var sql9 = "";
    var sql10 = "SELECT ZJDJXX.CZYXM AS ZJID, xfjg.JGMC AS ZJSS, txl.YDDH AS LXDH,"
      + " ZJLY FROM YAGL_ZJDJXX ZJDJXX INNER JOIN YAGL_YAJBXX JBXX ON"
      + " JBXX.ID = ZJDJXX.YAID inner join RYXX_RYTXL txl on txl.RYID = "
      + " ZJDJXX.ZJID inner join RYXX_RYJBXX jbxx on jbxx.ID = txl.RYID"
      + " inner join JGXX_XFJG xfjg on xfjg.ID = jbxx.SJJGID WHERE JBXX.DXID = '" + id + "'";
    var sql11 = "SELECT XFJG.JGMC AS SSDWID, CLLXDM, CPHM,"
      + " '无' AS BSWZ, '无' AS BSRW, '无' AS ZRR, '无' AS BZ"
      + " FROM YAGL_CLDJ CLDJ INNER JOIN JGXX_XFJG XFJG ON"
      + " XFJG.ID = CLDJ.SSDWID INNER JOIN YAGL_YAJBXX JBXX ON"
      + " JBXX.ID = CLDJ.YAID WHERE JBXX.DXID = '" + id + "'";
    var sql12 = "";
    var sql13 = "";
    var sql14 = "SELECT GWMC, ZZ, SM"
      + " FROM YAGL_ZHZZJGJZZ ZHZZJGJZZ INNER JOIN YAGL_YAJBXX JBXX ON"
      + " JBXX.ID = ZHZZJGJZZ.YAID WHERE JBXX.DXID = '" + id + "'";
    var sql15 = "SELECT XFJG.JGMC AS DJJGID, TXDH FROM"
      + " YAGL_TXDH TXDH INNER JOIN JGXX_XFJG XFJG ON"
      + " XFJG.ID = TXDH.DJJGID INNER JOIN YAGL_YAJBXX JBXX ON"
      + " JBXX.ID = TXDH.YAID WHERE JBXX.DXID = '" + id + "'";
    var sql16 = "SELECT DWMC, BZDWLX as BZLB, LXDH"
      + ", RWYFF, ZYLX, ZYMC"
      + ", ZYSL, sjzd.DMMC as JLDW FROM YAGL_LQBZFA"
      + " LQBZFA INNER JOIN YAGL_YAJBXX JBXX ON JBXX.ID = "
      + " LQBZFA.YAID inner join DM_SJZD sjzd on sjzd.DMZ = LQBZFA.JLDW "
      + " WHERE JBXX.DXID = '" + id + "' and sjzd.DM_SJZD_ID = 'D38C37603C1744D6810F39EE62CBE424'";
    
    // add sql for images
    /*var sql17 = "select FJXX.ID as FJID, FJXX.FJDZ as FJURL, FJXX.FJLX, TPXX.ID as TPID,"
      + " TPXX.URL as TPURL from YAGL_YAJBXX JBXX inner join YAGL_MHDW_FJXX"
      + " FJXX on JBXX.DXID = FJXX.MHDWID inner join YAGL_YATPXX TPXX on"
      + " JBXX.ID = TPXX.YAID where JBXX.DXID = '" + id + "'";*/
    var sql17 = "select JBXX.ID as YAID, FJXX.ID as FJID, FJXX.FJDZ as FJURL, FJXX.FJMC, TPXX.ID as TPID, TPXX.URL"
      + " as TPURL from YAGL_YAJBXX JBXX inner join YAGL_YATPXX TPXX on JBXX.ID ="
      + " TPXX.YAID inner join YAGL_MHDW_FJXX FJXX on FJXX.MHDWID = JBXX.DXID where"
      + " JBXX.DXID = '" + id + "' and FJXX.FJLX != '01' group by FJURL";
    // combine the sql17 and 18 will cost a lot cpu time
    var sql18 = "select ZHTX.ID as ZHTXID from YAGL_YAZHTX ZHTX where ZHTX.URL is not null and ZHTX.YAID = '";
    var data = {};

    // set sails.config.returnCode.QUERY_OK to empty
    sails.config.returnCode.QUERY_OK.data = null;

    // T1
    XFJWT_CronTask.query(sql1, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      // turn code into string
      for (var i = 0; i < recs.length; i++) {
        recs[i].YAZL = sails.config.OffLineData.codes.get('预案类型')[recs[i].YAZL];
        recs[i].SFKQY = sails.config.OffLineData.codes.get('是否跨区域')[recs[i].SFKQY];
        recs[i].SFMYA = sails.config.OffLineData.codes.get('是否母预案')[recs[i].SFMYA];
      }
      
      data.T1 = recs[0];
      if (typeof data.T1 === 'undefined') {
        console.log("DEBUG: T1 no content returning");
        //return res.send(sails.config.returnCode.QUERY_OK);
        return res.view('xfjwt/404', {layout: null});
      }

      // T2
      XFJWT_CronTask.query(sql2, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        // turn code into string
        for (var i = 0; i < recs.length; i++) {
          recs[i].DWXZ = sails.config.OffLineData.codes.get('单位性质')[recs[i].DWXZ];
          recs[i].DWZSX = sails.config.OffLineData.codes.get('单位主属性')[recs[i].DWZSX];
          recs[i].DWCSX = sails.config.OffLineData.codes.get('单位次属性')[recs[i].DWCSX];
          recs[i].JJSYZ = sails.config.OffLineData.codes.get('经济所有制')[recs[i].JJSYZ];
          recs[i].ZDXFSS = sails.config.OffLineData.codes.get('自动消防设施情况')[recs[i].ZDXFSS];
        }
        
        data.T2 = recs[0];
        // T4
        XFJWT_CronTask.query(sql4, function(err, recs) {
          if (err) {
            sails.config.returnCode.DB_ERROR.data = err;
            return res.send(sails.config.returnCode.DB_ERROR);
          }
          
          // turn code into string
          for (var i = 0; i < recs.length; i++) {
            recs[i].JZJGDM = sails.config.OffLineData.codes.get('建筑结构')[recs[i].JZJGDM];
            recs[i].SYXZDM = sails.config.OffLineData.codes.get('使用性质')[recs[i].SYXZDM];
            recs[i].FHBZSLQKDM = sails.config.OffLineData.codes.get('防火标识设立情况')[recs[i].FHBZSLQKDM];
            recs[i].WXYQKDM = sails.config.OffLineData.codes.get('危险源情况')[recs[i].WXYQKDM];
            recs[i].HZQKDM = sails.config.OffLineData.codes.get('火种情况')[recs[i].HZQKDM];
          }
          
          data.T4 = recs[0];
          // T5
          XFJWT_CronTask.query(sql5, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            data.T5 = recs[0];
            
          // T6
          XFJWT_CronTask.query(sql6, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            data.T6 = recs[0];
          
          // T7
          XFJWT_CronTask.query(sql7, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            // turn code into string
            for (var i = 0; i < recs.length; i++) {
              recs[i].CLLXDM = sails.config.OffLineData.codes.get('车辆类型')[recs[i].CLLXDM];
              recs[i].CLDJDM = sails.config.OffLineData.codes.get('车辆等级')[recs[i].CLDJDM];
            }
            
            data.T7 = recs;
          // T8
          XFJWT_CronTask.query(sql8, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            data.T8 = recs;
          // T10
          XFJWT_CronTask.query(sql10, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            // turn code into string
            for (var i = 0; i < recs.length; i++) {
              var tmps = recs[i].ZJLY.split(',');
              var tmpas = '';
              for (var j = 0; j < tmps.length; j++) {
                tmpas += sails.config.OffLineData.codes.get('专家领域')[tmps[j]];
              }
              recs[i].ZJLY = tmpas;
            }
            
            data.T10 = recs;
          // T11
          XFJWT_CronTask.query(sql11, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            data.T11 = recs;
          // T14
          XFJWT_CronTask.query(sql14, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            data.T14 = recs;
          // T15
          XFJWT_CronTask.query(sql15, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            data.T15 = recs;
          // T16
          XFJWT_CronTask.query(sql16, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            // turn code into string
            for (var i = 0; i < recs.length; i++) {
              recs[i].ZYLX = sails.config.OffLineData.codes.get('资源类型')[recs[i].ZYLX];
            }
            
            data.T16 = recs;
          // T17
          XFJWT_CronTask.query(sql17, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }
            
            data.T17 = {}
            if (recs.length == 0) {
              data.T17['FJ'] = [];
              console.log("DEBUG: T17 no data returning");
              return res.view('xfjwt/dynamicPlana', {layout: null, id: id, data: data});
            }
            
            var tmpFJ = [];
            for (var i = 0; i < recs.length; i++) {
              tmpFJ.push({'FJ': recs[i].FJID + recs[i].FJURL.slice(-4), 'FJMC': recs[i].FJMC}); 
            }
            data.T17['FJ'] = tmpFJ;
            /*if (typeof recs[0].FJID !== 'undefined') {
              if (recs[0].FJLX == '02') {
                data.T17['FJ'] = recs[0].FJID + recs[0].FJURL.slice(-4);
              }
            }*/
            if (typeof recs[0].TPID !== 'undefined') {
              if (recs[0].TPURL.slice(-4).indexOf('.') !== -1) {
                data.T17['TP'] = recs[0].TPID + recs[0].TPURL.slice(-4);
              } else {
                data.T17['TP'] = recs[0].TPID + '.jpg';
              }
            }
          
          // 18
          sql18 = sql18 + recs[0].YAID + "' limit 1";
          XFJWT_CronTask.query(sql18, function(err, recs) {
            if (err) {
              sails.config.returnCode.DB_ERROR.data = err;
              return res.send(sails.config.returnCode.DB_ERROR);
            }

            if (recs.length == 0) {
              console.log("DEBUG: sql18 return no data returning");
              return res.view('xfjwt/dynamicPlana', {layout: null, id: id, data: data});
            }

            data.T17['ZH'] = recs[0].ZHTXID + '.jpg';
            console.log("DEBUG: final returning");
            return res.view('xfjwt/dynamicPlana', {layout: null, id: id, data: data});
          }); // 18
          }); // T17
          }); // T16
          }); // T15
          }); // T14
          }); // T11
          }); // T10
          }); // T8
          }); // T7
          }); // T6
          }); // T5
        }); // T4
      }); // T2
    }); // T1
  },

  /**
   * getT1
   * get table 1
   *
   * @param id string
   * @return RESTful Json
   */
  getT1: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    /*var sql = "SELECT JBXX.YABH AS 预案编号, JBXX.YAZL AS 预案类型, QTDXXX.DXMC AS 预案对象名称,"
      + " QTDXXX.DXDZ AS 预案对象地址, JBXX.SFKQY AS 是否跨区域, JBXX.SFMYA AS 是否母预案,"
      + " JBXX.ZZDWID AS 编制单位ID, JBXX.ZZRMC AS 编制人, JBXX.ZZRQ AS 编制日期 FROM "
      + " YAGL_YAJBXX JBXX LEFT JOIN YAGL_YAQTDXXX QTDXXX ON JBXX.DXID = "
      + " QTDXXX.ID WHERE JBXX.DXMC = '" + id + "'";*/
    var sql = "SELECT JBXX.YABH AS YABH, JBXX.YAZL AS YAZL, JBXX.DXMC AS DXMC,"
      + " MHDW.DWDZ AS DXDZ, JBXX.SFKQY AS SFKQY, JBXX.SFMYA AS SFMYA,"
      + " XFJG.JGMC AS ZZDWID, JBXX.ZZRMC AS ZZRMC, JBXX.ZZRQ AS ZZRQ FROM "
      + " YAGL_YAJBXX JBXX LEFT JOIN YAGL_YAQTDXXX QTDXXX ON JBXX.DXID = "
      + " QTDXXX.ID INNER JOIN JGXX_XFJG XFJG ON XFJG.ID = JBXX.ZZDWID"
      + " INNER JOIN YAGL_MHDW MHDW ON MHDW.ID = JBXX.DXID"
      + " WHERE JBXX.DXID = '" + id + "'";
    //SELECT JBXX.YABH, JBXX.YAZL, QTDXXX.DXMC, QTDXXX.DXDZ, JBXX.SFKQY, JBXX.SFMYA, JBXX.ZZDWID, JBXX.ZZRMC, JBXX.ZZRQ FROM YAGL_YAJBXX JBXX INNER JOIN YAGL_YAQTDXXX QTDXXX ON JBXX.DXID = QTDXXX.ID WHERE JBXX.DXMC = "吉首大学体育馆";
    XFJWT_CronTask.query(sql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }

      sails.config.returnCode.QUERY_OK.data = recs;
      return res.send(sails.config.returnCode.QUERY_OK);
    });
  },

  /**
   * getT2
   * get table 2
   *
   * @param id string
   * @return RESTful Json
   */
  getT2: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT DXID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT DWMC AS 单位名称, DWPYJC AS 拼音简称, DWDZ AS 单位地址,"
      + " DWDH AS 单位电话, YZBM AS 邮政编码, DWDZYX AS 电子邮箱, DWDJ AS "
      + "单位等级, XZQY AS 行政区域, DWCLSJ AS 成立时间, DWXZ AS 单位性质,"
      + " FRDB AS 法人代表或主要负责人, FRDBDH AS 法人身份证, AQZRR AS 消防安全负责人,"
      + " FRDBDH AS 法人电话, AQZRRSFZ AS 消防安全负责人身份证, AQZRRDH AS"
      + " 消防安全负责人电话, ZJZXFGLR AS 专兼职消防管理人, ZJZXFGLRSFZ AS"
      + "专兼职消防管理人身份证, ZJZXFGLRDH AS 专兼职消防管理人电话, DWZSX AS"
      + "单位主属性, DWCSX AS 单位次属性, JJSYZ AS 经济所有制, XFGXJGID AS"
      + " 消防管辖, GDZC AS 固定资产, ZDMJ AS 占地面积, JZMJ AS 建筑面积,"
      + " JZSL AS 建筑数量, ZGRS AS 职工人数, ZDXFSS AS 自动消防设施情况,"
      + " GIS_X AS 地理坐标X, GIS_Y AS 地理坐标Y, BZ AS 备注, DLWZ AS"
      + " 地理位置 FROM YAGL_MHDW";*/
    var sql = "SELECT MHDW.DWMC, MHDW.DWPYJC, MHDW.DWDZ,"
      + " MHDW.DWDH, MHDW.YZBM, MHDW.DWDZYX, MHDW.DWDJ"
      + ", MHDW.XZQY, MHDW.DWCLSJ, MHDW.DWXZ,"
      + " MHDW.FRDB, MHDW.FRDBDH, MHDW.AQZRR,"
      + " MHDW.FRDBDH, MHDW.AQZRRSFZ, MHDW.AQZRRDH"
      + ", MHDW.ZJZXFGLR, MHDW.ZJZXFGLRSFZ"
      + ", MHDW.ZJZXFGLRDH, MHDW.DWZSX"
      + ", MHDW.DWCSX, MHDW.JJSYZ, XFJG.JGMC AS XFGXJGID"
      + ", MHDW.GDZC, MHDW.ZDMJ, MHDW.JZMJ,"
      + " MHDW.JZSL, MHDW.ZGRS, MHDW.ZDXFSS,"
      + " MHDW.GIS_X, MHDW.GIS_Y, MHDW.BZ, MHDW.DLWZ"
      + " FROM YAGL_MHDW MHDW INNER JOIN JGXX_XFJG XFJG ON XFJG.ID = MHDW.XFGXJGID";
    //SELECT DWMC AS YAGL_DWMC, DWPYJC AS YAGL_DWPYJC, DWDZ AS YAGL_DWDZ, DWDH AS YAGL_DWDH, YZBM AS YAGL_YZBM, DWDZYX AS YAGL_DWDZYX, DWDJ AS YAGL_DWDJ, XZQY AS YAGL_XZQY, DWCLSJ AS YAGL_DWCLSJ, DWXZ AS YAGL_DWXZ, FRDB AS YAGL_FRDB, FRDBSFZ AS YAGL_FRDBSFZ, FRDBDH AS YAGL_FRDBDH, AQZRR AS YAGL_AQZRR, AQZRRSFZ AS YAGL_AQZRRSFZ, AQZRRDH AS YAGL_AQZRRDH, ZJZXFGLR AS YAGL_ZJZXFGLR, ZJZXFGLRSFZ AS YAGL_ZJZXFGLRSFZ, ZJZXFGLRDH AS YAGL_ZJZXFGLRDH, DWZSX AS YAGL_DWZSX, DWCSX AS YAGL_DWCSX, JJSYZ AS YAGL_JJSYZ, XFGXJGID AS YAGL_XFGXJGID, GDZC AS YAGL_GDZC, ZDMJ AS YAGL_ZDMJ, JZMJ AS YAGL_JZMJ, JZSL AS YAGL_JZSL, ZGRS AS YAGL_ZGRS, ZDXFSS AS YAGL_ZDXFSS, GIS_X AS YAGL_GIS_X, GIS_Y AS YAGL_GIS_Y, DLWZ AS YAGL_DLWZ, BZ AS YAGL_BZ FROM YAGL_MHDW;
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].DXID;
      
      sql = sql + " WHERE MHDW.ID = '" + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT3
   * get table 3
   *
   * @param id string
   * @return RESTful Json
   */
  getT3: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    return res.send(sails.config.returnCode.QUERY_OK)
  },

  /**
   * getT4
   * get table 4
   *
   * @param id string
   * @return RESTful Json
   */
  getT4: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT DXID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT ZDBWMC AS 重点部位名称, ZDBWWZ AS 重点部位位置,"
      + " SZCS AS 所在层数, SZGD AS 所在高度, JZMJ AS 建筑面积,"
      + " XFDTS AS 消防电梯数, SSCKS AS 疏散出口数, AQCKS AS 安全出口数,"
      + " JZJGDM AS 建筑结构, SYXZDM AS 使用性质, FHBZSLQKDM AS "
      + " 防火标识设立情况, WXYQKDM AS 危险源情况, HZQKDM AS 火种情况,"
      + " NHDJDM AS 耐火等级, MHSS AS 灭火设施, WXX AS 危险性,"
      + " CZCS AS 处置措施, ZYSX AS 注意事项, ZRR AS 负责人,"
      + " LXDH AS 负责人联系电话"
      + " FROM YAGL_MHDW_ZDBW WHERE MHDWID = '";*/
    var sql = "SELECT ZDBWMC, ZDBWWZ,"
      + " SZCS, SZGD, JZMJ,"
      + " XFDTS, SSCKS, AQCKS,"
      + " JZJGDM, SYXZDM, FHBZSLQKDM"
      + ", WXYQKDM, HZQKDM,"
      + " NHDJDM, MHSS, WXX,"
      + " CZCS, ZYSX, ZRR,"
      + " LXDH"
      + " FROM YAGL_MHDW_ZDBW WHERE MHDWID = '";
    //SELECT ZDBWMC AS YAGL_ZDBWMC, ZDBWWZ AS YAGL_ZDBWWZ, SZCS AS YAGL_SZCS, SZGD AS YAGL_SZGD, JZMJ AS YAGL_JZMJ, XFDTS AS YAGL_XFDTS, SSCKS AS YAGL_SSCKS, AQCKS AS YAGL_AQCKS, JZJGDM AS YAGL_JZJGDM, SYXZDM AS YAGL_SYXZDM, SYXZDM AS YAGL_SYXZDM, FHBZSLQKDM AS YAGL_FHBZSLQKDM, WXYQKDM AS YAGL_WXYQKDM, HZQKDM AS YAGL_HZQKDM, NHDJDM AS YAGL_NHDJDM, MHSS AS YAGL_MHSS, WXX AS YAGL_WXX, CZCS AS YAGL_CZCS, ZYSX AS YAGL_ZYSX, ZRR AS YAGL_ZRR, LXDH AS YAGL_LXDH FROM YAGL_MHDW_ZDBW;
    
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].DXID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT5
   * get table 5
   *
   * @param id string
   * @return RESTful Json
   */
  getT5: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT DXID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT DWJBQKMS AS 单位基本情况描述, ZBPLQK AS 周边毗邻情况,"
      + " XFTDHSLTD AS 消防通道或疏散通道, NBXFSS AS 内部消防设施,"
      + " FHSS AS 防火设施, XFKZSXX AS 消防控制室信息, QT AS 其他"
      + " FROM YAGL_MHDW_KZXX WHERE MHDWID = '";*/
    var sql = "SELECT DWJBQKMS, ZBPLQK,"
      + " XFTDHSLTD, NBXFSS,"
      + " FHSS, XFKZSXX, QT"
      + " FROM YAGL_MHDW_KZXX WHERE MHDWID = '";
    //SELECT DWJBQKMS, ZBPLQK, XFTDHSLTD, NBXFSS, FHSS, XFKZSXX, QT FROM YAGL_MHDW_KZXX;
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].DXID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT6
   * get table 6
   *
   * @param id string
   * @return RESTful Json
   */
  getT6: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT NULL AS 灾情规模, FSDD AS 发生地点,"
      + " NULL AS 灾情特点, BZ AS 备注 FROM YAGL_ZQSD WHERE"
      + " YAID = '";*/
    var sql = "SELECT NULL AS ZQGM, FSDD,"
      + " NULL AS ZQTD, BZ FROM YAGL_ZQSD WHERE"
      + " YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT7
   * get table 7
   *
   * @param id string
   * @return RESTful Json
   */
  getT7: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT SSDWID AS 单位, CLDJDM AS 车辆等级, ZZGNDM AS"
      + " 作战功能, CPHM AS 车牌号码, NULL AS 关键参数 FROM YAGL_CLDJ"
      + " WHERE YAID = '";*/
    var sql = "SELECT XFJG.JGMC AS SSDWID, CLDJDM, ZZGNDM"
      + ", CPHM, NULL AS GJCS FROM YAGL_CLDJ"
      + " CLDJ INNER JOIN JGXX_XFJG XFJG ON XFJG.ID = CLDJ.SSDWID"
      + " WHERE YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          console.log(err);
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT8
   * get table 8
   *
   * @param id string
   * @return RESTful Json
   */
  getT8: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'"; 
    /*var sql = "SELECT NULL AS 装备名称, SSDWID AS 单位, ZBSL AS"
      + " 调集数量 FROM YAGL_QTZBDJ WHERE YAID = '";*/
    var sql = "SELECT NULL AS ZBMC, XFJG.JGMC AS SSDWID, QTZBDJ.ZBSL"
      + " FROM YAGL_QTZBDJ QTZBDJ INNER JOIN JGXX_XFJG XFJG"
      + " ON XFJG.ID = QTZBDJ.SSDWID WHERE QTZBDJ.YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT9
   * get table 9
   *
   * @param id string
   * @return RESTful Json
   */
  getT9: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    return res.send(sails.config.returnCode.QUERY_OK);
  },

  /**
   * getT10
   * get table 10
   *
   * @param id string
   * @return RESTful Json
   */
  getT10: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT ZJID AS 专家名称, NULL AS 专家所属, NULL AS 联系电话,"
      + " ZJLY AS 专家领域 FROM YAGL_ZJDJXX WHERE YAID = '";*/
    var sql = "SELECT CZYXM AS ZJID, NULL AS ZJSS, NULL AS LXDH,"
      + " ZJLY FROM YAGL_ZJDJXX WHERE YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT11
   * get table 11
   *
   * @param id string
   * @return RESTful Json
   */
  getT11: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT SSDWID AS 单位, CLLXDM AS 车辆类型, CPHM AS 车牌号码,"
      + " NULL AS 部署位置, NULL AS 部署任务, NULL AS 责任人, NULL AS 备注"
      + " FROM YAGL_CLDJ WHERE YAID = '";*/
    var sql = "SELECT XFJG.JGMC AS SSDWID, CLLXDM, CPHM,"
      + " NULL AS BSWZ, NULL AS BSRW, NULL AS ZRR, NULL AS BZ"
      + " FROM YAGL_CLDJ CLDJ INNER JOIN JGXX_XFJG XFJG ON"
      + " XFJG.ID = CLDJ.SSDWID WHERE YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT12
   * get table 12
   *
   * @param id string
   * @return RESTful Json
   */
  getT12: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    return res.send(sails.config.returnCode.QUERY_OK);
  },

  /**
   * getT13
   * get table 13
   *
   * @param id string
   * @return RESTful Json
   */
  getT13: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    return res.send(sails.config.returnCode.QUERY_OK);
  },

  /**
   * getT14
   * get table 14
   *
   * @param id string
   * @return RESTful Json
   */
  getT14: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT GWMC AS 岗位名称, ZZ AS 岗位职责, SM AS 岗位说明"
      + " FROM YAGL_ZHZZJGJZZ WHERE YAID = '";*/
    var sql = "SELECT GWMC, ZZ, SM"
      + " FROM YAGL_ZHZZJGJZZ WHERE YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT15
   * get table 15
   *
   * @param id string
   * @return RESTful Json
   */
  getT15: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT DJJGID AS 单位名称, TXDH AS 通信呼号 FROM"
      + " YAGL_TXDH WHERE YAID = '";*/
    var sql = "SELECT XFJG.JGMC AS DJJGID, TXDH FROM"
      + " YAGL_TXDH TXDH INNER JOIN JGXX_XFJG XFJG ON"
      + " XFJG.ID = TXDH.DJJGID WHERE YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT16
   * get table 16
   *
   * @param id string
   * @return RESTful Json
   */
  getT16: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    var preSql = "SELECT ID FROM YAGL_YAJBXX WHERE DXID = '"
      + id + "'";
    /*var sql = "SELECT DWMC AS 单位名称, BZDWLX AS 保障类别, LXDH AS"
      + " 值班电话, RWYFF AS 任务与要求, ZYLX AS 资源类型, ZYMC AS"
      + " 资源名称, ZYSL AS 资源数量, JLDW AS 计量单位 FROM YAGL_LQBZFA"
      + " WHERE YAID = '";*/
    var sql = "SELECT DWMC, BZDWLX, LXDH"
      + ", RWYFF, ZYLX, ZYMC"
      + ", ZYSL, JLDW FROM YAGL_LQBZFA"
      + " WHERE YAID = '";
    XFJWT_CronTask.query(preSql, function(err, recs) {
      if (err) {
        sails.config.returnCode.DB_ERROR.data = err;
        return res.send(sails.config.returnCode.DB_ERROR);
      }
      
      if (recs.length == 0) {
        return res.send(sails.config.returnCode.QUERY_OK);
      }
      var DXID = recs[0].ID;
      
      sql = sql + DXID + "'";
      XFJWT_CronTask.query(sql, function(err, recs) {
        if (err) {
          sails.config.returnCode.DB_ERROR.data = err;
          return res.send(sails.config.returnCode.DB_ERROR);
        }
        
        sails.config.returnCode.QUERY_OK.data = recs;
        return res.send(sails.config.returnCode.QUERY_OK);
      });
    });
  },

  /**
   * getT17
   * get table 17
   *
   * @param id string
   * @return RESTful Json
   */
  getT17: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    return res.send(sails.config.returnCode.QUERY_OK);
  },
  
  /**
   * getT18
   * get table 18
   *
   * @param id string
   * @return RESTful Json
   */
  getT18: function(req, res) {
    var id = req.param('id');
    if (id == null || id == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
    
    return res.send(sails.config.returnCode.QUERY_OK);
  },

}