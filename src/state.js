"use strict";

var json = require("./json");
var merge = require("./merge");

/**
 * helper function to create state object
 * @param {string} state
 * @param {string} type
 * @param {object} config
 * @param {function} error
 * @returns {boolean|object}
 */
module.exports = function(state, type, config, error) {
    var jsonObj, build = {};
    state = state.indexOf("|") !== -1 ? state.split("|") : [state];

    for( var i = 0; i < state.length; i++ ) {
        // skip empty entries
        if( state[i] === "" ) {
            continue;
        }

        // merge from config
        if( config[type].states[state[i]] ) {
            merge(build, config[type].states[state[i]]);
        }

        // merge from json string
        else if( (jsonObj = json(state[i])) ) {
            merge(build, jsonObj);
        }

        // error on unknown entry
        else {
            return error("state '" + state[i] + "' is unknown");
        }

        jsonObj = null;
    }

    return build;
};
