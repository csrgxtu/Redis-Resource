/**
 * Author: Archer Reilly
 * Date: 07/Jan/2014
 * File: XFJWT_CronTask.js
 * Desc: model for CronTask
 *
 * Produced By Ebang.
 */
module.exports = {
  // prevent auto create indexed id
  autoPK: false,
  // specify table name here in database xfjwt
  tableName: 'xfjwt_CronTask',
  // specify the adapter to use
  adapter: 'MySQL', 
  // only allow fields defined in attributes to be saved
  schema: true, 
  // disable auto createdAt updatedAt columns
  autoCreatedAt: false,
  autoUpdatedAt: false,
  // if you don't put this types here, you will get an error
  // and the size can't be used in the attributes.
  types: {
    size: function() {
      return true;
    }
  },
  
  attributes: {
    CronTaskId: {
      type: 'INTEGER',
      size: 11,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    
    Task: {
      type: 'TEXT',
    },
    TaskName: {
      type: 'STRING',
      size: 255,
    },
    CreatedBy: {
      type: 'STRING',
      size: 20,
    },

    CreatedTime: {
      type: 'DATETIME',
    },

    UpdatedBy: {
      type: 'STRING',
      size: 20,
    },

    UpdatedTime: {
      type: 'DATETIME',
    },
  },
}
