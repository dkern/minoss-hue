'use strict';

/**
 * get schedules information
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
        con.getSchedule(id, (err, schedule) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                schedule: formatter.propertyNames(schedule, params.output)
            });
        });
    }
    else {
        con.getSchedules((err, schedules) => {
            if (err) {
                return error(err.message);
            }

            respond({
                success: true, 
                schedules: formatter.propertyNames(schedules, params.output)
            });
        });
    }
};