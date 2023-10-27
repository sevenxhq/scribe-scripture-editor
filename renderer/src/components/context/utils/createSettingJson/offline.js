import * as logger from '../../../../logger';
import { environment } from '../../../../../environment';

const advanceSettings = require('../../../../lib/AdvanceSettings.json');

export const createOfflineSettingJson = async ({
 fs, file, setCanonList, setLicenseList,
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
  logger.debug('ProjectContext.js', `Creating a ${environment.USER_SETTING_FILE} file`);
  if (!fs.existsSync(file.replace(environment.USER_SETTING_FILE, ''))) {
    fs.mkdirSync(file.replace(environment.USER_SETTING_FILE, ''));
  }
  fs.writeFileSync(file, JSON.stringify(json));
};
