'use strict';

/**
 * set scene to a group
 * request parameters:
 * @param {string} bridge|b
 * @param {number} id|i
 * @param {string} group|g
 */

let hue = require('node-hue-api');
let hueBridge = require('../bridge');
let HueApi = hue.HueApi;
let formatter = require('../formatter');

module.exports = (config, params, respond, error) => {
    // check if a light id is set
    // noinspection JSUnresolvedVariable
    let id = params.id || params.i;
    if (!id) {
        return error('no scene id given');
    }

    // check if group id is given
    let group = params.group || params.g;
    if (!group) {
        return error('no group id given');
    }

    let bridge = hueBridge(config, params);

    // bridge not known
    if (!bridge) {
        return error('no or unknown bridge specified');
    }

    let con = new HueApi(bridge.ip, bridge.username);

    con.activateScene(id, group, (err, result) => {
        if (err) {
            return error(err.message);
        }

        respond({
            success: true, 
            result: formatter.propertyNames(result, params.output)
        });
    });
};