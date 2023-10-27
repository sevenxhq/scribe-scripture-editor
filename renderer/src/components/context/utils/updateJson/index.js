import { isElectron } from '../../../../core/handleElectron';
import { updateOfflineJson } from './offline';
import { updateWebJson } from './web';
import { uniqueId } from '../uniqueId';
import { environment } from '../../../../../environment';

export const updateJson = async ({
  currentSettings,
  setUsername,
  copyright,
  language,
  canonSpecification,
  setLicenseList,
  setCanonList,
  setLanguages,
  setCustomLanguages,
}) => {
  // shared function
  const _updateJson = ({ currentSettings, json }) => {
    // eslint-disable-next-line no-nested-ternary
    const currentSetting = currentSettings === 'copyright'
        ? copyright
        : currentSettings === 'languages'
        ? {
            title: language.ang,
            id: language.id,
            scriptDirection: language.ld,
            langCode: language.lc,
            custom: true,
          }
        : canonSpecification;
    if (currentSettings === 'canonSpecification') {
      json.history?.textTranslation[currentSettings]?.push(currentSetting);
    } else if (
      json.history[currentSettings]
      && uniqueId(json.history[currentSettings], currentSetting.id)
    ) {
      json.history[currentSettings].forEach((setting) => {
        if (setting.id === currentSetting.id) {
          const keys = Object.keys(setting);
          keys.forEach((key) => {
            setting[key] = currentSetting[key];
          });
        }
      });
    } else {
      // updating the canon or pushing new language
      json.history[currentSettings].push(currentSetting);
    }
    json.version = environment.AG_USER_SETTING_VERSION;
    json.sync.services.door43 = json?.sync?.services?.door43
      ? json?.sync?.services?.door43
      : [];
  };

  isElectron()
    ? await updateOfflineJson({
        currentSettings,
        setUsername,
        updateJson: _updateJson,
        setLicenseList,
        setCanonList,
        setLanguages,
        setCustomLanguages,
      })
    : await updateWebJson({
        currentSettings,
        setUsername,
        updateJson: _updateJson,
        setLicenseList,
        setCanonList,
        setLanguages,
        setCustomLanguages,
      });
};
