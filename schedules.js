"use strict";

var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var formatter = require("./src/formatter");

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var bridge = params.bridge || "default";
    var con = new HueApi(config.bridges[bridge].ip, config.bridges[bridge].username);

    if( params.id ) {
        con.getSchedule(params.id, function(err, schedule) {
            if( err ){
                return error(err.message);
            }

            respond({success: true, schedule: formatter.propertyNames(schedule, params.output)});
        });
    }
    else {
        con.getSchedules(function(err, schedules) {
            if( err ){
                return error(err.message);
            }

            respond({success: true, schedules: formatter.propertyNames(schedules, params.output)});
        });
    }
};