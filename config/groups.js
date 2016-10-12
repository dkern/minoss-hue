"use strict";

module.exports = {
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