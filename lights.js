"use strict";

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var action = params.action || params.a || "search";

    switch(action) {
        case "set":
            var setHandler = require("./src/lights/set");
            setHandler(config, params, respond, error);
            break;

        default:
            var getHandler = require("./src/lights/get");
            getHandler(config, params, respond, error);
            break;
    }
};