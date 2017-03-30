'use strict';
const fs = require('fs-extra');
const path = require('path');
const Errorie = require('errorie');
let dbLoggerRouter;

var extension = function(periodic) {
    try {
        //configure locals
        periodic = require('./utility/locals')(periodic);
        periodic.app.controller.extension.dblogger.utility = require('./utility/index.js')(periodic);
        periodic.app.controller.extension.dblogger.controller = Object.assign({}, require('./controller/index')(periodic));
        dbLoggerRouter = require('./router/index')(periodic);
        periodic.app.use(dbLoggerRouter);
    } catch (e) {
        throw e
        // throw new Errorie({
        //     name: 'Database Error Log Extension',
        //     message: 'Config error - ' + e.message
        // });
    }
    return periodic;
};

module.exports = extension;