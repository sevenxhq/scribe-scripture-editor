import { isElectron } from '@/core/handleElectron';
import { environment } from '../../../../environment';
import packageInfo from '../../../../../package.json';
import OBSData from '../../../lib/OBSData.json';
import { createDirectory, newPath, supabaseStorage } from '../../../../../supabase';

const downloadImageAndSave = async (url, savePath, fs) => {
  const response = await fetch(url, { mode: 'no-cors' });
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log({ buffer, blob });
  if (blob.type.includes('image')) {
    isElectron()
    ? await fs.createWriteStream(savePath).write(buffer) : await supabaseStorage().upload(savePath, buffer);
  }
};

export const checkandDownloadObsImages = async () => {
  // check for the folder and images
  // const imageCdnBaseUrl = 'https://cdn.door43.org/obs/jpg/360px/';
  if (isElectron()) {
  const fs = window.require('fs');
  const path = require('path');
  const newpath = localStorage.getItem('userPath');
  const obsImagePath = path.join(newpath, packageInfo.name, 'common', environment.OBS_IMAGE_DIR);
  const exist = await fs.existsSync(obsImagePath);
  if (!exist) {
    await fs.mkdirSync(obsImagePath, { recursive: true });
  }
  const filesInDir = await fs.readdirSync(obsImagePath);
  await Object.values(OBSData).forEach(async (storyObj) => {
    await Object.values(storyObj.story).forEach(async (story) => {
      let fileName = story.url.split('/');
      fileName = fileName[fileName.length - 1];
      if (!filesInDir.includes(fileName)) {
        const filePath = path.join(obsImagePath, fileName);
        await downloadImageAndSave(story.url, filePath, fs);
      }
    });
  });
} else {
  const obsImagePath = `${newPath}/common/${environment.OBS_IMAGE_DIR}`;
  const { data: exist } = await supabaseStorage().list(obsImagePath);
  if (!exist) {
    await createDirectory(obsImagePath);
  }
  const { data: filesInDir } = await supabaseStorage().download(obsImagePath);
  Object.values(OBSData).forEach(async (storyObj) => {
    Object.values(storyObj.story).forEach(async (story) => {
      let fileName = story.url.split('/');
      fileName = fileName[fileName.length - 1];
      if (!filesInDir.includes(fileName)) {
        const filePath = `${obsImagePath}/${fileName}`;
        await downloadImageAndSave(story.url, filePath);
      }
    });
  });
}
};
