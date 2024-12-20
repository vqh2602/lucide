import path from 'path';
import { readSvgDirectory } from '@lucide/helpers';

async function getIconMetaData(iconDirectory) {
  const iconJsons = readSvgDirectory(iconDirectory, '.json');
  const aliasesEntries = await Promise.all(
    iconJsons.map(async (jsonFile) => {
      /** eslint-disable */
      const file = await import(path.join(iconDirectory, jsonFile), { with: { type: 'json' } });
      return [path.basename(jsonFile, '.json'), file.default];
    }),
  );

  return Object.fromEntries(aliasesEntries);
}

export default getIconMetaData;
