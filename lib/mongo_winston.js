'use strict';
const util = require('util');
const winston = require('winston');
const mongoose = require('mongoose');
const ms = require('ms');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const os = require('os');
let logSchema;
let Logger;
let logger_level;
let mongooseConnected = false;
let mongooseConnection;
let log_message_filters = false;
let logScheme = {
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
let logSchemaInstance = new Schema(logScheme);
exports.logScheme = logScheme;
exports.logSchemaInstance = logSchemaInstance;
let MongooseLogger = winston.transports.MongooseLogger = function(options) {
    let ttl_setting = parseInt(ms(options.ttl_setting || '5m')) / 1000;
    log_message_filters = options.log_message_filters || false;
    logSchema = new Schema({
        id: ObjectId,
        createdat: {
            type: Date,
            default: Date.now,
            expires: ttl_setting // in seconds
        },
        updatedat: {
            type: Date,
            default: Date.now,
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
            default: ttl_setting,
        },
    });
    //
    // Name this logger
    //
    this.name = 'MongooseLogger';

    //
    // Set the level from your options
    //
    this.level = options.level || 'info';

    //
    // Configure your storage backing as you see fit
    //
    mongooseConnection = options.mongooseConnection || mongoose;
    // console.log('mongooseConnection', mongooseConnection);
    // console.log('mongo winston options', options);
    mongooseConnection.model(options.model_name || 'Logger', logSchema);
    Logger = mongooseConnection.model(options.model_name || 'Logger');

    if (options.mongooseConnection) {
        mongooseConnection.on('connected', () => {
            mongooseConnected = true;
            console.log('mongoose IN LOGGER just connected', 'mongooseConnection.readyState', mongooseConnection.readyState);
        });
        if (mongooseConnection.readyState === 1) {
            mongooseConnected = true;
            console.log('mongoose IN LOGGER started already');
        }

    } else {
        if (mongooseConnection.Connection.STATES.connected === mongooseConnection.Connection.readyState) {
            mongooseConnected = true;
            console.log('mongoose IN LOGGER started already');
        } else {
            mongooseConnection.connection.on('connected', () => {
                mongooseConnected = true;
                console.log('mongoose IN LOGGER just connected');
            });
        }
    }
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(MongooseLogger, winston.Transport);

MongooseLogger.prototype.log = function(level, msg, meta, callback) {
    let write_log_to_database = () => {
        if (mongooseConnected) {
            Logger.create({ level, msg, meta }, (err, reply) => {
                // console.log('mongoose logger, err, reply', err, reply);
                callback(null, true);
            });
        } else {
            console.log('mongooseConnected', mongooseConnected)
            callback(null, true);
        }
    };
    let skip_log_to_databse = () => {
        console.log('skipping db log');
        callback(null, true);
    };
    if (log_message_filters && Array.isArray(log_message_filters) && log_message_filters.length > 0) {
        let message_matched_filter = false;
        log_message_filters.forEach(hostname_filter => {
            if (msg.search(new RegExp(hostname_filter, 'gi')) !== -1) {
                message_matched_filter = true;
            }
        });
        if (message_matched_filter) {
            skip_log_to_databse();
        } else {
            write_log_to_database();
        }
    } else {
        write_log_to_database();
    }
};

exports.dblogger = MongooseLogger;
exports.getDBConnection = () => {
    return mongooseConnection;
};