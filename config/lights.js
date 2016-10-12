"use strict";

module.exports = {
    /**
     * predefined states for lamps
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