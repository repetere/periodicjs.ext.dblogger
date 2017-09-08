'use strict';

module.exports = {
  settings: {
    log_message_filters: [],
    level: 'silly',
    ttl_setting: '1h'
  },
  databases: {
    dblog: {
      router: {},
      controller: {
        default: {
          responder: {
            adapter: 'json'
          },
          protocol: {
            api: 'rest',
            adapter: 'http'
          }
        }
      },
      db: 'lowkie',
      options: {
        dbpath: 'content/data/logs/dblog_db.json',
        dboptions: {
          verbose: true,
        },
      },
      /*
      options: {
        mongoose_options: {
          server: {
            socketTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            keepAlive: 1
          },
          replset: {
            socketTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            keepAlive: 1,
            rs_name: '___RS__NAME___'
          }
        },
        url: 'mongodb://id:password@address:port/db'
      },
      db: 'mongoose'
      */
    }
  },
};