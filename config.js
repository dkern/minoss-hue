"use strict";

var hue = require("node-hue-api");
var api = hue.HueApi;
var formatter = require("./src/formatter");

module.exports = function(config, params, respond, error) {
    var bridge = params["bridge"] || "default";
    var con = new api(config.bridges[bridge].ip, config.bridges[bridge].username);

    con.getConfig(function(err, config) {
        if( err ){
            return error(err.message);
        }

        respond({success: true, config: formatter.propertyNames(config, params.output)});
    });
};