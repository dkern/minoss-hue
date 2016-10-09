"use strict";

var hue = require("node-hue-api");
var api = hue.HueApi;
var formatter = require("./src/formatter");

module.exports = function(config, params, respond, error) {
    var mode = params["mode"] || "get";
    var bridge = params["bridge"] || "default";
    var con = new api(config.bridges[bridge].ip, config.bridges[bridge].username);

    // set a state preset to a specified light group
    if( mode === "set" ) {
        var state = params["state"];

        if( !params.id ) {
            return error("no group id given");
        }

        if( !state ) {
            return error("no state name given");
        }

        if( !config.groups.states[state] ) {
            return error("unknown state name");
        }

        con.setGroupLightState(params.id, config.groups.states[state], function(err, result) {
            if( err ){
                return error(err.message);
            }

            respond({success: true, result: formatter.propertyNames(result, params.output)});
        });
    }
    else {
        // get a specific light groups
        if( params.id ) {
            con.getGroup(params.id, function(err, group) {
                if( err ){
                    return error(err.message);
                }

                respond({success: true, group: formatter.propertyNames(group, params.output)});
            });
        }
        // get all light groups
        else {
            con.getGroups(function(err, groups) {
                if( err ){
                    return error(err.message);
                }

                respond({success: true, groups: formatter.propertyNames(groups, params.output)});
            });
        }
    }
};