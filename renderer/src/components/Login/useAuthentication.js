/* eslint-disable */
import * as localForage from 'localforage';
import { useState } from 'react';
import { Configuration, PublicApi } from '@ory/kratos-client';
import * as logger from '../../logger';
// import configData from '../../config.json';
import { useRouter } from 'next/navigation';
import { isElectron } from '@/core/handleElectron';
import { createUser, handleLogin } from '@/core/Login/handleLogin';
// const kratos = new PublicApi(new Configuration({ basePath: configData.base_url }));
const CryptoJS = require("crypto-js");

function useAuthentication() {
  const [accessToken, setaccessToken] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [config, setConfig] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [text, setText] = useState('');
  const [newOpen, setNewOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const router = useRouter();

  const handleUser = (token) => {
    logger.debug('useAuthentication.js', 'In handleUser to retrieve the user from the Token');
    const tokenDecodablePart = token.split('.')[1];
    const decoded = Buffer.from(tokenDecodablePart, 'base64').toString();
    const data = JSON.parse(decoded)
    localForage.getItem('users').then((user) => {
      const obj = user?.find(
        (u) => u.username === data.sessionData.user,
      );
      setCurrentUser(obj);
      setaccessToken(token);
      localForage.setItem('userProfile', obj);
      localForage.setItem('appMode', 'offline');
    });
  };

  const getToken = () => {
    logger.debug('useAuthentication.js', 'In getToken to check any token stored in localStorage');
    localForage.getItem('sessionToken').then((value) => {
      value && handleUser(value);
    });
  };

  const generateToken = (user) => {
    logger.debug('useAuthentication.js', 'In generateToken to generate a Token for the loggedIn user');
    const header = '{"alg":"HS256","typ":"JWT"}';
    const sessionData = {
      user: user.username,
      loggedAt: Date(),
      active: true,
      remember: true,
    };
    const data = JSON.stringify({ sessionData });
    const base64Header = Buffer.from(header).toString('base64');
    const base64Data = Buffer.from(data).toString('base64');
    const signature = CryptoJS.HmacSHA256(`${base64Header}.${base64Data}`, 'agv2').toString();
    const token = `${base64Header}.${base64Data}.${signature}`;
    if (token) {
      localForage.setItem('sessionToken', token);
      handleUser(token);
    }
  };

  const logout = async () => {
    logger.debug('useAuthentication.js', 'Logging out');
    setaccessToken();
    setCurrentUser();
    await localForage.removeItem('sessionToken');
    await localForage.removeItem('userProfile');
    await localForage.setItem('appMode', 'online');
    router.push('/logout');
  };

  const getConfig = (flowId) => {
    logger.debug('useAuthentication.js', 'getConfig fetch the config from the Kratos using flowID');
    kratos.getSelfServiceLoginFlow(flowId)
      .then(({ data: flow }) => {
        setConfig(flow?.methods?.password?.config);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, username: event.target.value });
    setUserNameError(false);
  };

  function closeModal() {
    setIsOpen(false);
    setShowArchived(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeAccountModal() {
    setOpen(false);
    setValues({});
  }
  function openAccountModal() {
    setOpen(true);
  }

  const handleValidation = (values) => {
    let user;
    if (values.username) {
      user = true;
      setUserNameError(false);
      setNewOpen(false);
    } else if (values.username === '') {
      user = false;
      setUserNameError(true);
    } else {
      user = false;
      setUserNameError(true);
    }
    return user;
  };
  const displayError = (errorText) => {
    setNewOpen(true);
    setTimeout(() => {
      setNewOpen(false);
    }, 2000);
    setText(errorText);
  };

  function formSubmit(event) {
    event.preventDefault();
    if (values.username === undefined || values.username.length < 3 || values.username.length > 15) {
      displayError('The input has to be between 3 and 15 characters long');
    } else if (users.length > 0 && users.find((item) => (item.username.toLowerCase() === values.username.toLowerCase().trim()))) {
      displayError('User exists, Check archived and active tab by click on view more.');
    } else {
      handleSubmit(values);
      setValues({});
    }
  }

  const handleSubmit = async (values) => {
    localForage.setItem('appMode', 'offline');
    logger.debug('Login.js', 'In handleSubmit');
    if (isElectron()) {
      // router.push('/main');
      // The below code is commented for UI dev purpose.
      if (handleValidation(values)) {
        const fs = window.require('fs');
        logger.debug(
          'LeftLogin.js',
          'Triggers handleLogin to check whether the user is existing or not',
        );
        const user = await handleLogin(users, values);
        if (user) {
          logger.debug(
            'LeftLogin.js',
            'Triggers generateToken to generate a Token for the user',
          );
          generateToken(user);
        } else {
          logger.debug(
            'LeftLogin.js',
            'Triggers createUser for creating a new user',
          );
          const user = await createUser(values, fs);
          logger.debug(
            'LeftLogin.js',
            'Triggers generateToken to generate a Token for the user',
          );
          generateToken(user);
        }
      }
    }
  };

  const checkUsers = async () => {
    logger.debug('useAuthentication.js', 'checkUsers to check if any user is stored in localStorage');
    const users = await localForage.getItem('users');
    if (users.length > 0) {
      return users;
    }
    return [];

  };
  // Below code is of Online app
  // React.useEffect(() => {
  //   if (isElectron()) {
  //     kratos.initializeSelfServiceLoginViaAPIFlow().then(({ data: flow }) => {
  //       logger.debug('useAuthentication.js', 'Calling getConfig using flowID');
  //       getConfig(flow.id);
  //     });
  //   }
  // }, []);
  const response = {
    state: { accessToken, currentUser, config, isOpen, open, values, text, newOpen, users, showArchived, userNameError },
    actions: {
      getToken, generateToken, logout, getConfig, checkUsers, setIsOpen, setUsers, handleSubmit,
      closeModal, openModal, closeAccountModal, openAccountModal, setShowArchived, setUserNameError, handleChange, formSubmit,
    },
  };
  return response;
}
export default useAuthentication;