"use strict";

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var action = params.action || params.a || "get";

    switch(action) {
        default:
            var getHandler = require("./src/schedules/get");
            getHandler(config, params, respond, error);
            break;
    }
};