"use strict";
exports.__esModule = true;
exports.flattenObject = void 0;
// https://gist.github.com/penguinboy/762197
exports.flattenObject = function (ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if (typeof ob[i] === 'object') {
            var flatObject = exports.flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + "." + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};
//# sourceMappingURL=parse-translations.js.map