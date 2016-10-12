"use strict";

/**
 * search for hue bridges in network
 * request parameters:
 * none
 */

var hue = require("node-hue-api");
var formatter = require("../formatter");

module.exports = function(config, params, respond, error) {
    // search for bridges in network
    hue.nupnpSearch(function(err, bridges) {
        if( err ){
            return error(err);
        }

        respond({
            success: true, 
            bridges: formatter.propertyNames(bridges, params.output)
        });
    });
};