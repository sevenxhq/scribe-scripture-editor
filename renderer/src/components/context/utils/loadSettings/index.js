import { isElectron } from '../../../../core/handleElectron';
import { loadOfflineSettings } from './offline';
import { loadWebSettings } from './web';

export { loadOfflineSettings, loadWebSettings };

export const loadSettings = async ({
  setUsername,
  setLicenseList,
  setCanonList,
  setLanguages,
  setCustomLanguages,
}) => {
  isElectron()
    ? await loadOfflineSettings({
        setUsername,
        setLicenseList,
        setCanonList,
        setLanguages,
        setCustomLanguages,
      })
    : await loadWebSettings();
};
