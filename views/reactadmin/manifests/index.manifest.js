'use strict';
// const cardprops = require('../../shared/props/cardprops');
const path = require('path');
// let config = fs.readJsonSync(path.join(__dirname, '../../../content/config/extensions/periodicjs.ext.dblogger/settings.json'));

const autoManifests = require(path.join(__dirname, '../../../../../node_modules/periodicjs.ext.reactadmin/utility/detail_views/lib/manifest.js'));
const data_tables = require(path.join(__dirname, '../../../../../node_modules/periodicjs.ext.reactadmin/utility/data_tables'));
const loggerSchema = require('../../../lib/mongo_winston');
const schemas = {
  dblogger: loggerSchema,
};
const tableHeader = [
  data_tables.tableField({
    title: 'ObjectId',
    field: '_id',
    link: true,
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
  }),
  data_tables.tableCreatedDate,
  data_tables.tableField({
    title: 'Hostname',
    field: 'hostname',
  }),
  data_tables.tableField({
    title: 'Level',
    field: 'level',
  }),
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
  }),
  data_tables.tableOptions,
];

// console.log({ schemas });
// const customerScheme = require('../../../utility/reference/dsa/models/customerdata');
// const customerSchema = new customerScheme().attributes;
// const customer = new customerSchema().schema
// console.log( {customerSchema});
// console.log('new customerScheme()',new customerScheme());

module.exports = (periodic) => {
  let reactadmin = periodic.app.locals.extension.reactadmin;
  let extsettings = Object.assign({}, periodic.app.locals.extension.reactadmin.settings, {
    extension_overrides: Object.assign({},
      periodic.app.locals.extension.reactadmin.settings.extension_overrides,
      {
      customIndexTables: { dblogger:tableHeader, },
    //   customCardProps: CONSTANTS.styles.cardProps,
    //   // customEntitytypeElements: customEntityFormElements,
    //   // customIndexPageData: customEntityPageData.pageIndexData,
    //   customIndexTabs: subTabsReduced,
    //   customIndexHeader: headerTabsReduced,
    //   // customDetailPageData: customEntityPageData.pageDetailData,
    //   customDetailTabs: subTabsReduced,
    //   customDetailHeader: headerTabsReduced,
      customDetailEditor: {
        dblogger: {
          advanced: true,
          basic: false,
        },
      },
    }),
  });
  const loggerManifests = autoManifests(
    schemas,
    {
      prefix: `${reactadmin.manifest_prefix}extension/dblogger`,
      // dbname:'logger',
      extsettings,
    });
  // console.log({ loggerManifests, });
  return {
    containers: loggerManifests,
  };
};