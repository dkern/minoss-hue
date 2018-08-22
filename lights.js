'use strict';

module.exports = (config, params, respond, error) => {
    let action = params.action || params.a || 'search';

    switch (action) {
        case 'set':
            let setHandler = require('./src/lights/set');
            setHandler(config, params, respond, error);
            break;

        default:
            let getHandler = require('./src/lights/get');
            getHandler(config, params, respond, error);
            break;
    }
};