import localforage from 'localforage';
import path from 'path';
import * as logger from '../../../../logger';
import { environment } from '../../../../../environment';
import packageInfo from '../../../../../../package.json';
import { loadSettings } from '../loadSettings';

export const updateOfflineJson = async ({
  currentSettings, setUsername, updateJson, setLicenseList, setCanonList, setLanguages, setCustomLanguages,
}) => {
  logger.debug('ProjectContext.js', 'In updateJson');
  const newpath = await localforage.getItem('userPath');
  const value = await localforage.getItem('userProfile');
  if (value) {
    setUsername(value.user.email);
  }
  const fs = window.require('fs');
  const file = path.join(newpath, packageInfo.name, 'users', value.user.email, environment.USER_SETTING_FILE);
  if (fs.existsSync(file)) {
    const agUserSettings = await fs.readFileSync(file);
    if (agUserSettings) {
      logger.debug('ProjectContext.js', 'Successfully read the data from file');
      const json = JSON.parse(agUserSettings);
      updateJson({ json, currentSettings });
      logger.debug('ProjectContext.js', 'Upadting the settings in existing file');
      await fs.writeFileSync(file, JSON.stringify(json));
      logger.debug('ProjectContext.js', 'Loading new settings from file');
      await loadSettings({
        setUsername, setLicenseList, setCanonList, setLanguages, setCustomLanguages,
       });
    } else {
      logger.error('ProjectContext.js', 'Failed to read the data from file');
    }
  }
};
