
module.exports = {
	autoPK: false,
	tableName: 'ZBZB_ZZGN',
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

		ZZGNZDDM: {
			type: 'STRING',
			size: 8, 
		},		

		CLLXDM: {
			type: 'STRING',
			size: 8, 
		},		

		ZZGNJB: {
			type: 'integer',
			size: 11,
		},		

		XFJGDM: {
			type: 'STRING',
			size: 32, 
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

		SJBB: {
			type: 'float',
		},		

		CJSJ: {
			type: 'datetime',
		},		

		YWXTBSID: {
			type: 'STRING',
			size: 100, 
		},		

		VERCOL: {
			type: 'longtest',
			notNull: true,
		},	

	}
}