/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */

import { useContext, useState, useEffect } from 'react';
import * as localForage from 'localforage';
import Login from './components/Login/Login';
import AuthenticationContextProvider, { AuthenticationContext } from './components/Login/AuthenticationContextProvider';
import { loadUsers } from './core/Login/handleJson';
import ProjectContextProvider from './components/context/ProjectContext';
import ReferenceContextProvider from './components/context/ReferenceContext';
import * as logger from './logger';
import ProjectList from './modules/projects/ProjectList';
import AutographaContextProvider from './components/context/AutographaContext';
import { getorPutAppLangage } from './core/projects/handleProfile';
import i18n from './translations/i18n';
import { isElectron } from './core/handleElectron';
import WebLogin from './components/Login/WebLogin';

const Home = () => {
  const { states, action } = useContext(AuthenticationContext);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    logger.debug('Home.js', 'Triggers loadUsers for the users list');
    loadUsers();
  }, []);

  useEffect(() => {
    localForage.getItem('userProfile').then(async (user) => {
      setUser(user);
      // set app language from saved user data on start up
      if (user?.username) {
        const appLangCode = await getorPutAppLangage('get', user.username);
        if (i18n.language !== appLangCode) {
          i18n.changeLanguage(appLangCode);
        }
      }
    });
    if (!states.accessToken) {
      logger.debug('Home.js', 'Triggers getToken to fetch the Token if not available');
      action.getToken();
      setToken();
    } else {
      logger.debug('Home.js', 'Token is available');
      localForage.getItem('sessionToken').then((value) => {
        if (!value) {
          action.setaccessToken();
        }
        setToken(value);
      });
    }
  }, [token, user, setUser, setToken, action, states.accessToken]);

  return (
    <>
      {token && user ? (
        <AuthenticationContextProvider>
          <AutographaContextProvider>
            <ProjectContextProvider>
              <ReferenceContextProvider>
                <ProjectList />
              </ReferenceContextProvider>
            </ProjectContextProvider>
          </AutographaContextProvider>
        </AuthenticationContextProvider>
      ) : (
        isElectron() ? <Login /> : <WebLogin />
      )}
    </>
  );
};
export default Home;
