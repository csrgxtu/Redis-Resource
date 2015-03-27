/**
 * Author: Archer Reilly
 * Date: 25/May/2014
 * File: XfImages.js
 * Des: model for XfImages
 *
 * Produced By EBang.
 */
module.exports = {
// prevent auto create indexed id
	autoPK: false,	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_Image',
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
		ImageId: {
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
		ZaiQingId: {
		 	type: 'INTEGER',
		 	size:　11,
		},
		ImageType: {
			type: 'STRING',
			size: 32,
		},
		
		// 火场外景、消防车出动、灭火阵地等
		Category: {
			type: 'STRING',
			size: 32,
			notNull: true,
			defaultsTo: '未分类',			
		},
		
		OriginFileName: {
			type: 'STRING',
			size: 64,
		},
		
		EncodedFileName: {
			type: 'STRING',
			size: 64,
		},
		
		Url: {
			type: 'STRING',
			size: 255,
		},
		
		ThumbnailUrl: {
			type: 'STRING',
			size: 255,
		},
		
		// 拍摄地址
		Address: {
			type: 'STRING',
			size: 64,
		},
		
		BaiduLat: {
			type: 'FLOAT',
			required: true,
			notNull: true,			
		},
		
		BaiduLon: {
			type: 'FLOAT',
			required: true,
			notNull: true,	
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
