"use strict";

module.exports = function(config, params, respond, error) {
    // noinspection JSUnresolvedVariable
    var action = params.action || params.a || "search";

    switch(action) {
        case "config":
            var configHandler = require("./src/bridges/config");
            configHandler(config, params, respond, error);
            break;

        case "description":
            var descriptionHandler = require("./src/bridges/description");
            descriptionHandler(config, params, respond, error);
            break;

        case "state":
            var stateHandler = require("./src/bridges/state");
            stateHandler(config, params, respond, error);
            break;

        case "users":
            var usersHandler = require("./src/bridges/users");
            usersHandler(config, params, respond, error);
            break;

        case "version":
            var versionHandler = require("./src/bridges/version");
            versionHandler(config, params, respond, error);
            break;

        default:
            var searchHandler = require("./src/bridges/search");
            searchHandler(config, params, respond, error);
            break;
    }
};