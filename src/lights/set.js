"use strict";

/**
 * set light information
 * request parameters:
 * @param {string} bridge|b
 * @param {number} id|i
 * @param {string} state|s
 */

var hue = require("node-hue-api");
var hueBridge = require("../bridge");
var states = require("../state");
var HueApi = hue.HueApi;
var formatter = require("../formatter");

module.exports = function(config, params, respond, error) {
    // check if a light id is set
    // noinspection JSUnresolvedVariable
    var id = params.id || params.i;
    if( !id ) {
        return error("no light id given");
    }

    // try to translate id name to id
    id = isNaN(id) && config.lights.names[id] ? config.lights.names[id] : id;

    // noinspection JSUnresolvedVariable
    var state = params.state || params.s;

    // check if a state name was given
    if( !state ) {
        return error("no state name given");
    }

    // check is state is known
    state = states(state, "lights", config, error);
    if( !state ) {
        return;
    }

    var bridge = hueBridge(config, params);

    // bridge not known
    if( !bridge ) {
        return error("no or unknown bridge specified");
    }

    var con = new HueApi(bridge.ip, bridge.username);

    con.setLightState(id, state, function(err, result) {
        if( err ){
            return error(err.message);
        }

        respond({
            success: true,
            result: formatter.propertyNames(result, params.output)
        });
    });
};