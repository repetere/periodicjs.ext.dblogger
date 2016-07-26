'use strict';
const Promisie = require('promisie');
const fs = require('fs-extra');
const path = require('path');

let CoreController;
let logger;
let appSettings;
let appenvironment;
let cloudUploads;
let CoreUtilities;
let dbloggerSettings;
let mongooseLogger;

module.exports = function(resources) {
    appSettings = resources.settings;
    appenvironment = appSettings.application.environment;
    CoreController = resources.core.controller;
    CoreUtilities = resources.core.utilities;
    dbloggerSettings = resources.app.controller.extension.dblogger.settings;
    mongooseLogger = resources.app.controller.extension.dblogger.settings.getDBConnection().model(dbloggerSettings.model_name);
    console.log('from controller mongooseLogger', mongooseLogger);
    logger = resources.logger;
    let cronSettings = {
        model_name: 'dblogger',
        model: mongooseLogger,
        controllerOptions: {
            model: mongooseLogger
        },
        use_admin_menu: true,
        use_plural_view_names: true,
        // load_model_population: 'asset',
        // load_multiple_model_population: 'asset',
        use_full_data: true,
        extname: 'periodicjs.ext.dblogger'
    };
    let override = {
        // create_item: [setCronFilePath, assetController.multiupload, assetController.create_assets_from_files, createCrons],
        // create_index: [cron_create_index],
        // delete_item: [deleteCron],
        update_item: [
            function(req, res, next) {
                req.body.runtime_options = JSON.parse(req.body.runtime_options || '{}');
                next();
            },
            CoreController.save_revision,
            CoreController.controller_update(cronSettings)
        ]
    };
    cronSettings.override = override;
    let dbloggerController = CoreController.controller_routes(cronSettings);

    // let asyncadminController = resources.app.controller.extension.asyncadmin;
    // if (asyncadminController) {
    //     dbloggerController.router.post('/dblogger/:id/edit', asyncadminController.admin.fixCodeMirrorSubmit, CoreController.save_revision, dbloggerController.update);
    // }
    return dbloggerController;
};