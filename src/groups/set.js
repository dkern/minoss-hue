'use strict';

/**
 * set group information
 * request parameters:
 * @param {string} bridge|b
 * @param {number} id|i
 * @param {string} state|s
 */

let hue = require('node-hue-api');
let hueBridge = require('../bridge');
let states = require('../state');
let HueApi = hue.HueApi;
let formatter = require('../formatter');

module.exports = (config, params, respond, error) => {
    // check if a group id is set
    // noinspection JSUnresolvedVariable
    let id = params.id || params.i;
    if (!id) {
        return error('no groups id given');
    }

    // try to translate id name to id
    id = isNaN(id) && config.groups.names[id] ? config.groups.names[id] : id;

    // noinspection JSUnresolvedVariable
    let state = params.state || params.s;

    // check if a state name was given
    if (!state) {
        return error('no state name given');
    }

    // check is state is known
    state = states(state, 'groups', config, error);
    if (!state) {
        return;
    }

    let bridge = hueBridge(config, params);

    // bridge not known
    if (!bridge) {
        return error('no or unknown bridge specified');
    }

    let con = new HueApi(bridge.ip, bridge.username);

    con.setGroupLightState(id, state, (err, result) => {
        if (err) {
            return error(err.message);
        }

        respond({
            success: true, 
            result: formatter.propertyNames(result, params.output)
        });
    });
};