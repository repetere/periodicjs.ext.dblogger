'use strict';

const path = require('path');

module.exports = function(periodic) {
  const ExtensionRouter = periodic.express.Router();
  const DBLoggerRouter = require(path.resolve(__dirname, './dblogger'))(periodic);

  ExtensionRouter.use(`/${periodic.app.locals.adminPath}/content`, DBLoggerRouter);

  if (typeof periodic.app.locals.adminPath==='string' && periodic.app.locals.adminPath!=='/' && periodic.app.locals.adminPath) {
    ExtensionRouter.use(`${periodic.app.locals.adminPath}/contentlog`, DBLoggerRouter);
  } else {
    ExtensionRouter.use('/contentlog', DBLoggerRouter);
  }

  return ExtensionRouter;
};