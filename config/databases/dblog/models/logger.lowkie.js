'use strict';
const lowkie = require('lowkie');
const Schema = lowkie.Schema;
const ObjectId = Schema.ObjectId;
const os = require('os');
const ms = require('ms');
const scheme = {
  id: ObjectId,
  updatedat: {
      type: Date,
      default: Date.now,
  },
  createdat: {
      type: Date,
      default: Date.now,
      expires: parseInt(ms('5m')) / 1000, // in seconds
  },
  hostname: {
      type: String,
      default: os.hostname()
  },
  level: String,
  msg: String,
  meta: Schema.Types.Mixed,
  ttl: {
      type: Number,
      default: parseInt(ms('5m')) / 1000,
  },
};

module.exports = {
  scheme,
  options: {},
  coreDataOptions: {
    sort: { createdat: -1, },
    docid: '_id',
    search: ['level', 'msg', 'meta', 'hostname', 'meta.ipinfo.user', 'meta.ipinfo.user.email', 'meta.ipinfo.user.username', 'meta.ipinfo.x-forwarded-for', 'meta.ipinfo.remoteAddress', 'meta.ipinfo.referer', 'meta.ipinfo.originalUrl', 'meta.ipinfo.headerHost' ],
    // population: false,
  },
};