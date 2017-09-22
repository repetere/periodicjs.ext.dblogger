'use strict';

const periodic = require('periodicjs');
const extRouter = periodic.express.Router();
const usesBasicAdmin = periodic.extensions.has('periodicjs.ext.admin');
const usesReactApp = periodic.extensions.has('periodicjs.ext.reactapp');
// const controllers = require('../controllers');
//controllers.admin.adminResLocals

if (usesBasicAdmin || usesReactApp) {
  const passportControllers = periodic.controllers.extension.get('periodicjs.ext.passport');
  const uacControllers = periodic.controllers.extension.get('periodicjs.ext.user_access_control').uac;
  const utilities = require('../utilities');
  const dataRouters = utilities.data.getDataCoreController();
  
  // extRouter.use(passportControllers.auth.ensureAuthenticated, uacControllers.loadUserRoles);
  if (usesBasicAdmin) {
    const adminControllers = periodic.controllers.extension.get('periodicjs.ext.admin').admin;
    extRouter.use(adminControllers.adminResLocals);
  }
  extRouter.use(dataRouters.get('dblog_logger').router);
}

module.exports = extRouter;