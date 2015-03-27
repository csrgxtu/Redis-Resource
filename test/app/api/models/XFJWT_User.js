/**
 * Author: Archer Reilly
 * Date: 25/May/2014
 * File: XFJWT_User.js
 * Des: model for user
 *
 * Produced By Ebang
 */

module.exports = {
  // prevent auto create indexed id
  autoPK: false,
  // specify table name here in database xfjwt
  tableName: 'xfjwt_User',
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
    UserId: {
      type: 'INTEGER',
      size: 11,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },

    UserName: {
      type: 'STRING',
      unique: true,
      size: 20,
      notNull: true,
    },

    DisplayName: {
      type: 'STRING',
      notNull: true,
      size: 20,
    },

    Password: {
      type: 'STRING',
      //required: true,
      notNull: true,
      size: 32,
    },
    NoSequence: {
      type: 'INTEGER',
      size: 11,
    },
    Title: {
      type: 'STRING',
      size: 20,
      required: true,
    },

    OrganizationId: {
      type: 'STRING',
      size: 32,
    },

    MobilePhoneNumber: {
      type: 'STRING',
      size: 25,
    },

    ShortNumber: {
      type: 'STRING',
      size: 16,
      unique: true,
    },

    Imei: {
      type: 'STRING',
      size: 32,
    },

    IsLocked: {
      type: 'BOOLEAN',
      defaultsTo: false,
    },

    RoleId: {
      model: 'XFJWT_Role',
    },

    IsActive: {
      type: 'BOOLEAN',
      defaultsTo: true,
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

    SystemLogs: {
      collection: 'XFJWT_SystemLog',
      via: 'UserId',
    },
    
    // Override toJSON instance method
    // to remove password value
    toJSON: function() {
      var obj = this.toObject();
      delete obj.Password;
      return obj;
    }, 
  },
};
