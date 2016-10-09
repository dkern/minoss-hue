"use strict";

var hue = require("node-hue-api");
var formatter = require("./src/formatter");

module.exports = function(config, params, respond, error) {
    hue.nupnpSearch(function(err, bridges) {
        if( err ){
            return error(err);
        }

        respond({success: true, bridges: formatter.propertyNames(bridges, params.output)});
    });
};