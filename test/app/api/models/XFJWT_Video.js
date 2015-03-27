module.exports = {
	autoPK: false,
	tableName: 'xfjwt_Video',
	adapter: 'MySQL',
	schema: true,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	types: {
		size: function(){
			return true;
		}
	},
	attributes: {
		VideoId: {
			type: 'INTEGER',
			size: 11,
			primaryKey: true,
			notNull: true,
			autoIncrement: true,
		},
		ZaiQingId: {
			type: 'INTEGER',
			size: 11,
		},
		OrganizationId: {
			type: 'string',
			size: 32,
			notNull: true,
		},
		VideoType: {
			type: 'string',
			size: 32,
			notNull: true,
		},
		Category: {
			type: 'string',
		},
		EncodedFileName: {
			type: 'string',
			size: 64,
			notNull: true,
		},
		ThumbnailUrl: {
			type: 'string',
			size: 255,
		},
		VideoFlvUrl: {
			type: 'string',
			size: 255,
		},
		VideoMp4Url: {
			type: 'string',
			size: 255,
		},
		VideoSize: {
			type: 'float',
		},
		VideoLength: {
			type: 'string',
			size: '50',
		},
		BeginTime: {
			type: 'DATETIME',
			notNull: true,
			required: true,
		},
		EndTime: {
			type: 'DATETIME',
		},
		Address: {
			type: 'string',
			size: 64,
		},
		BaiduLat: {
			type: 'float',
		},
		BaiduLon: {
			type: 'float',
		},
		Description: {
			type: 'string',
		},
		IsActive: {
			type: 'INTEGER',
			size: 1,
		},
		CreatedBy: {
			type: 'string',
			size: 20,
		},
		CreatedTime: {
			type: 'DATETIME',
			notNull: true,
			required: true,
		},
		UpdatedBy: {
			type: 'string',
			size: 20,
		},
		UpdatedTime: {
			type: 'DATETIME',
		}
	}
}