"use strict";

/**
 * helper function to check if bridge is known and
 * returning configuration data
 * @param {object} config
 * @param {object|string} params
 * @returns {{ip: string, username: string}|boolean}
 */
module.exports = function(config, params) {
    //noinspection JSUnresolvedVariable
    params = params.bridge || params.b || params;

    // use default if no name is set
    if( typeof params !== "string" ) {
        params = "default";
    }

    return config.bridges[params] || false;
};