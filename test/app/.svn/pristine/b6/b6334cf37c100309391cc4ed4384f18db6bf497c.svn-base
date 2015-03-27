/**
 * Author: Archer Reilly
 * Date: 11/Jan/2014
 * File: XFJWT_ZaiQing.js
 * Desc: model for ZaiQing
 *
 * Produced By Ebang.
 */
module.exports = {
  // prevent auto create indexed id
  autoPK: false,
  // specify table name here in database xfjwt
  tableName: 'xfjwt_ZaiQing',
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
    ZaiQingId: {
      type: 'INTEGER',
      size: 11,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    
    RefZaiQingId: {
      type: 'STRING',
      size: 32,
    },
    ZaiQingName: {
      type: 'STRING',
      size: '255',
    },
    JGID: {
      type: 'STRING',
      size: 255,
    },
    BJR: {
      type: 'STRING',
      size: 20,
    },
    JGJC: {
      type: 'STRING',
      size: 64,
    },
    
    PhoneNumber: {
      type: 'STRING',
      size: 20,
    },
    
    Status: {
      type: 'STRING',
      size: 10,
    },
    
    Type: {
      type: 'STRING',
      size: 10,
    },
    
    Level: {
      type: 'STRING',
      size: 32,
    },
    
    GIS_X: {
      type: 'FLOAT',
    },
    
    GIS_Y: {
      type: 'FLOAT',
    },
    
    GIS_H: {
      type: 'FLOAT',
    },
    
    Baidu_Lat: {
      type: 'FLOAT',
    },
    
    Baidu_Lon: {
      type: 'FLOAT',
    },
    
    KeyUnitId: {
      type: 'STRING',
      size: 32,
    },
    
    KeyUnitName: {
      type: 'STRING',
      size: 64,
    },
    
    Address: {
      type: 'STRING',
      size: 255,
    },
    
    Description: {
      type: 'STRING',
      size: 255,
    },
    
    SendTime: {
      type: 'DATETIME',
    },
    
    EndTime: {
      type: 'DATETIME',
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
    
    ZaiQingDiaoPais: {
      collection: 'XFJWT_ZaiQingDiaoPai',
      via: 'ZaiQingId',
    },
  },
}
