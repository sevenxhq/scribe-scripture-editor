import * as localforage from 'localforage';
import { environment } from '../../../environment';
import { handleJson } from './handleJson';
import * as logger from '../../logger';
import { supabaseStorage } from '../../../../supabase';
import { isElectron } from '../handleElectron';

export const createSupabaseSettingJson = async (path) => {
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
  const { data, error } = await supabaseStorage()
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
    .download('autographa/users/users.json');

  if (error) {
    console.error(error);
    return;
  }
  // Parse the current array of users from the downloaded data
  const currentUsers = JSON.parse(await data.text());

  // Add the new user to the current array of users
  await currentUsers.push(newUser);
  // Update the array of users in the Supabase storage file with the new array
  const { data: updatedData, error: updateError } = supabaseStorage()
    .update('autographa/users/users.json', JSON.stringify(currentUsers), {
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

export const createUser = async (values, fs) => {
  logger.debug('handleLogin.js', 'In createUser to create a new user');
  const obj = {
    username: isElectron() ? values.username : values.user_metadata.username,
    firstname: '',
    lastname: '',
    email: values.email,
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
  const { data, error } = await supabaseStorage()
    .upload('autographa/users/users.json', JSON.stringify(users));

  if (error) {
    console.error('Error saving users to Supabase Storage', error);
  } else {
    console.log('Users saved to Supabase Storage', data);
  }
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
