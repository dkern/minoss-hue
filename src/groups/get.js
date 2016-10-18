"use strict";

/**
 * get group information
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

    // get a specific light groups
    // noinspection JSUnresolvedVariable
    var id = params.id || params.i;
    if( id ) {
        // try to translate id name to id
        id = isNaN(id) && config.groups.names[id] ? config.groups.names[id] : id;

        con.getGroup(id, function(err, group) {
            if( err ){
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
        con.getGroups(function(err, groups) {
            if( err ){
                return error(err.message);
            }

            respond({
                success: true, 
                groups: formatter.propertyNames(groups, params.output)
            });
        });
    }
};