/**
 * Author: Archer Reilly
 * Date: 09/Jun/2014
 * File: Session.js
 * Des: model for Session
 *
 * Produced By EBang
 */
module.exports = {
	// prevent auto create indexed id
	autoPK: false,	
	// specify table name here in database xfjwt
	tableName: 'xfjwt_Session',
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
    SessionId: {
      type: 'STRING',
      size: 36,
      primaryKey: true,
      required: true,
      notNull: true,
    },
    
    UserId: {
      model: 'XFJWT_User',
    },
    
    CreatedTime: {
      type: 'DATETIME',
      size: 20,
    },
    
    ExpiredTime: {
      type: 'DATETIME',
    },
    
    LoginAndroid: {
      type: 'INTEGER',
      size: 11,
    },
	},
};
