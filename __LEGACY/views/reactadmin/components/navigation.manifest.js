'use strict';
const path = require('path');
module.exports = (periodic) => {
  const reUtilPath = path.join(__dirname, '../../../../../node_modules/periodicjs.ext.reactadmin/utility/locals.js');
  const reactadminUtil = require(reUtilPath)(periodic).app.locals.extension.reactadmin;
  // let reactadmin = {manifest_prefix:'/r-admin'};
  // let reactadmin = periodic.app.controller.extension.reactadmin;
  return {
    "wrapper": {
      "style": {}
    },
    "container": {
      "style": {}
    },
    "layout": {
      "component": "Menu",
      "props": {
        "style": {}
      },
      "children": [
        {
          component: "SubMenuLinks",
          children: [
            {
              "component": "MenuLabel",
              "children":"Error log"
            },
            {
              "component": "MenuAppLink",
              "props": {
                "href": `${reactadminUtil.manifest_prefix}extension/dblogger/standard/dbloggers`,
                "label":"Error Log",
                "id": "dbloggers",
              }
            },
          ],
        },
      ]
    }
  };
};