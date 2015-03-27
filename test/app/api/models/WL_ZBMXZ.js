
module.exports = {
	autoPK: false,
	tableName: 'WL_ZBMXZ',
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

		CKID: {
			type: 'STRING',
			size: 32, 
		},		

		CKMC: {
			type: 'STRING',
			size: 100, 
		},		

		HWID: {
			type: 'STRING',
			size: 32, 
		},		

		HWMC: {
			type: 'STRING',
			size: 100, 
		},		

		ZBQCBM: {
			type: 'STRING',
			size: 50, 
		},		

		ZBQCMC: {
			type: 'STRING',
			size: 50, 
		},		

		GGXH: {
			type: 'STRING',
			size: 50, 
		},		

		PCH: {
			type: 'STRING',
			size: 20, 
		},		

		YXQZ: {
			type: 'datetime',
		},		

		DJZBID: {
			type: 'STRING',
			size: 32, 
		},		

		DJZBBM: {
			type: 'STRING',
			size: 50, 
		},		

		ZCBH: {
			type: 'STRING',
			size: 30, 
		},		

		CPH: {
			type: 'STRING',
			size: 20, 
		},		

		ZBZTDM: {
			type: 'STRING',
			size: 8, 
		},		

		SFKZZ: {
			type: 'STRING',
			size: 8, 
		},		

		SFSC: {
			type: 'STRING',
			size: 8, 
		},		

		KCSL: {
			type: 'float',
		},		

		LYSL: {
			type: 'float',
		},		

		ZZSL: {
			type: 'float',
		},		

		WXSL: {
			type: 'float',
		},		

		ZTSL: {
			type: 'float',
		},		

		JLDW: {
			type: 'STRING',
			size: 8, 
		},		

		DJ: {
			type: 'float',
		},		

		JE: {
			type: 'float',
		},		

		YMXZID: {
			type: 'STRING',
			size: 32, 
		},		

		TZJLID: {
			type: 'STRING',
			size: 32, 
		},		

		ZZDJZBID: {
			type: 'STRING',
			size: 32, 
		},		

		ZZDJZBBM: {
			type: 'STRING',
			size: 50, 
		},		

		BYSJ: {
			type: 'datetime',
		},		

		JCSJ: {
			type: 'datetime',
		},		

		JZSJ: {
			type: 'datetime',
		},		

		SSXFJGID: {
			type: 'STRING',
			size: 32, 
		},		

		SSXFJGMC: {
			type: 'STRING',
			size: 100, 
		},		

		JLZT: {
			type: 'integer',
			size: 11,
			notNull: true, 
		},		

		CSZT: {
			type: 'integer',
			size: 11,
			notNull: true, 
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
			size: 100, 
		},		

		JKSJBB: {
			type: 'float',
		},		

		VERCOL: {
			type: 'longtest',
			notNull: true,
		},	

	}
}