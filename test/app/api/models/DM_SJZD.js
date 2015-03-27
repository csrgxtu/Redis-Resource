module.exports = {
	autoPK: false,
	tableName: 'DM_SJZD',
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
		ID: {
			type: 'STRING',
			size: 32,
			primaryKey: true,
			notNull: true,
		},
		DM_SJZD_ID: {
			type: 'STRING',
			size: 32,
			notNull: true,
		},
		DMZ: {
			type: 'STRING',
			size: 50,			
		},
		DMMC: {
			type: 'text',
		},
		DMMPY: {
			type: 'STRING',
			size: 50,			
		},
		FDMID: {
			type: 'STRING',
			size: 32,			
		},
		ZTA: {
			type: 'STRING',
			size: 1,			
		},
		MS: {
			type: 'STRING',
			size: 200,			
		},
		XSXH: {
			type: 'float',
			decimalPlaces: 0,
		},
		CJZID: {
			type: 'STRING',
			size: 32,			
		},
		CZYID: {
			type: 'STRING',
			size: 32,			
		},
		CZSJ: {
			type: 'datatime',
		},
		CJSJ: {
			type: 'datatime',
		},
		SJC: {
			type: 'datatime',
		},
		CSZT: {
			type: 'integer',
			size: 11,
		},
		JLZT: {
			type: 'integer',
			size: 11,
		},
		SJBB: {
			type: 'float',
			decimalPlaces: 0,
		},
		YWXTBSID: {
			type: 'STRING',
			size: 100,
		},
		VERCOL: {
			type: 'longtest',
			notNull: true,
		}
	}
}
