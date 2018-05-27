'use strict';
const Sequelize = require('sequelize');
const os = require('os');
const ms = require('ms');

const scheme = {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  updatedat: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  createdat: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  hostname: {
    type: Sequelize.STRING,
    default: os.hostname(),
  },
  level: {
    type: Sequelize.STRING,
  },
  msg: {
    type: Sequelize.STRING,
  },
  meta: {
    type: Sequelize.STRING,
    // allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('meta'));
    },
    set(val) {
      this.setDataValue('meta', JSON.stringify(val));
    },
  },
  ttl: {
    type: Sequelize.INTEGER,
    default: parseInt(ms('5m')) / 1000,
  },
};

module.exports = {
  scheme,
  associations:[],
  options: {},
  coreDataOptions: {
    sort: { createdat: -1, },
    docid: '_id',
    search: [
      'level', 'msg', 'meta', 'hostname', 'meta.ipinfo.user', 'meta.ipinfo.user.email', 'meta.ipinfo.user.username', 'meta.ipinfo.x-forwarded-for', 'meta.ipinfo.remoteAddress', 'meta.ipinfo.referer', 'meta.ipinfo.originalUrl', 'meta.ipinfo.headerHost',
    ],
    // population: false,
  },
};