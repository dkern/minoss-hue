'use strict';

module.exports = (config, params, respond, error) => {
    // noinspection JSUnresolvedVariable
    let action = params.action || params.a || 'search';

    switch (action) {
        case 'set':
            let setHandler = require('./src/groups/set');
            setHandler(config, params, respond, error);
            break;

        default:
            let getHandler = require('./src/groups/get');
            getHandler(config, params, respond, error);
            break;
    }
};