"use strict";

/**
 * set scene to a group
 * request parameters:
 * @param {string} bridge|b
 * @param {number} id|i
 * @param {string} group|g
 */

var hue = require("node-hue-api");
var hueBridge = require("../bridge");
var HueApi = hue.HueApi;
var formatter = require("../formatter");

module.exports = function(config, params, respond, error) {
    // check if a light id is set
    // noinspection JSUnresolvedVariable
    var id = params.id || params.i;
    if( !id ) {
        return error("no scene id given");
    }

    // check if group id is given
    var group = params.group || params.g;
    if( !group ) {
        return error("no group id given");
    }

    var bridge = hueBridge(config, params);

    // bridge not known
    if( !bridge ) {
        return error("no or unknown bridge specified");
    }

    var con = new HueApi(bridge.ip, bridge.username);

    con.activateScene(id, group, function(err, result) {
        if( err ){
            return error(err.message);
        }

        respond({
            success: true, 
            result: formatter.propertyNames(result, params.output)
        });
    });
};