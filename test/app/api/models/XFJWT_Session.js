/**
 * Author: Archer Reilly
 * Date: 07/Jan/2014
 * File: XFJWT_CronTask.js
 * Desc: model for CronTask
 *
 * Produced By Ebang.
 */
module.exports = {
  // specify table name here in database xfjwt
  tableName: 'xfjwt_Session',

  // specify the adapter to use
  adapter: 'Redis',
  //connection: 'Redis',
  
  attributes: {
    UserId: {
      type: 'STRING'
    },

    LoginAndroid: {
      type: 'INTEGER'
    }
  },
}
