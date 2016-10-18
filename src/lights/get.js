"use strict";

/**
 * get light information
 * request parameters:
 * @param {string} bridge|b
 * @param {number} id|i
 */

var hue = require("node-hue-api");
var hueBridge = require("../bridge");
var HueApi = hue.HueApi;
var formatter = require("../formatter");

module.exports = function(config, params, respond, error) {
    var bridge = hueBridge(config, params);

    // bridge not known
    if( !bridge ) {
        return error("no or unknown bridge specified");
    }

    var con = new HueApi(bridge.ip, bridge.username);

    // get a specific light when id is set
    // noinspection JSUnresolvedVariable
    var id = params.id || params.i;
    if( id ) {
        // try to translate id name to id
        id = isNaN(id) && config.lights.names[id] ? config.lights.names[id] : id;

        con.getLightStatus(id, function(err, light) {
            if( err ){
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
        con.getLights(function(err, lights) {
            if( err ){
                return error(err.message);
            }

            respond({
                success: true, 
                lights: formatter.propertyNames(lights, params.output)
            });
        });
    }
};