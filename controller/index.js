'use strict';

const path = require('path');

module.exports = function(resources) {
    const dblogger = require(path.resolve(__dirname, './dblogger'))(resources);

    return {
        dblogger,
    };
};