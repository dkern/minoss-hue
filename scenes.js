"use strict";

var hue = require("node-hue-api");
var api = hue.HueApi;
var formatter = require("./src/formatter");

module.exports = function(config, params, respond, error) {
    var mode = params["mode"] || "get";
    var bridge = params["bridge"] || "default";
    var con = new api(config.bridges[bridge].ip, config.bridges[bridge].username);

    // set scene to a group
    if( mode === "set" ) {
        var group = params["group"];

        if( !params.id ) {
            return error("no scene id given");
        }

        if( !group ) {
            return error("no group id given");
        }

        con.activateScene(params.id, group, function(err, result) {
            if( err ){
                return error(err.message);
            }

            respond({success: true, result: formatter.propertyNames(result, params.output)});
        });
    }
    else {
        // get a specific scene
        if( params.id ) {
            con.getScene(params.id, function(err, scene) {
                if( err ){
                    return error(err.message);
                }

                respond({success: true, scenes: formatter.propertyNames(scene, params.output)});
            });
        }

        // get all scenes
        else {
            con.getScenes(function(err, scenes) {
                if( err ){
                    return error(err.message);
                }

                respond({success: true, scenes: formatter.propertyNames(scenes, params.output)});
            });
        }
    }
};