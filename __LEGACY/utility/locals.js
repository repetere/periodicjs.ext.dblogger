'use strict';
const path = require('path');
const Promisie = require('promisie');
const fs = Promisie.promisifyAll(require('fs-extra'));
const Errorie = require('errorie');
const os = require('os');
const mongoose = require('mongoose');
const mongooseLogger = require('../lib/mongo_winston');
let mongooseConnection;

module.exports = function(periodic) {
    let appenvironment = periodic.settings.application.environment;
    let config = fs.readJsonSync(path.join(__dirname, '../../../content/config/extensions/periodicjs.ext.dblogger/settings.json'));
    let envconfig = config[appenvironment].settings;

    config[appenvironment].settings = envconfig;
    periodic.app.controller.extension.dblogger = periodic.app.controller.extension.dblogger || {};
    periodic.app.controller.extension.dblogger.settings = Object.assign({
        log_message_filters: [],
        model_name: 'Logger',
        ttl_setting: '1h'
    }, envconfig);
    if (envconfig.mongourl) {
        envconfig.mongooseConnection = mongoose.createConnection(envconfig.mongourl, envconfig.mongooptions);
        // envconfig.mongooseConnection.on('error', function(err) {
        //     console.log('\u0007');
        //     console.error('connect_sor_mongoose err', err);
        // });
        // envconfig.mongooseConnection.on('connected', () => {
        //     console.log('mongoose just connected');
        // });
        // console.log('envconfig.mongooseConnection', envconfig.mongooseConnection);
    }

    periodic.logger.add(mongooseLogger.dblogger, envconfig);
    periodic.app.controller.extension.dblogger.settings.getDBConnection = mongooseLogger.getDBConnection;
    periodic.app.locals.dblogger_util = require('../lib/log_tables')(periodic);
    periodic.app.locals.theme_name = periodic.settings.theme;
    periodic.app.locals.extension = Object.assign({}, periodic.app.locals.extension, {
        dblogger: {
            settings: periodic.app.controller.extension.dblogger.settings
        }
    });

    return periodic;
};