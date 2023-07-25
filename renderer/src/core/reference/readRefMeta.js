import { isElectron } from '../handleElectron';
import { supabaseStorage } from '../../../../supabase';

export const readRefMeta = async ({
  projectsDir,
}) => {
  if (isElectron()) {
    const fs = window.require('fs');
    const path = require('path');
    return new Promise((resolve) => {
      if (fs.existsSync(projectsDir)) {
        const files = fs.readdirSync(projectsDir);
        const _files = [];
        // read dir to find references bundles
        files.forEach((file) => {
          const stat = fs.lstatSync(path.join(projectsDir, file));
          if (stat.isDirectory() === true) {
            _files.push(file);
            resolve(_files);
          }
        });
      }
    });
  }
    try {
      const { data: files, error } = await supabaseStorage()
        .list(`${projectsDir}`, {
          limit: 100,
          offset: 0,
        });

      if (error) {
        console.error('Error fetching files:', error);
        return [];
      }
      console.log('readRefMeta.js , folders in resources', files);
      const directoryNames = files.map((file) => file.name);
      return directoryNames;
    } catch (error) {
      console.error('Error reading reference metadata:', error);
      return [];
    }
};
