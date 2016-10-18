"use strict";

module.exports = {
    /**
     * possibility to set names for internal ids of the bride
     * @type {object}
     */
    names: {
        // bedroom: 1
    },

    /**
     * predefined states for groups
     * @type {object}
     */
    states: {
        on: {
            on: true
        },
        off: {
            on: false
        },
        low: {
            bri: 1
        },
        mid: {
            bri: 128
        },
        high: {
            bri: 255
        }
    }
};