"use strict";

/**
 * get scene information
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

    // get a specific scene
    // noinspection JSUnresolvedVariable
    var id = params.id || params.i;
    if( id ) {
        con.getScene(id, function(err, scene) {
            if( err ){
                return error(err.message);
            }

            respond({
                success: true, 
                scene: formatter.propertyNames(scene, params.output)
            });
        });
    }

    // get all scenes
    else {
        con.getScenes(function(err, scenes) {
            if( err ){
                return error(err.message);
            }

            respond({
                success: true, 
                scenes: formatter.propertyNames(scenes, params.output)
            });
        });
    }
};