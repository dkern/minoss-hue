'use strict';

let json = require('./json');
let merge = require('./merge');

/**
 * helper function to create state object
 * @param {string|array} states
 * @param {string} type
 * @param {object} config
 * @param {function} error
 * @returns {boolean|object}
 */
module.exports = (states, type, config, error) => {
    let jsonObj, build = {};
    states = states.indexOf('|') !== -1 ? states.split('|') : [states];

    states.forEach(state => {
        // skip empty entries
        if (state === '') {
            return;
        }

        // merge from config
        if (config[type].states[state]) {
            merge(build, config[type].states[state]);
        }

        // merge from json string
        else if ((jsonObj = json(state))) {
            merge(build, jsonObj);
        }

        // error on unknown entry
        else {
            return error(`state "${state}" is unknown`);
        }

        jsonObj = null;
    });

    return build;
};
