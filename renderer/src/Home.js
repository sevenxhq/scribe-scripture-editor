'use client';

/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState, useEffect } from 'react';
import * as localForage from 'localforage';
import Login from './components/Login/Login';
import AuthenticationContextProvider, { AuthenticationContext } from './components/Login/AuthenticationContextProvider';
import ProjectContextProvider from './components/context/ProjectContext';
import ReferenceContextProvider from './components/context/ReferenceContext';
import * as logger from './logger';
import ProjectList from './modules/projects/ProjectList';
import AutographaContextProvider from './components/context/AutographaContext';
import supabase from '../../supabase';

const Home = () => {
  const { states, action } = useContext(AuthenticationContext);
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    (async function () {
      const { data: users } = await supabase.from('users_json').select();
      const { data: bucketlist, error: scribeError } = await supabase.storage.from('scribe').list('scribe');
      const { data: userJson } = await supabase.storage.from('autographa-web').download('autographa/users/users.json');

      const userJsonInfo = JSON.parse(await userJson.text());
      console.log({ userJsonInfo, bucketlist, scribeError });
      await localForage.setItem('users', userJsonInfo, (errLoc) => {
        if (errLoc) {
          logger.error('handleJson.js', 'Failed to load users list to LocalStorage');
        }
        logger.debug('handleJson.js', 'Added users list to LocalStorage');
      });
    }());
  }, []);

  return (
    <>
      {token && user
        ? (
          <AuthenticationContextProvider>
            <ProjectContextProvider>
              <ReferenceContextProvider>
                <AutographaContextProvider>
                  <ProjectList />
                </AutographaContextProvider>
              </ReferenceContextProvider>
            </ProjectContextProvider>
          </AuthenticationContextProvider>
        )
        : <Login />}
    </>
  );
};
export default Home;
