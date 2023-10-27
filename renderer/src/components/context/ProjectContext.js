/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import staicLangJson from '../../lib/lang/langNames.json';

const advanceSettings = require('../../lib/AdvanceSettings.json');

console.log({ advanceSettings });
export const ProjectContext = React.createContext();

const ProjectContextProvider = ({ children }) => {
  const [editorSave, setEditorSave] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [scrollLock, setScrollLock] = useState(false);
  const [sideTabTitle, setSideTabTitle] = useState('New');
  const [languages, setLanguages] = useState(staicLangJson);
  const [language, setLanguage] = useState({});
  const [customLanguages, setCustomLanguages] = useState([]);

  const [licenceList, setLicenseList] = useState(advanceSettings.copyright);
  const [copyright, setCopyRight] = useState(advanceSettings.copyright[0]);
  const [canonList, setCanonList] = useState(
    advanceSettings.canonSpecification,
  );
  const [canonSpecification, setcanonSpecification] = useState(
    advanceSettings.canonSpecification[0],
  );
  const [versification] = useState(advanceSettings.versification);
  const [versificationScheme, setVersificationScheme] = useState(
    advanceSettings.versification[0],
  );
  const [openSideBar, setOpenSideBar] = useState(false);
  const [newProjectFields, setNewProjectFields] = useState({
    projectName: '',
    description: '',
    abbreviation: '',
  });
  const [username, setUsername] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [selectedProjectMeta, setSelectedProjectMeta] = useState();
  const [importedFiles, setImportedFiles] = useState([]);
  const [sideBarTab, setSideBarTab] = useState('');

  const handleProjectFields = (prop) => (event) => {
    setNewProjectFields({ ...newProjectFields, [prop]: event.target.value });
  };

const resetProjectStates = () => {
    const initialState = {
      language: '',
      projectName: '',
      scriptDirection: 'LTR',
    };
    setNewProjectFields({ ...initialState });
    setCopyRight();
    setcanonSpecification('OT');
    setVersificationScheme('kjv');
  };

  const context = {
    states: {
      newProjectFields,
      drawer,
      copyright,
      canonSpecification,
      versification,
      versificationScheme,
      sideTabTitle,
      selectedProject,
      canonList,
      licenceList,
      languages,
      language,
      scrollLock,
      username,
      openSideBar,
      editorSave,
      sideBarTab,
      selectedProjectMeta,
      customLanguages,
      importedFiles,
    },
    actions: {
      setDrawer,
      setCopyRight,
      setcanonSpecification,
      setVersificationScheme,
      handleProjectFields,
      resetProjectStates,
      setSideTabTitle,
      setSelectedProject,
      setLanguage,
      setScrollLock,
      setUsername,
      setOpenSideBar,
      setNewProjectFields,
      setImportedFiles,
      setLanguages,
      setEditorSave,
      setSideBarTab,
      setSelectedProjectMeta,
      setCanonList,
      setCustomLanguages,
      setLicenseList,
    },
  };

  return (
    <ProjectContext.Provider value={context}>
      {children}
    </ProjectContext.Provider>
  );
};
export default ProjectContextProvider;
ProjectContextProvider.propTypes = {
  children: PropTypes.node,
};
