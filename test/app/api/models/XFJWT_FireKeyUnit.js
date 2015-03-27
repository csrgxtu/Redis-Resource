/**
 * Author: Archer Reilly
 * Date: 25/May/2014
 * File: XFKeyUnit.js
 * Des: the model for Key Unit In XF.
 *
 * Produced By Ebang.
 */
module.exports = {
	// prevent auto create indexed id
	autoPK: false,	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_FireKeyUnit',
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
		FireKeyUnitId: {
			type: 'INTEGER',
			size: 11,
			primaryKey: true,
			autoIncrement: true,
			notNull: true,
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
		
		Address: {
		  type: 'STRING',
		  size: 200,
		},
		
		Location: {
		  type: 'STRING',
		  size: 200,
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
		
		ContactNumber: {
		  type: 'STRING',
		  size: 30,
		},
		
		CorpRep: {
		  type: 'STRING',
		  size: 50,
		},
		
		CorpRepContact: {
		  type: 'STRING',
		  size: 30,
		},
		
		SafetyRep: {
		  type: 'STRING',
		  size: 50,
		},
		
		SafetyRepContact: {
		  type: 'STRING',
		  size: 30,
		},
		
		SafetyMgmtRep: {
		  type: 'STRING',
		  size: 50,
		},
		
		SafetyMgmtRepContact: {
		  type: 'STRING',
		  size: 30,
		},
		
		SafetyMgmtRep2: {
		  type: 'STRING',
		  size: 50,
		},
		
		SafetyMgmtRepContact2: {
		  type: 'STRING',
		  size: 30,
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
			notNull: true,
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
