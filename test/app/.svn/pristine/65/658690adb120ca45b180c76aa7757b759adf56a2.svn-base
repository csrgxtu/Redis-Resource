
module.exports = {
	// prevent auto create indexed id
	autoPK: false,	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_CronTaskHistory',
	// specify the adapter to use
	adapter: 'MySQL',
	// only allow fields defined in attributes to be saved
	schema: true,	
	// disable auto createdAt updatedAt columns
	autoCreatedAt: false,
	autoUpdatedAt: false,
	
	// if you don't put this types here, you will get an error
	// and the size can't be used in the attributes.
	types: {
		size: function() {
			return true;
		}
	},
	attributes: { 
		CronTaskHistoryId: {
			type: "INTEGER",
			size: 11,
			primaryKey: true,
			notNull: true,
			autoIncrement: true,
		},
		CronTaskId: {
			type: "INTEGER",
			size: 11,
		},
		DataBeginTime: {
			type: 'DATETIME',
		},
		DataEndTime: {
			type: 'DATETIME',
		},
		CompletedTime: {
			type: 'DATETIME',
		},
		AffectedRecords: {
			type: "INTEGER",
			size: 11,
		},
		Message: {
			type: 'string',
			size: 255,
		},
		CreatedTime: {
			type: 'DATETIME',
		}
	}
}