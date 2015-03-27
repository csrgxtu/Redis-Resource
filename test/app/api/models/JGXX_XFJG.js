module.exports = {
	autoPK: false,
	tableName: 'JGXX_XFJG',
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
		JGMC: {
			type: 'STRING',
			size: 50,
		},
		JGJC: {
			type: 'STRING',
			size: 50,
		},
		JGNBID: {
			type: 'STRING',
			size: 8,
		},
		JGLB: {
			type: 'STRING',
			size: 1,
		},
		JGDM: {
			type: 'STRING',
			size: 25,
		},
		XZQDM: {
			type: 'STRING',
			size: 8,
		},
		JGDZ: {
			type: 'STRING',
			size: 200,
		},
		YZBM: {
			type: 'STRING',
			size: 6,
		},
		LXDH: {
			type: 'STRING',
			size: 30,
		},
		CZHM: {
			type: 'STRING',
			size: 30,
		},
		LXR: {
			type: 'STRING',
			size: 40,
		},
		SJJGID: {
			type: 'STRING',
			size: 32,
		},
		JGLXDM: {
			type: 'STRING',
			size: 8,
		},
		JGXZDM: {
			type: 'STRING',
			size: 8,
		},
		JGTREE: {
			type: 'STRING',
			size: 100,
		},
		JGQZ: {
			type: 'float',
		},
		JGMS: {
			type: 'text',
		},
		GIS_X: {
			type: 'float',
		},
		GIS_Y: {
			type: 'float',
		},
		GIS_H: {
			type: 'float',
		},
		GLID: {
			type: 'STRING',
			size: 32,
		},
		XQGLID: {
			type: 'STRING',
			size: 32,
		},
		SSYM: {
			type: 'STRING',
			size: 200,
		},
		ZP: {
			type: 'longtest',
		},
		JGCXZT: {
			type: 'STRING',
			size: 8,
		},
		JGCXSJ: {
			type: 'datetime',
		},
		YWXTBSID: {
			type: 'STRING',
			size: 100,
		},
		ZQDWBZ: {
			type: 'integer',
			size: 11,
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
		JKSJBB: {
			type: 'float',
		},
		VERCOL: {
			type: 'longtest',
		},
    SystemLogs: {
      collection: 'XFJWT_SystemLog',
      via: 'OrganizationId',
    },
	}
}
