'use strict';
const periodic = require('periodicjs');
const utilities = require('./utilities');

module.exports = () => {
  periodic.status.on('configuration-complete', (status) => {
    const dbloggerExtSettings = periodic.settings.extensions[ 'periodicjs.ext.dblogger' ];
    periodic.logger.add(utilities.winston.coreDataWinstonLogger, dbloggerExtSettings);
    utilities.reactapphelper.setReactAppTable();
  });
  return Promise.resolve(true);
};