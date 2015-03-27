/**
 * Author: Archer Reilly
 * Date: 25/May/2014
 * File: GpsHistory.js
 * Des: model for Gps history
 *
 * Produced By Ebang
 */

module.exports = {
	// prevent auto create indexed id
	autoPK: false,	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_GpsHistory',
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
		GpsHistoryId: {
			type: 'INTEGER',
			size: 11,
			primaryKey: true,
			autoIncrement: true,	
		},
		
		OrganizationId: {
		  type: 'STRING',
		  size: 32,
		},
		
		BatchId: {
		  type: 'INTEGER',
		  size: 11,
		},
		
		UserName: {
		  type: 'STRING',
		  size: 20,
		},
		
		// 手机或消防车
		DeviceType: {
			type: 'STRING',
			size: 10,
		},
		
		// IMEI 或车牌号码
		DeviceNumber: {
			type: 'STRING',
			size: 32,
		},
		
		BaiduLat: {
			type: 'FLOAT',
		},
		
		BaiduLon: {
			type: 'FLOAT',
		},
		
		Speed: {
			type: 'FLOAT',
		},
		
		EventTime: {
			type: 'DATETIME'
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
			type: 'DATETIME'
		},  
	},
};
