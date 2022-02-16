#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var chokidar_1 = tslib_1.__importDefault(require("chokidar"));
var ora_1 = tslib_1.__importDefault(require("ora"));
var path_1 = tslib_1.__importDefault(require("path"));
var sade_1 = tslib_1.__importDefault(require("sade"));
var codegen_1 = require("./core/codegen");
var config_1 = require("./core/config");
var pkg = require('../package.json');
var ErrorCode = {
    ModuleNotFound: 'MODULE_NOT_FOUND'
};
var cli = sade_1["default"]('i18n-codegen').version(pkg.version);
var getTime = function () {
    var now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
};
cli
    .command('generate')
    .describe('Generates types dictionary based on a translations file')
    .option('--watch', 'Generated when the translations file change')
    .action(function (_a) {
    var watch = _a.watch;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        function handleError(err) {
            if (err.code === ErrorCode.ModuleNotFound) {
                spinner.warn("Could not find translations file, please check if the path " + config_1.loadConfigFile().translationsFilePath + " is correct");
            }
            else {
                spinner.warn('Unexpected error, please create an issue! -> https://github.com/lnmunhoz/i18n-codegen/issues ');
                console.error(err.code, err.message);
            }
            if (isWatchMode) {
                spinner.info('Waiting for config file changes...');
            }
        }
        function handleGenerated() {
            spinner.succeed("Types generated sucessfully! - " + getTime());
        }
        function watchTrigger() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var config;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            spinner.start('File changed, generating types...');
                            config = config_1.loadConfigFile();
                            return [4 /*yield*/, codegen_1.runCodegen(config)
                                    .then(function () {
                                    handleGenerated();
                                    spinner.info("Watching translations on " + config.translationsFilePath + " - " + getTime());
                                })["catch"](handleError)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var spinner, isWatchMode, config_2, runSingleCodegen, watcher, err_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    spinner = ora_1["default"]('i18n-codegen started...').start();
                    isWatchMode = !!watch;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    config_2 = config_1.loadConfigFile();
                    runSingleCodegen = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    spinner.text = "Generating types...";
                                    return [4 /*yield*/, codegen_1.runCodegen(config_2)];
                                case 1:
                                    _a.sent();
                                    handleGenerated();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!!isWatchMode) return [3 /*break*/, 3];
                    return [4 /*yield*/, runSingleCodegen()];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
                case 3:
                    // Watch mode
                    spinner.info("Watching translations on " + config_2.translationsFilePath + " - " + getTime());
                    watcher = chokidar_1["default"].watch([
                        path_1["default"].join(config_1.rootProjectDir, config_2.translationsFilePath),
                        path_1["default"].join(config_1.rootProjectDir, 'i18nrc.js'),
                    ], {
                        interval: 1000
                    });
                    watcher.on('change', watchTrigger);
                    return [4 /*yield*/, runSingleCodegen()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    handleError(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
});
cli.parse(process.argv);
//# sourceMappingURL=index.js.map