import fs from 'fs-extra';
import path from 'path';
import { flattenObject } from '../util/parse-translations';
import { I18nCodegenConfig, rootProjectDir } from './config';

interface TranslationsDict {
  [key: string]: string | object;
}

export type TranslationKeys = string[];

export const generateCode = (
  translations: TranslationsDict,
  config: I18nCodegenConfig
) => {
  const flat = flattenObject(translations);
  const keys = Object.keys(flat);
  const library = config.library?.toLowerCase();

  const generatedKeys = `${keys.map(key => {
    if (library === 'formatjs' || library === 'react-intl')
      return `"${key.replace('.defaultMessage', '')}"`;
    else return `"${key}"`;
  })}`;

  return `
  export const I18nKeys = [
    ${generatedKeys}
  ] as const;
  
  export type I18nKey = typeof I18nKeys[number];
  `;
};

export const runCodegen = async (config: I18nCodegenConfig) => {
  // Get absolute paths
  const translationsFilePath = path.join(
    rootProjectDir,
    config.translationsFilePath
  );
  const outputCodePath = path.join(rootProjectDir, config.outputFilePath);

  // Ensure file and folders exists
  await fs.ensureFile(outputCodePath);

  // Clean cache
  delete require.cache[translationsFilePath]; // Deleting loaded module

  // Codegen
  const translations = require(translationsFilePath) as TranslationsDict;
  const code = generateCode(translations, config);

  await fs.writeFile(outputCodePath, code, {
    encoding: 'utf-8',
    flag: 'w',
  });
};
