'use strict';
// const path = require('path');

module.exports = (periodic) => {
  const reactappLocals = periodic.locals.extensions.get('periodicjs.ext.reactapp');
  const reactapp = reactappLocals.reactapp();
  
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
        reactappLocals.server_manifest.core_navigation.getSidebarNav({
          title: 'Database Log',
          links: [
            {
              href: `${reactapp.manifest_prefix}data/dblog_loggers`,
              label: 'Application Log',
              id: 'app-log',
            },
          ]
        }),
      ],
    },
  };
};