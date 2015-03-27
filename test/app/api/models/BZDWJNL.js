module.exports = {
	autoPK: false,
	tableName: 'xfjwt_BZDWJNL',
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
		BZDW: {
			type: 'STRING',
			size: 100,
		},
		ZYMC: {
			type: 'STRING',
			size: 100,
		},
		BZLB: {
			type: 'STRING',
			size: 100,
		},
		BZNL: {
			type: 'STRING',
			size: 100,
		},
		LXDH: {
			type: 'STRING',
			size: 20,
		},
		JGTREE: {
			type: "string",
			size: 255,
		},
		WHJG: {
			type: 'STRING',
			size: 100,
		}
	}
}
