'use strict';

/**
 * search for hue bridges in network
 * request parameters:
 * none
 */

let hue = require('node-hue-api');
let formatter = require('../formatter');

module.exports = (config, params, respond, error) => {
    // search for bridges in network
    hue.nupnpSearch((err, bridges) => {
        if (err) {
            return error(err);
        }

        respond({
            success: true, 
            bridges: formatter.propertyNames(bridges, params.output)
        });
    });
};