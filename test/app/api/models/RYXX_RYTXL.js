
module.exports = {
	autoPK: false,
	tableName: 'RYXX_RYTXL',
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
			size: 40, 
		},		

		RYID: {
			type: 'STRING',
			size: 32, 
		},		

		YHID: {
			type: 'STRING',
			size: 32, 
		},		

		YDDH: {
			type: 'STRING',
			size: 30, 
		},		

		JTDH: {
			type: 'STRING',
			size: 30, 
		},		

		BGDH: {
			type: 'STRING',
			size: 30, 
		},		

		YDDH2: {
			type: 'STRING',
			size: 30, 
		},		

		YDDH3: {
			type: 'STRING',
			size: 30, 
		},		

		YTWDZYX: {
			type: 'STRING',
			size: 50, 
		},		

		GAWYX: {
			type: 'STRING',
			size: 50, 
		},		

		DH: {
			type: 'STRING',
			size: 30, 
		},		

		JLZT: {
			type: 'integer',
			size: 11,
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