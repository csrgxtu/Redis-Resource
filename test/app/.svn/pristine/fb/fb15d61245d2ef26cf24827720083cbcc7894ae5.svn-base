/**
 * Author: Archer Reilly
 * Date: 22/Oct/2014
 * File: SystemLog.js
 * Des: model for System log
 *
 * Produced By Ebang
 */

module.exports = {
  // prevent auto create indexed id
  autoPK: false,
  // specify table name here in database xfjwt
  tableName: 'xfjwt_SystemLog',
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
    SystemLogId: {
      type: 'INTEGER',
      size: 11,
      primaryKey: true,
      notNull: true,
    },
   
    OperationTypeCode: {
      type: 'STRING',
      enum: ['LOGIN', 'LOGOFF', 'CREATE', 'RETRIEVE', 'UPDATE', 'DELETE'],
    },

    ResourceId: {
      model: 'XFJWT_Resource',
    },

    OrganizationId: {
      model: 'JGXX_XFJG',
    },

    Params: {
      type: 'TEXT',
    },

    UserName: {
      type: 'STRING',
      size: 20,
    },

    CreatedTime: {
      type: 'DATETIME',
    },

    UserId: {
      model: 'XFJWT_User',
    },
  },
};
