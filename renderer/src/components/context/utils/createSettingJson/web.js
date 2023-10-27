import * as logger from '../../../../logger';
import * as advanceSettings from '../../../../lib/AdvanceSettings.json';
import { environment } from '../../../../../environment';
import { sbStorageList, sbStorageUpload } from '../../../../../../supabase';

export const createWebSettingJson = async ({
  file, setCanonList, setLicenseList,
}) => {
  logger.debug('ProjectContext.js', 'Loading data from AdvanceSetting.json file');
  setCanonList(advanceSettings.canonSpecification);
  setLicenseList((advanceSettings.copyright).push({
    id: 'Other', title: 'Custom', licence: '', locked: false,
  }));
  // setLanguages([advanceSettings.languages]);
  const json = {
    version: environment.AG_USER_SETTING_VERSION,
    history: {
      copyright: [{
        id: 'Other', title: 'Custom', licence: '', locked: false,
      }],
      languages: [],
      textTranslation: {
        canonSpecification: [{
          id: 4, title: 'Other', currentScope: [], locked: false,
        }],
      },
    },
    appLanguage: 'en',
    theme: 'light',
    userWorkspaceLocation: '',
    commonWorkspaceLocation: '',
    resources: {
      door43: {
        translationNotes: [],
        translationQuestions: [],
        translationWords: [],
        obsTranslationNotes: [],
      },
    },
    sync: { services: { door43: [] } },
  };
  const data = sbStorageList(file);
  if (data.length === 0) {
    sbStorageUpload(file, JSON.stringify(json), {
      cacheControl: '3600',
      upsert: false,
    });
  }
};
