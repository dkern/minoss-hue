'use strict';

/**
 * check and try to parse a json string
 * @param {string} str
 * @returns {boolean|object}
 */
module.exports = str => {
    try {
        let json = JSON.parse(str);

        if (json && typeof json === 'object') {
            return json;
        }
    }
    catch(e) {}

    return false;
};