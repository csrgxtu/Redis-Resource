
module.exports = {
	autoPK: false,
	tableName: 'SWGL_ZBGL_ZBLX',
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

		LXMC: {
			type: 'STRING',
			size: 50, 
		},		

		SFQY: {
			type: 'STRING',
			size: 1, 
		},		

		SFTB: {
			type: 'STRING',
			size: 1, 
		},		

		GWZZ: {
			type: 'text',
		},		

		SSDW: {
			type: 'STRING',
			size: 32, 
		},		

		LBID: {
			type: 'STRING',
			size: 32, 
		},		

		ADDACC: {
			type: 'STRING',
			size: 32, 
		},		

		ADDACCNAME: {
			type: 'STRING',
			size: 50, 
		},		

		ADDTIME: {
			type: 'datetime',
		},		

		ADDIP: {
			type: 'STRING',
			size: 50, 
		},		

		CHGACC: {
			type: 'STRING',
			size: 32, 
		},		

		CHGACCNAME: {
			type: 'STRING',
			size: 50, 
		},		

		CHGTIME: {
			type: 'datetime',
		},		

		CHGIP: {
			type: 'STRING',
			size: 50, 
		},		

		DELETED: {
			type: 'STRING',
			size: 1, 
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