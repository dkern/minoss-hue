'use strict';

module.exports = (config, params, respond, error) => {
    let action = params.action || params.a || 'get';

    switch (action) {
        default:
            let getHandler = require('./src/schedules/get');
            getHandler(config, params, respond, error);
            break;
    }
};