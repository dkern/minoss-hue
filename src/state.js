"use strict";

/**
 * check and try to parse a json string
 * @param {string} str
 * @returns {boolean|object}
 */
function isJson(str){
    try {
        var json = JSON.parse(str);

        if( json && typeof json === "object") {
            return json;
        }
    }
    catch(e) {}

    return false;
}

/**
 * merge two or more object in order
 * @param {object} target
 * @param {object} source...
 * @returns {object}
 */
function merge(target, source) {
    for( var i = 1; i < arguments.length; i++ ) {
        var obj = arguments[i];

        if( !obj ) {
            continue;
        }

        for( var key in obj ) {
            if( obj.hasOwnProperty(key) ) {
                if( typeof obj[key] === "object" ) {
                    target[key] = merge(target[key], obj[key]);
                }
                else {
                    target[key] = obj[key];
                }
            }
        }
    }

    return target;
}

/**
 * helper function to create state object
 * @param {string} state
 * @param {string} type
 * @param {object} config
 * @param {function} error
 * @returns {boolean|object}
 */
module.exports = function(state, type, config, error) {
    var json, build = {};
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
        else if( (json = isJson(state[i])) ) {
            merge(build, json);
        }

        // error on unknown entry
        else {
            return error("state '" + state[i] + "' is unknown");
        }

        json = null;
    }

    return build;
};
