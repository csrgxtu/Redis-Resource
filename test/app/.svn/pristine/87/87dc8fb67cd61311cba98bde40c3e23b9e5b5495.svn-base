/**
 * Author: Archer Reilly
 * Date: 10/DEC/2014
 * File: CronTaskService.js
 * Desc: service for crontask
 *
 * Produced By Ebang.
 */
var fs = require('fs');
var exec = require('child_process').exec;

module.exports = {
  /**
   * refresh
   * refresh the crontab file in the system.
   *
   * @return boolean
   */
  refresh: function() {
    XFJWT_CronTask.find()
    .exec(function(err, recs) {
      if (err) {
        return false;
      }

      for (var i = 0; i < recs.length; i++) {
        if (i == 0) {
          fs.writeFileSync(sails.config.CronTask.cronFile, recs[i]['Task'] + '\n');
        } else {
          fs.appendFileSync(sails.config.CronTask.cronFile, recs[i]['Task'] + '\n');
        }
      }

      //var cmd = 'crontab /tmp/sails.cron';
      var cmd = sails.config.CronTask.crontabPath + ' '
                + sails.config.CronTask.cronFile
      exec(cmd, function(error, stdout, stderr) {
        if (error != null) {
          return false;
        }

        return true;
      });
    });
  },
}
