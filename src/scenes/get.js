'use strict';

/**
 * get scene information
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

    // get a specific scene
    // noinspection JSUnresolvedVariable
    let id = params.id || params.i;
    if (id) {
        con.getScene(id, (err, scene) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                scene: formatter.propertyNames(scene, params.output)
            });
        });
    }

    // get all scenes
    else {
        con.getScenes((err, scenes) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                scenes: formatter.propertyNames(scenes, params.output)
            });
        });
    }
};