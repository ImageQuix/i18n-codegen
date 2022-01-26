export interface I18nCodegenConfig {
    translationsFilePath: string;
    outputFilePath: string;
}
/**
 * Package's root dir
 */
export declare const rootProjectDir: string;
export declare const getConfigFilePath: () => string;
export declare const loadConfigFile: () => I18nCodegenConfig;
