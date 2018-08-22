'use strict';

module.exports = (config, params, respond, error) => {
    let action = params.action || params.a || 'search';

    switch (action) {
        case 'config':
            let configHandler = require('./src/bridges/config');
            configHandler(config, params, respond, error);
            break;

        case 'description':
            let descriptionHandler = require('./src/bridges/description');
            descriptionHandler(config, params, respond, error);
            break;

        case 'state':
            let stateHandler = require('./src/bridges/state');
            stateHandler(config, params, respond, error);
            break;

        case 'user':
            let userHandler = require('./src/bridges/user');
            userHandler(config, params, respond, error);
            break;

        case 'version':
            let versionHandler = require('./src/bridges/version');
            versionHandler(config, params, respond, error);
            break;

        default:
            let searchHandler = require('./src/bridges/search');
            searchHandler(config, params, respond, error);
            break;
    }
};