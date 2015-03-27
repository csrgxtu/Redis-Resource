/**
 * Author: Archer Reilly
 * Date: 18/Sep/2014
 * File: FreeSWITCHController.js
 * Desc: controller control freeSwitch user register, update
 * and delete.
 *
 * Produced By Ebang.
 */
var fs = require('fs');
var exec = require('child_process').exec, child;

module.exports = {
  /**
   * register
   * register a user in FreeSWITCH
   *
   * @param userName string
   * @param passWord string(number)
   * @return RESTful Json
   */
  register: function(req, res, userName, passWord) {
    //var userName = req.param('userName');
    //var passWord = req.param('passWord');
    if (userName == null || userName == '' || passWord == null
      || passWord == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }
	
	
    // build the xml data
    var xml = '<include>\n'
      + '  <user id="' + passWord + '">\n'
      + '    <params>\n'
      + '      <param name="password" value="' + userName + '"/>\n'
      + '      <param name="vm-password" value="' + passWord + '"/>\n'
      + '    </params>\n'
      + '    <variables>\n'
      + '       <variable name="toll_allow" value="domestic,international,local"/>\n'
      + '       <variable name="accountcode" value="' + passWord + '"/>\n'
      + '       <variable name="user_context" value="default"/>\n'
      + '       <variable name="effective_caller_id_name" value="Extension ' + passWord + '"/>\n'
      + '       <variable name="effective_caller_id_number" value="' + passWord + '"/>\n'
      + '       <variable name="outbound_caller_id_name" value="$${outbound_caller_name}"/>\n'
      + '       <variable name="outbound_caller_id_number" value="$${outbound_caller_id}"/>\n'
      + '       <variable name="callgroup" value="techsupport"/>\n'
      + '    </variables>\n'
      + '  </user>\n'
      + '</include>';

    var fileName = userName + ".xml";
	
    var absPath = sails.config.freeswitch.userConfPath + fileName;
	
	if(fs.existsSync(absPath)){
		fs.unlink(absPath, function(err) {
			if(err)
				return res.send(sails.config.returnCode.FILE_ERROR);
			if (fs.writeFileSync(absPath, xml) < 0) {
			  return res.send(sails.config.returnCode.FILE_ERROR);
			} else {
			  child = exec(sails.config.freeswitch.fsCliPath,
				function (error, stdout, stderr) {
				  if (error !== null) {
					return res.send(sails.config.returnCode.FREESWITCH_ERROR);
				  }

				  return res.send(sails.config.returnCode.FREESWITCH_OK);
			  });
			}
		})
	}else{
		if (fs.writeFileSync(absPath, xml) < 0) {
		  return res.send(sails.config.returnCode.FILE_ERROR);
		} else {
		  child = exec(sails.config.freeswitch.fsCliPath,
			function (error, stdout, stderr) {
			  if (error !== null) {
				return res.send(sails.config.returnCode.FREESWITCH_ERROR);
			  }

			  return res.send(sails.config.returnCode.FREESWITCH_OK);
		  });
		}
	}
  },

  /**
   * update
   * update an existing user in FreeSWITCH
   *
   * @param userName string
   * @param passWord string(number)
   * @return RESTful Json
   */
   
  /**
   * delete
   * delete an existing user in FreeSWITCH
   *
   * @param userName string
   * @return RESTful Json
   */
  delete: function(req, res, userName) {
    //var userName = req.param('userName');
    if (userName == null || userName == '') {
      return res.send(sails.config.returnCode.INVALID_PARAM);
    }

    var fileName = userName + ".xml";
    var absPath = sails.config.freeswitch.userConfPath + fileName;
    fs.unlink(absPath, function(err) {
		console.log(absPath);
      if (err) {
        return res.send(sails.config.returnCode.FILE_ERROR);
      } else {
        child = exec(sails.config.freeswitch.fsCliPath,
          function (error, stdout, stderr) {
            if (error !== null) {
              return res.send(sails.config.returnCode.FREESWITCH_ERROR);
            }

            return res.send(sails.config.returnCode.FREESWITCH_OK);
        });
      }
    });
  },
}
