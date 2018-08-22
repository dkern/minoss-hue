'use strict';

module.exports = (config, params, respond, error) => {
    let action = params.action || params.a || 'get';

    switch (action) {
        case 'set':
            let setHandler = require('./src/scenes/set');
            setHandler(config, params, respond, error);
            break;

        default:
            let getHandler = require('./src/scenes/get');
            getHandler(config, params, respond, error);
            break;
    }
};