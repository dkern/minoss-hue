"use strict";

var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var formatter = require("./src/formatter");

module.exports = function(config, params, respond, error) {
    var mode = params.mode || "get";
    // noinspection JSUnresolvedVariable
    var bridge = params.bridge || "default";
    var con = new HueApi(config.bridges[bridge].ip, config.bridges[bridge].username);

    // set a state preset to a specified light
    if( mode === "set" ) {
        var state = params.state;

        if( !params.id ) {
            return error("no light id given");
        }

        if( !state ) {
            return error("no state name given");
        }

        if( !config.lights.states[state] ) {
            return error("unknown state name");
        }

        con.setLightState(params.id, config.lights.states[state], function(err, result) {
            if( err ){
                return error(err.message);
            }

            respond({success: true, result: formatter.propertyNames(result, params.output)});
        });
    }
    else {
        // get a specific light
        if( params.id ) {
            con.getLightStatus(params.id, function(err, light) {
                if( err ){
                    return error(err.message);
                }

                respond({success: true, light: formatter.propertyNames(light, params.output)});
            });
        }

        // get all lights
        else {
            con.getLights(function(err, lights) {
                if( err ){
                    return error(err.message);
                }

                respond({success: true, lights: formatter.propertyNames(lights, params.output)});
            });
        }
    }
};