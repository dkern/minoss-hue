'use strict';

module.exports = {
    /**
     * possibility to set names for internal ids of the bride
     * @type {object}
     */
    names: {
        // bedroomCeiling: 1
    },

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