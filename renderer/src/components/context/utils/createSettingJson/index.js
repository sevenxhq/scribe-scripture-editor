import isElectron from '../../../../core/handleElectron';
import { createOfflineSettingJson } from './offline';
import { createWebSettingJson } from './web';

export { createOfflineSettingJson, createWebSettingJson };

export const createSettingsJson = async ({
  fs, file, setCanonList, setLicenseList,
}) => {
  isElectron() ? await createOfflineSettingJson({
    fs, file, setCanonList, setLicenseList,
  }) : await createWebSettingJson({
    file, setCanonList, setLicenseList,
  });
};
