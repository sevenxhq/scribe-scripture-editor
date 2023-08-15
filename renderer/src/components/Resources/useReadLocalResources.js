import { readResourceMetadata } from '@/components/Resources/ResourceUtils/readResourceMetadata';
import { isElectron } from '@/core/handleElectron';
import * as localforage from 'localforage';
import packageInfo from '../../../../package.json';
import { createDirectory, newPath } from '../../../../supabase';

export default async function readLocalResources(username, setSubMenuItems) {
  if (isElectron()) {
    const parseData = [];
    const fs = window.require('fs');
    const path = require('path');
    const newpath = localStorage.getItem('userPath');
    const projectsDir = path.join(newpath, packageInfo.name, 'users', username, 'resources');// Read user resources
    const userResourceMetaPath = path.join(newpath, packageInfo.name, 'users', username, 'resources');
    fs.mkdirSync(path.join(newpath, packageInfo.name, 'users', username, 'resources'), {
      recursive: true,
    });
    readResourceMetadata(projectsDir, userResourceMetaPath, setSubMenuItems, parseData);

    const commonResourceDir = path.join(newpath, packageInfo.name, 'common', 'resources');// Read common resources
    const commonResourceMetaPath = path.join(newpath, packageInfo.name, 'common', 'resources');
    fs.mkdirSync(path.join(newpath, packageInfo.name, 'common', 'resources'), {
      recursive: true,
    });
    readResourceMetadata(commonResourceDir, commonResourceMetaPath, setSubMenuItems, parseData);
  } else {
    const userProfile = await localforage.getItem('userProfile');
    const email = userProfile.user.email;
    const parseData = [];
    const projectsDir = `${newPath}/${email}/resources`;
    const userResourceMetaPath = `${newPath}/${email}/resources`;
    createDirectory(userResourceMetaPath);
    readResourceMetadata(projectsDir, userResourceMetaPath, setSubMenuItems, parseData);
  }
}
