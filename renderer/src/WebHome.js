'use client';

import { useState, useEffect } from 'react';
// import { AuthenticationContext } from './components/Login/AuthenticationContextProvider';
// import { loadUsers } from './core/Login/handleJson';
import { getorPutAppLangage } from './core/projects/handleProfile';
import i18n from './translations/i18n';
import WebLogin from './components/Login/WebLogin';
import supabase from '../../supabase';
import WebProjectList from './modules/projects/WebProjectList';

const WebHome = () => {
  // const { states, action } = useContext(AuthenticationContext);
  const [session, setSession] = useState();

  // useEffect(() => {
  //   logger.debug('Home.js', 'Triggers loadUsers for the users list');
  //   loadUsers();
  // }, []);

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    if (session !== null || session !== undefined) {
      const appLangCode = await getorPutAppLangage('get', session?.user?.email);
      if (i18n.language !== appLangCode) {
        i18n.changeLanguage(appLangCode);
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (session === null || session === undefined) {
    return <WebLogin />;
  }
  return (
    <WebProjectList />);
};
export default WebHome;
