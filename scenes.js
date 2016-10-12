"use strict";

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var action = params.action || params.a || "get";

    switch(action) {
        case "set":
            var setHandler = require("./src/scenes/set");
            setHandler(config, params, respond, error);
            break;

        default:
            var getHandler = require("./src/scenes/get");
            getHandler(config, params, respond, error);
            break;
    }
};