module.exports = {
	autoPK: false,
	tableName: 'xfjwt_Nbzjxx',
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
		XM: {
			type: 'STRING',
			size: 32,
		},
		LY: {
			type: 'STRING',
			size: 255,
		},
		JGJC: {
			type: 'STRING',
			size: 255,
		},
		BGDH: {
			type: 'STRING',
			size: 32,
		},
		ZW: {
			type: 'STRING',
			size: 32,
		},
		GW: {
			type: 'STRING',
			size: '32',
		},
		XB: {
			type: 'STRING',
			size: 32,
		}
	}
}