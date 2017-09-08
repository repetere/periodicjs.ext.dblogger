'use strict';

module.exports = function(resources) {
    const dbloggerController = resources.app.controller.extension.dblogger.controller.dblogger;
    const DBLoggerRouter = dbloggerController.router;

    // DBLoggerRouter.post('  /process_application',
    // 	dbloggerController.get_sor_customer_guid,
    // 	customerRequests.findCustomers,
    // 	dbloggerController.get_sor_application, 
    // 	dbloggerController.process_application);


    // 	periodic.app.controller.extension.dblogger.service = require('./controller/crons')(periodic);
    // periodic.app.use(`/${periodic.app.locals.adminPath}/content`, periodic.app.controller.extension.dblogger.service.router);
    // console.log('DBLoggerRouter.stack', DBLoggerRouter.stack);
    return DBLoggerRouter;
};