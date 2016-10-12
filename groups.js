"use strict";

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var action = params.action || params.a || "search";

    switch(action) {
        case "set":
            var setHandler = require("./src/groups/set");
            setHandler(config, params, respond, error);
            break;

        default:
            var getHandler = require("./src/groups/get");
            getHandler(config, params, respond, error);
            break;
    }
};