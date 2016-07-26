'use strict';

const path = require('path');

module.exports = function(periodic) {
    const ExtensionRouter = periodic.express.Router();
    const DBLoggerRouter = require(path.resolve(__dirname, './dblogger'))(periodic);

    ExtensionRouter.use(`/${periodic.app.locals.adminPath}/content`, DBLoggerRouter);

    return ExtensionRouter;
};