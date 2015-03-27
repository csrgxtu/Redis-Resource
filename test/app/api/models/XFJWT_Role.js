/**
 * Author: Archer Reilly
 * Date: 25/Mar/2014
 * File: XFJWT_Role.js
 * Des: module file for Role in rbac functionality
 *
 * Produced By Ebang.
 */

module.exports = {
	// prevent auto create indexed id
	autoPK: false,	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_Role',
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
		RoleId: {
			type: 'INTEGER',
			size: 11,
			primaryKey: true,
			notNull: true,
			autoIncrement: true,
		},
		
		RoleName: {
			type: 'STRING',
			required: true,
			size: 32,
		},
		
		Description: {
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
		
		Users: {
		  collection: 'XFJWT_User',
		  via: 'RoleId',
		},
                
	}
};
