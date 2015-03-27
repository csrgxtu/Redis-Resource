/**
 * Author: Archer Reilly
 * Date: 29/Jan/2015
 * File: OffLineDataService.js
 * Desc: service for OffLineData
 *
 * Produced By Ebang.
 */
var sqlite3 = require('sqlite3').verbose();
//var timestamp = new Date().getTime();
//var dbName = sails.config.OffLineData.sqlite3Dir + '/' + timestamp + '.db';
var dbName = 'xfjwt.db';

module.exports = {
  /**
   * shuiYuanSqlite3
   * generate sqlite3 for shuiyuan
   *
   * @param void
   * @return boolean
   */
  shuiYuanSqlite3: function() {
    var db  = new sqlite3.Database(dbName);
    var sql = sails.config.OffLineData.xfjwt_ShuiYuan_schema;
    db.serialize(function() {
      db.run(sql);
      
      var sqla = "INSERT INTO xfjwt_ShuiYuan VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      var stmt = db.prepare(sqla);
      
      var sqlc = "SELECT * FROM xfjwt_ShuiYuan";
      XFJWT_ShuiYuan.query(sqlc, function(err, recs) {
        if (err) {
          //sails.config.returnCode.DB_ERROR.data = err;
          //return res.send(sails.config.returnCode.DB_ERROR);
          return false;
        }
        
        for (var i = 0; i < recs.length; i++) {
          var tmp = [];
          tmp.push(recs[i].ShuiYuanId);
          tmp.push(recs[i].OrganizationId);
          tmp.push(recs[i].RefId);
          tmp.push(recs[i].Number);
          tmp.push(recs[i].Name);
          tmp.push(recs[i].City);
          tmp.push(recs[i].District);
          tmp.push(recs[i].Road);
          tmp.push(recs[i].Address);
          tmp.push(recs[i].Type);
          tmp.push(recs[i].StatusCode);
          tmp.push(recs[i].GisLon);
          tmp.push(recs[i].GisLat);
          tmp.push(recs[i].BaiduLon);
          tmp.push(recs[i].BaiduLat);
          tmp.push(recs[i].ZPURL);
          tmp.push(recs[i].FWTD);
          tmp.push(recs[i].FWTX);
          tmp.push(recs[i].FWTN);
          tmp.push(recs[i].FWTB);
          tmp.push(recs[i].IsActive);
          tmp.push(recs[i].CreatedBy);
          tmp.push(recs[i].CreatedTime);
          tmp.push(recs[i].UpdatedBy);
          tmp.push(recs[i].UpdatedTime);
          stmt.run(tmp);
        }
        stmt.finalize();
        //db.close();
        db.close(function(err) {
          OffLineDataService.fireKeyUnitSqlite3();
        });
      });
    });
    
    return true;
  },

  /**
   * xfjgSqlite3
   * generate sqlite3 for JGXX_XFJG
   *
   * @param void
   * @return boolean
   */
  xfjgSqlite3: function() {
    var db = new sqlite3.Database(dbName);
    var sql = sails.config.OffLineData.JGXX_XFJG_schema;
    db.serialize(function() {
      db.run(sql);

      var sqla = "INSERT INTO JGXX_XFJG VALUES (?,?,?,?,?)";
      var stmt = db.prepare(sqla);

      var sqlb = "select l1.JGNBID, l1.ID, l1.JGJC, FORMAT(length(l1.JGTREE)/8,0) as Level, l1.JGTREE from JGXX_XFJG l1 where l1.JGTREE like '0100000043000000%' and l1.JLZT=1 order by Level,l1.JGNBID asc;";
      XFJWT_CronTask.query(sqlb, function(err, recs) {
        if (err) {
          return false;
        }

        for (var i = 0; i < recs.length; i++) {
          var tmp = [];
          tmp.push(recs[i].JGNBID);
          tmp.push(recs[i].ID);
          tmp.push(recs[i].JGJC);
          tmp.push(recs[i].Level);
          tmp.push(recs[i].JGTREE);
          stmt.run(tmp);
        }

        stmt.finalize();
        db.close();
      });
    });

    return true;
  },

  /**
   * fireKeyUnitSqlite3
   * generate sqlite3 for fireKeyUnit
   *
   * @param void
   * @return boolean
   */
  fireKeyUnitSqlite3: function() {
    var db  = new sqlite3.Database(dbName);
    var sql = sails.config.OffLineData.xfjwt_FireKeyUnit_schema;
    db.serialize(function() {
      db.run(sql);
      
      var sqla = "INSERT INTO xfjwt_FireKeyUnit VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      var stmt = db.prepare(sqla);
      
      var sqlb = "SELECT * FROM xfjwt_FireKeyUnit";
      XFJWT_FireKeyUnit.query(sqlb, function(err, recs) {
        if (err) {
          return false;
        }
        
        for (var i = 0; i < recs.length; i++) {
          var tmp = []
          tmp.push(recs[i].FireKeyUnitId);
          tmp.push(recs[i].OrganizationId);
          tmp.push(recs[i].RefId);
          tmp.push(recs[i].Name);
          tmp.push(recs[i].City);
          tmp.push(recs[i].District);
          tmp.push(recs[i].Address);
          tmp.push(recs[i].Location);
          tmp.push(recs[i].GisLon);
          tmp.push(recs[i].GisLat);
          tmp.push(recs[i].BaiduLon);
          tmp.push(recs[i].BaiduLat);
          tmp.push(recs[i].ContactNumber);
          tmp.push(recs[i].CorpRep);
          tmp.push(recs[i].CorpRepContact);
          tmp.push(recs[i].SafetyRep);
          tmp.push(recs[i].SafetyRepContact);
          tmp.push(recs[i].SafetyMgmtRep);
          tmp.push(recs[i].SafetyMgmtRepContact);
          tmp.push(recs[i].SafetyMgmtRep2);
          tmp.push(recs[i].SafetyMgmtRepContact2);
          tmp.push(recs[i].IsActive);
          tmp.push(recs[i].CreatedBy);
          tmp.push(recs[i].CreatedTime);
          tmp.push(recs[i].UpdatedBy);
          tmp.push(recs[i].UpdatedTime);
          stmt.run(tmp);
        }
        stmt.finalize();
        //db.close();
        db.close(function(err) {
          OffLineDataService.xfjgSqlite3();
        });
      });
    });
    
    return true;
  },
  
  /**
   * sqlite3
   * generate sqlite3 for shuiyuan and firekeyunit
   *
   * @param void
   * @param boolean
   */
  sqlite3: function() {
    OffLineDataService.shuiYuanSqlite3();
    //OffLineDataService.fireKeyUnitSqlite3();
    return true;
  },
}
