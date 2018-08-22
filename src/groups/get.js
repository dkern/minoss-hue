'use strict';

/**
 * get group information
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

    // get a specific light groups
    // noinspection JSUnresolvedVariable
    let id = params.id || params.i;
    if (id) {
        // try to translate id name to id
        id = isNaN(id) && config.groups.names[id] ? config.groups.names[id] : id;

        con.getGroup(id, (err, group) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                group: formatter.propertyNames(group, params.output)
            });
        });
    }

    // get all light groups
    else {
        con.getGroups((err, groups) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                groups: formatter.propertyNames(groups, params.output)
            });
        });
    }
};