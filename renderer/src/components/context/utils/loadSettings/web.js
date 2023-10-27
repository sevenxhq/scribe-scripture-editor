import * as localforage from 'localforage';
import { environment } from '../../../../../environment';
import staicLangJson from '../../../../lib/lang/langNames.json';
import concatLanguages from '../concatLanguages';
import { createSettingsJson } from '../createSettingJson';

import {
  newPath, sbStorageDownload,
} from '../../../../../../supabase';

export const loadWebSettings = async ({
  setUsername, setLicenseList, advanceSettings, setCanonList, setLanguages, setCustomLanguages,
}) => {
  let currentUser;
  await localforage.getItem('userProfile').then((value) => {
    currentUser = value.user.email;
    setUsername(value.user.email);
  });
  if (!currentUser) {
    // eslint-disable-next-line no-console
    console.error('ProjectContext.js', 'Unable to find current user');
  }

  const file = `${newPath}/${currentUser}/${environment.USER_SETTING_FILE}`;
  const { data: agUserSettings, error } = await sbStorageDownload(file);
  if (error) {
    // eslint-disable-next-line no-console
    console.error('ProjectContext.js', 'Failed to read the data from file');
  }
  const json = JSON.parse(await agUserSettings.text());
  if (json.version === environment.AG_USER_SETTING_VERSION) {
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
  file, setCanonList, setLicenseList,
});
  }
};
