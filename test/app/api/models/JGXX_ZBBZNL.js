
module.exports = {
	autoPK: false,
	tableName: 'JGXX_ZBBZNL',
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
		BZDWID: {
			type: 'STRING',
			size: '32',
		},
		ZBBM: {
			type: 'STRING',
			size: '50',
		},
		GGXH: {
			type: 'STRING',
			size: '50',
		},
		BZZYMC: {
			type: 'STRING',
			size: '50',
		},
		BZLBDM: {
			type: 'STRING',
			size: '8',
		},
		ZDBZSL: {
			type: 'float',
		},
		MRSCNL: {
			type: 'float',
		},
		JLDWDM: {
			type: 'STRING',
			size: '8',
		},
		JLZT: {
			type: 'integer',
			size: 11,
		},
		CSZT: {
			type: 'integer',
			size: 11,
		},
		SJC: {
			type: 'datetime',
		},
		BZ: {
			type: 'text',
		},
		CJSJ: {
			type: 'datetime',
		},
		SJBB: {
			type: 'float',
		},
		YWXTBSID: {
			type: 'STRING',
		},
		JKSJBB: {
			type: 'float',
		},
		VERCOL: {
			type: 'longtest',
		}
	}
}
