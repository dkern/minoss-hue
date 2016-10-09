"use strict";

var hue = require("node-hue-api");
var api = hue.HueApi;
var formatter = require("./src/formatter");

module.exports = function(config, params, respond, error) {
    var bridge = params["bridge"] || "default";
    var con = new api(config.bridges[bridge].ip, config.bridges[bridge].username);

    con.getRegisteredUsers(function(err, users) {
        if( err ){
            return error(err.message);
        }

        respond({success: true, users: formatter.propertyNames(users, params.output)});
    });
};