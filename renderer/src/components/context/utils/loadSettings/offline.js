import localforage from 'localforage';
import path from 'path';
import * as logger from '../../../../logger';
import { environment } from '../../../../../environment';
import packageInfo from '../../../../../../package.json';
import concatLanguages from '../concatLanguages';
import staicLangJson from '../../../../lib/lang/langNames.json';
import { createSettingsJson } from '../createSettingJson';

const advanceSettings = require('../../../../lib/AdvanceSettings.json');

export const loadOfflineSettings = async ({
 setUsername, setLicenseList, setCanonList, setLanguages, setCustomLanguages,
}) => {
  logger.debug('ProjectContext.js', 'In loadSettings');
  const newpath = await localStorage.getItem('userPath');
  let currentUser;
  await localforage.getItem('userProfile').then((value) => {
    currentUser = value?.username;
    setUsername(currentUser);
  });
  if (!currentUser) {
    logger.error('ProjectContext.js', 'Unable to find current user');
    return;
  }
  const fs = window.require('fs');
  const file = path.join(newpath, packageInfo.name, 'users', currentUser, environment.USER_SETTING_FILE);
  if (fs.existsSync(file)) {
    const agUserSettings = await fs.readFileSync(file);
    if (agUserSettings) {
      logger.debug('ProjectContext.js', 'Successfully read the data from file');
      const json = JSON.parse(agUserSettings);

      if (json.version === environment.AG_USER_SETTING_VERSION) {
        // Checking whether any custom copyright id available (as expected else will
        // create a new one) or not
        if (json.history?.copyright) {
          if (json.history?.copyright?.licence) {
            setLicenseList((advanceSettings.copyright)
              .concat(json.history?.copyright));
          } else {
            const newObj = (advanceSettings.copyright).filter((item) => item.Id !== 'Other');
            newObj.push({
              id: 'Other', title: 'Custom', licence: '', locked: false,
            });
            setLicenseList(newObj);
          }
        } else {
          setLicenseList(advanceSettings.copyright);
        }
        setCanonList(json.history?.textTranslation.canonSpecification
          ? (advanceSettings.canonSpecification)
            .concat(json.history?.textTranslation.canonSpecification)
          : advanceSettings.canonSpecification);
        // concat static and custom languages
        const langFilter = await concatLanguages(json, staicLangJson);
        const filteredLang = langFilter.concatedLang.filter((lang) => lang?.ang.trim() !== '');
        setLanguages([...filteredLang]);
        setCustomLanguages(langFilter.userlanguages);
      } else {
        createSettingsJson({
 fs, file, setCanonList, setLicenseList,
});
      }
    }
  } else {
    createSettingsJson({
 fs, file, setCanonList, setLicenseList,
});
  }
};
