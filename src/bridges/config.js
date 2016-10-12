"use strict";

/**
 * get full configuration from a bridge
 * request parameters:
 * @param {string} bridge|b
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

    // get config for bridge
    con.getConfig(function(err, config) {
        if( err ){
            return error(err.message);
        }

        respond({
            success: true, 
            config: formatter.propertyNames(config, params.output)
        });
    });
};