"use strict";
exports.__esModule = true;
exports.loadConfigFile = exports.getConfigFilePath = exports.rootProjectDir = void 0;
var tslib_1 = require("tslib");
var app_root_path_1 = tslib_1.__importDefault(require("app-root-path"));
var path_1 = tslib_1.__importDefault(require("path"));
/**
 * Package's root dir
 */
exports.rootProjectDir = app_root_path_1["default"].path;
exports.getConfigFilePath = function () {
    return path_1["default"].join(exports.rootProjectDir, 'i18nrc.js');
};
exports.loadConfigFile = function () {
    var configPath = exports.getConfigFilePath();
    try {
        delete require.cache[configPath];
        var config = require(configPath);
        if (!config) {
            throw new Error('i18n-code-generator: config file not found');
        }
        return config;
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=config.js.map