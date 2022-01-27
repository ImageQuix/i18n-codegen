"use strict";
exports.__esModule = true;
exports.runCodegen = exports.generateCode = void 0;
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var parse_translations_1 = require("../util/parse-translations");
var config_1 = require("./config");
exports.generateCode = function (translations, config) {
    var _a;
    var flat = parse_translations_1.flattenObject(translations);
    var keys = Object.keys(flat);
    var library = (_a = config.library) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    var generatedKeys = "" + keys.map(function (key) {
        if (library === 'formatjs' || library === 'react-intl')
            return key.replace('.defaultMessage', '');
        else
            return key;
    });
    return "\n  export const I18nKeys = [\n    " + generatedKeys + "\n  ] as const;\n  \n  export type I18nKey = typeof I18nKeys[number];\n  ";
};
exports.runCodegen = function (config) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var translationsFilePath, outputCodePath, translations, code;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                translationsFilePath = path_1["default"].join(config_1.rootProjectDir, config.translationsFilePath);
                outputCodePath = path_1["default"].join(config_1.rootProjectDir, config.outputFilePath);
                // Ensure file and folders exists
                return [4 /*yield*/, fs_extra_1["default"].ensureFile(outputCodePath)];
            case 1:
                // Ensure file and folders exists
                _a.sent();
                // Clean cache
                delete require.cache[translationsFilePath]; // Deleting loaded module
                translations = require(translationsFilePath);
                code = exports.generateCode(translations, config);
                return [4 /*yield*/, fs_extra_1["default"].writeFile(outputCodePath, code, {
                        encoding: 'utf-8',
                        flag: 'w'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=codegen.js.map