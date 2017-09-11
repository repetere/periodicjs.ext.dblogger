'use strict';
const periodic = require('periodicjs');

function getIndexTableFields() {
  const reactAppLocals = periodic.locals.extensions.get('periodicjs.ext.reactapp');
  const data_tables = reactAppLocals.manifest.table.data_tables;
  const reactappextsettings = periodic.settings.extensions['periodicjs.ext.reactapp'];
  
  const adminRoute = reactAppLocals.manifest.helpers.getManifestPathPrefix(reactappextsettings.adminPath);
  return {
    dblog_logger: [
      data_tables.tableField({
        title: 'ObjectId',
        link: true,
        field: '_id',
        // headerStyle: {
        //   maxWidth: 150,
        // },
        // columnStyle: {
        //   maxWidth: 150,
        // },
      })({ adminRoute, schemaName: 'dblog_logger', }),
      data_tables.tableCreatedDate({}),
      data_tables.tableField({
        title: 'Hostname',
        field: 'hostname',
        // headerStyle: {
        //   maxWidth: 150,
        // },
        // columnStyle: {
        //   maxWidth: 150,
        // },
      })({ adminRoute, schemaName: 'dblog_logger', }),
      data_tables.tableField({
        title: 'Level',
        field: 'level',
        
        // headerStyle: {
        //   maxWidth: 150,
        // },
        // columnStyle: {
        //   maxWidth: 150,
        // },
      })({ adminRoute, schemaName: 'dblog_logger', }),
      data_tables.tableField({
        title: 'Message',
        field: 'msg',
        headerStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
        columnStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
      })({ adminRoute, schemaName: 'dblog_logger', }),
      data_tables.tableOptions({ adminRoute, schemaName: 'dblog_logger', }),
    ],
  };
}

function setReactAppTable() {
  if (periodic.settings.extensions[ 'periodicjs.ext.reactapp' ]) {
    periodic.settings.extensions['periodicjs.ext.reactapp'].data_tables = Object.assign({},  periodic.settings.extensions['periodicjs.ext.reactapp'].data_tables, getIndexTableFields());
  }
}

module.exports = {
  getIndexTableFields,
  setReactAppTable,
};