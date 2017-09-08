'use strict';
// const path = require('path');

module.exports = (periodic) => {
  let reactapp = periodic.locals.extensions.get('periodicjs.ext.reactapp').reactapp();
  
  return {
    wrapper: {
      style: {},
    },
    container: {
      style: {},
    },
    layout: {
      component: 'Menu',
      props: {
        style: {},
      },
      children: [
        {
          component: 'SubMenuLinks',
          children: [
            {
              component: 'MenuLabel',
              children: 'Database Log',
            },
            {
              component: 'MenuAppLink',
              props: {
                href: `${reactapp.manifest_prefix}data/dblog_loggers`,
                label: 'Application Log',
                id: 'app-log',
              },
            },
            // login
            // register
            // forgot password
          ],
        },
      ],
    },
  };
};