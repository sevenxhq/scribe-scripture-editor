import * as localforage from 'localforage';
import { environment } from '../../../environment';
import { handleJson, handleSupabaseJson } from './handleJson';
import * as logger from '../../logger';
import supabase, { supabaseStorage } from '../../../../supabase';
import { isElectron } from '../handleElectron';

const advanceSettings = require('../../lib/AdvanceSettings.json');

const createSupabaseSettingJson = async (path) => {
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
  const { data, error } = await supabase
    .storage
    .from('autographa-web')
    .upload(path, JSON.stringify(json), {
      cacheControl: '3600',
      upsert: false,
    });
    if (data) {
      console.log('success, ag-user.json', data);
    }
    console.log({ error });
};

const addNewUser = async (newUser) => {
  // Fetch the current array of users from the Supabase storage file
  const { data, error } = await supabaseStorage()
    .download('autographa/users/newUsers.json');

  if (error) {
    console.error(error);
    return;
  }
  // Parse the current array of users from the downloaded data
  const currentUsers = JSON.parse(await data.text());

  // Add the new user to the current array of users
  await currentUsers.push(newUser);
  // Update the array of users in the Supabase storage file with the new array
  const { data: updatedData, error: updateError } = await supabase
    .storage
    .from('autographa-web')
    .update('autographa/users/newUsers.json', JSON.stringify(currentUsers), {
      cacheControl: '3600',
      // Overwrite file if it exis
      upsert: true,
    });
  createSupabaseSettingJson(`autographa/users/${newUser.username}/ag-user-settings.json`);

  if (updateError) {
    console.error('update user error', updateError);
    return;
  }
  if (updatedData) {
    console.log('New user added successfully!');
  }
};

const createSupabaseUser = async (values) => {
  const newpath = 'autographa/users';
  logger.debug('handleJson.js', 'Inside handleJson');

  // Check if the file exists
  const { data: fileExists, error: fileExistsError } = await supabase
    .storage
    .from('autographa-web')
    .list(`${newpath}/users.json`);

  if (fileExistsError) {
    logger.error('handleJson.js', 'Failed to check if file exists');
    return { userExist: false, fetchFile: true };
  }

  let users = [];
  const error = { userExist: false, fetchFile: false };

  if (fileExists.length > 0) {
    // Fetch the file contents
    const { data: fileData, error: fileDataError } = await supabase
      .storage
      .from('autographa-web')
      .download(`${newpath}/users.json`);

    if (fileDataError) {
      logger.error('handleJson.js', 'Failed to read the data from file');
      error.fetchFile = true;
      return error;
    }
    logger.debug('handleJson.js', 'Successfully read the data from file');
    users = JSON.parse(fileData);
  }

  // Add new user to the existing list in file
  users.push(values);

  // Write updated contents to the file
  const { error: writeError } = await supabase
    .storage
    .from('autographa-web')
    .upload(`${newpath}/users.json`, JSON.stringify(users));

  if (writeError) {
    logger.error('handleJson.js', 'Failed to write data to file');
    return error;
  }

  logger.debug('handleJson.js', 'Successfully added new user to the existing list in file');

  // Create directories for new user
  const { error: mkdirError } = await supabase
    .storage
    .from('autographa-web')
    .createBucket(`${newpath}/${values.username}/projects`);

  if (mkdirError) {
    logger.error('handleJson.js', 'Failed to create directories for new user');
    return error;
  }

  logger.debug('handleJson.js', 'Successfully created directories for new user');

  // Add new user to localForage
  const { error: localForageError } = await localforage.setItem('users', users);

  if (localForageError) {
    logger.error('handleJson.js', 'Failed to add new user to existing list');
    return error;
  }

  logger.debug('handleJson.js', 'Added new user to existing list');
  return error;
};
export const createUser = async (values, fs) => {
  logger.debug('handleLogin.js', 'In createUser to create a new user');
  const obj = {
    username: values.username,
    firstname: '',
    lastname: '',
    email: '',
    organization: '',
    selectedregion: '',
    lastSeen: new Date(),
    isArchived: false,
  };
  if (isElectron()) {
    await handleJson(obj, fs);
    return obj;
  }
  console.log('new user', obj);
  addNewUser(obj);
  // createSupabaseUser(obj);
  return obj;
};

/**
 * It writes the users to a file.
 * @param users - [{
 */
export const writeToFile = (users) => {
  const newpath = localStorage.getItem('userPath');
  const fs = window.require('fs');
  const path = require('path');
  const file = path.join(newpath, 'autographa', 'users', 'users.json');
  fs.writeFileSync(file, JSON.stringify(users), (err) => {
    if (err) {
      logger.debug('handleLogin.js', 'Error saving users to disk');
    }
  });
};

const writeToSupabase = async (users) => {
  console.log('file deleted', users);

  // const { data, error } = await supabase.storage
  //   .from('autographa-web')
  //   .upload(file, JSON.stringify(users));

  // if (error) {
  //   console.error('Error saving users to Supabase Storage', error);
  // } else {
  //   console.log('Users saved to Supabase Storage', data);
  // }
};

/**
 * It takes an array of users and a username and returns the user object if the username is found in
 * the array.
 * @param users - [{username: 'test', password: 'test', lastSeen: '2019-01-01'}]
 * @param values - {
 * @returns The user object.
 */
export const handleLogin = async (users, values) => {
  logger.debug('handleLogin.js', 'In handleLogin function');
  if (users) {
    const user = users.find((value) => value.username === values.username);
    console.log('handleSubmit props', { users, values, user });
    if (user) {
      user.lastSeen = new Date();
      logger.debug('handleLogin.js', 'Found user');
      users.map((obj) => user.username === obj.username || obj);
      isElectron() ? writeToFile(users) : writeToSupabase(users);
      await localforage.setItem('users', users);
      return user;
    }
  }
  return null;
};
