
module.exports = {
	autoPK: false,
	tableName: 'ZBGL_FXFJGCL',
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

		JGID: {
			type: 'STRING',
			size: 32, 
		},		

		JGMC: {
			type: 'STRING',
			size: 100, 
		},		

		ZBFLBM: {
			type: 'STRING',
			size: 20, 
		},		

		ZBFLMC: {
			type: 'STRING',
			size: 40, 
		},		

		CLDJ: {
			type: 'STRING',
			size: 20, 
		},		

		GGXH: {
			type: 'STRING',
			size: 50, 
		},		

		CPH: {
			type: 'STRING',
			size: 20, 
		},		

		SFYX: {
			type: 'STRING',
			size: 1, 
		},		

		ZBZT: {
			type: 'STRING',
			size: 10, 
		},		

		PBSJ: {
			type: 'datetime',
		},		

		JJ: {
			type: 'text',
		},		

		CJSJ: {
			type: 'datetime',
		},		

		GXSJ: {
			type: 'datetime',
		},		

		YWXTBSID: {
			type: 'STRING',
			size: 100, 
		},		

		SJBB: {
			type: 'float',
		},		

		BZ: {
			type: 'STRING',
			size: 200, 
		},		

		VERCOL: {
			type: 'longtest',
			notNull: true,
		},	

		SJC: {
			type: 'datetime',
		},		

	}
}