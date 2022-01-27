import { I18nCodegenConfig } from './config';
interface TranslationsDict {
    [key: string]: string | object;
}
export declare type TranslationKeys = string[];
export declare const generateCode: (translations: TranslationsDict, config: I18nCodegenConfig) => string;
export declare const runCodegen: (config: I18nCodegenConfig) => Promise<void>;
export {};
