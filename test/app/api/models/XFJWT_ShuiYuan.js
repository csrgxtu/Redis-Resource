/**
 * Author: Archer Reilly
 * Date: 25/Apr/2014
 * File: FireHydrant.js
 * Des: model for shuiyuan biao zhu, just like XFKeyUnit
 *
 * Produced By EBang
 */
module.exports = {
	// prevent auto create indexed id
  autoPK: false,
	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_ShuiYuan',

	// specify the adapter to use
	adapter: 'MySQL',

	// only allow fields defined in attributes to be saved
	schema: false,
	
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
    ShuiYuanId: {
      type: 'INTEGER',
      size: 11,
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
    },
    
    OrganizationId: {
      type: 'STRING',
      size: 32,
    },
    
    RefId: {
      type: 'STRING',
      size: 32,
      unique: true,
    },
    
    Number: {
      type: 'STRING',
      size: 20,
    },
    
		Name: {
		  type: 'STRING',
		  size: 100,
		},
		
		City: {
		  type: 'STRING',
		  size: 30,
		},
		
		District: {
		  type: 'STRING',
		  size: 30,
		},
		
		Road: {
		  type: 'STRING',
		  size: 200,
		},
		
		Address: {
		  type: 'STRING',
		  size: 200,
		},
		
		Type: {
		  type: 'STRING',
		  size: 16,
		},
		
		StatusCode: {
		  type: 'INTEGER',
		  size: 4,
		},
		
		GisLon: {
		  type: 'FLOAT',
		},
		
		GisLat: {
		  type: 'FLOAT',
		},
		
		BaiduLon: {
		  type: 'FLOAT',
		},
		
		BaiduLat: {
		  type: 'FLOAT',
		},
		
		ZPURL: {
		  type: 'STRING',
		  size: 200,
		},
		
		FWTD: {
		  type: 'STRING',
		  size: 200,
		},
		
		FWTX: {
		  type: 'STRING',
		  size: 200,
		},
		
		FWTN: {
		  type: 'STRING',
		  size: 200,
		},
		
		FWTB: {
		  type: 'STRING',
		  size: 200,
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
