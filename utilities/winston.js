'use strict';
const periodic = require('periodicjs');
const util = require('util');
const winston = require('winston');
const ms = require('ms');
const os = require('os');
const dbloggerExtSettings = periodic.settings.extensions['periodicjs.ext.dblogger'];
let log_message_filters = false;
const coreDataWinstonLogger = winston.transports.coreDataWinstonLogger = function (options) { 
  let ttl_setting = parseInt(ms(options.ttl_setting || '5m')) / 1000;
  log_message_filters = options.log_message_filters || false;
  this.name = 'coreDataWinstonLogger';
  //
  // Set the level from your options
  //
  this.level = options.level || 'silly';
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(coreDataWinstonLogger, winston.Transport);

coreDataWinstonLogger.prototype.log = function (level, msg, meta, callback) {
  const Logger = periodic.datas.get('dblog_logger');
  const write_log_to_database = () => {
    Logger.create({
      newdoc: { level, msg, meta, hostname: os.hostname(), },
    })
      .then(createdLog => {
        // console.log({ createdLog });
        callback(null, true);
      })
      .catch(callback);
  };
  const skip_log_to_databse = () => {
    console.log('skipping db log');
    callback(null, true);
  };
  if (log_message_filters && Array.isArray(log_message_filters) && log_message_filters.length > 0) {
    let message_matched_filter = false;
    log_message_filters.forEach(hostname_filter => {
      if (msg.search(new RegExp(hostname_filter, 'gi')) !== -1) {
        message_matched_filter = true;
      }
    });
    if (message_matched_filter) {
      skip_log_to_databse();
    } else {
      write_log_to_database();
    }
  } else {
    write_log_to_database();
  }
};

module.exports = {
  coreDataWinstonLogger,
};