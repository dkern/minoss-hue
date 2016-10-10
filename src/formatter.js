"use strict";

module.exports = {
    /**
     * format property names to a valid format for all
     * response types to have consistent output
     * @param {*} data
     * @param {string} [output]
     * @return {*}
     */
    propertyNames: function(data, output) {
        // only loop objects
        if( Object.prototype.toString.call(data) === "[object Object]" ) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    // walk recursive over sub-objects
                    if (Object.prototype.toString.call(data[key]) === "[object Object]") {
                        data[key] = this.propertyNames(data[key], output);
                    }

                    // remove whitespace and hypes in names
                    var newKey = key.replace(new RegExp("[ -]", "g"), "_");

                    // numbers or starting digit is not allowed for tags in xml
                    if( output === "xml" && !isNaN(newKey[0]) ) {
                        newKey = "id_" + newKey;
                    }

                    // if key was changes add under new one and remove old
                    if( key !== newKey ) {
                        data[newKey] = data[key];
                        delete data[key];
                    }
                }
            }
        }

        return data;
    }
};