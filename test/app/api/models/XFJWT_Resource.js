/**
 * Author: Archer Reilly
 * Date: 25/May/2014
 * File: Resource.js
 * Des: model for resource
 *
 * Produced By EBang.
 */
module.exports = {
  // prevent auto create indexed id
  autoPK: false,
  // specify table name here in database xfjwt
  tableName: 'xfjwt_Resource',
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
    ResourceId: {
      type: 'INTEGER',
      size: 11,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    
    ModuleName: {
      type: 'STRING',
      size: 64,
    },
    
    ResourceName: {
      type: 'STRING',
      size: 255,
      defaultsTo: null,
    },
     
    ResourceUrl: {
      type: 'STRING',
      size: 255,
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
    
  },
};
