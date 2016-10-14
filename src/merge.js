"use strict";

/**
 * merge two or more object in order
 * @param {object} target
 * @param {object} source...
 * @returns {object}
 */
module.exports = function(target, source) {
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
};