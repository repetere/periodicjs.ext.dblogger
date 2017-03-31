'use strict';

const path = require('path');

module.exports = function(periodic) {
  const ExtensionRouter = periodic.express.Router();
  const DBLoggerRouter = require(path.resolve(__dirname, './dblogger'))(periodic);
  const reUtilPath = path.join(__dirname, '../../../node_modules/periodicjs.ext.reactadmin/utility/locals.js');
  let reactadmin = {manifest_prefix:'/r-admin'};

  ExtensionRouter.use(`/${periodic.app.locals.adminPath}/content`, DBLoggerRouter);

  // if (typeof periodic.app.locals.adminPath==='string' && periodic.app.locals.adminPath!=='/' && periodic.app.locals.adminPath) {
  //   ExtensionRouter.use(`${periodic.app.locals.adminPath}/contentlog`, DBLoggerRouter);
  // } else {
  //   ExtensionRouter.use('/contentlog', DBLoggerRouter);
  // }

  for (var x in periodic.settings.extconf.extensions) {
		if (periodic.settings.extconf.extensions[x].name === 'periodicjs.ext.reactadmin') {
      const reactadminUtil = require(reUtilPath)(periodic).app.locals.extension.reactadmin;
      const oauth2authController = periodic.app.controller.extension.oauth2server.auth;
      reactadmin = reactadminUtil;
      ExtensionRouter.use(`${reactadmin.route_prefix}/extension/dblogger`, oauth2authController.ensureApiAuthenticated, DBLoggerRouter);
		}
	}

  return ExtensionRouter;
};