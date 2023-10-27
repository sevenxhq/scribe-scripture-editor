import localforage from 'localforage';
import { environment } from '../../../../../environment';
import {
  newPath, sbStorageUpload, sbStorageDownload,
} from '../../../../../../supabase';
import { loadSettings } from '../loadSettings';

export const updateWebJson = async ({
  currentSettings, setUsername, updateJson,
}) => {
  const value = await localforage.getItem('userProfile');
  if (value) {
    setUsername(value.user.email);
  }
  const file = `${newPath}/${value.user.email}/${environment.USER_SETTING_FILE}`;
  const { data } = await sbStorageDownload(file);
  if (data) {
    const json = JSON.parse(await data.text());
    updateJson({ json, currentSettings });
    await sbStorageUpload(file, JSON.stringify(json));
    await loadSettings();
  } else {
    // eslint-disable-next-line no-console
    console.error('ProjectContext.js', 'Failed to read the data from file');
  }
};
