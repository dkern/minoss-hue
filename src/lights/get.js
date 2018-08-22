'use strict';

/**
 * get light information
 * request parameters:
 * @param {string} bridge|b
 * @param {number} id|i
 */

let hue = require('node-hue-api');
let hueBridge = require('../bridge');
let HueApi = hue.HueApi;
let formatter = require('../formatter');

module.exports = (config, params, respond, error) => {
    let bridge = hueBridge(config, params);

    // bridge not known
    if (!bridge) {
        return error('no or unknown bridge specified');
    }

    let con = new HueApi(bridge.ip, bridge.username);

    // get a specific light when id is set
    // noinspection JSUnresolvedVariable
    let id = params.id || params.i;
    if (id) {
        // try to translate id name to id
        id = isNaN(id) && config.lights.names[id] ? config.lights.names[id] : id;

        con.getLightStatus(id, (err, light) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                light: formatter.propertyNames(light, params.output)
            });
        });
    }

    // get all lights
    else {
        con.getLights((err, lights) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                lights: formatter.propertyNames(lights, params.output)
            });
        });
    }
};