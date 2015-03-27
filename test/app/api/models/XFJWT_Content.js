/**
 * Author: dishy
 * Date: 27/Jun/2014
 * File: Content.js
 * Des: 
 *
 * Produced By Ebang.
 */

module.exports = {
	// prevent auto create indexed id
	autoPK: false,	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_Content',
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
		ContentId: {
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
		
		ContentType: {
			type: 'STRING',
			size: 32,
		},
		
		Description: {
			type: 'STRING',
			size: 255,
		},
		
		FilePath: {
		  type: 'STRING',
		  size: 255,
		},
		
		FileName: {
		 type: 'STRING',
		 size: 64,
		},
		
		Version: {
		 type: 'STRING',
		 size: 32,
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
	}
};
