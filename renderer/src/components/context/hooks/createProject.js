import { useContext } from 'react';
import PropTypes from 'prop-types';
import { isElectron } from '../../../core/handleElectron';
import * as logger from '../../../logger';
import {
  saveProjectsMeta,
  saveSupabaseProjectsMeta,
} from '../../../core/projects/saveProjetcsMeta';
import { createProjectCommonUtils } from '../utils/createProjectCommonUtils';
// import { createProjectTranslationUtils } from '../utils/createProjectTranslationUtils';
import { ProjectContext } from '../ProjectContext';
import { updateJson } from '../utils/updateJson';

export const createProject = async ({
  call,
  project,
  update,
  projectType,
  newProjectFields,
  language,
  customLanguages,
  copyright,
  licenceList,
  importedFiles,
  versificationScheme,
  canonSpecification,
  setCopyRight,
  setUsername,
  setLicenseList,
  setCanonList,
  setLanguages,
  setCustomLanguages,
}) => {
  // const {
  //   state: {
  //     language,
  //     customLanguages,
  //     copyright,
  //     licenceList,
  //     newProjectFields,
  //     importedFiles,
  //     versificationScheme,
  //     canonSpecification,
  //   },
  //   action: {
  //     setCopyRight,
  //     setUsername,
  //     setLicenseList,
  //     setCanonList,
  //     setLanguages,
  //     setCustomLanguages,
  //   },
  // } = useContext(ProjectContext);

  await createProjectCommonUtils({
    language,
    customLanguages,
    copyright,
    licenceList,
    setCopyRight,
    canonSpecification,
    setUsername,
    setLicenseList,
    setCanonList,
    setLanguages,
    setCustomLanguages,
  });
  // common props pass for all project type
  const projectMetaObj = {
    newProjectFields,
    language,
    copyright,
    importedFiles,
    call,
    project,
    update,
    projectType,
  };
  if (projectType !== 'OBS') {
    if (canonSpecification.title === 'Other') {
      await updateJson({
        currentSettings: 'canonSpecification', setUsername, setLicenseList, setCanonList, setLanguages, setCustomLanguages,
      });
    }
    const temp_obj = {
      versificationScheme: versificationScheme.title,
      canonSpecification,
    };
    Object.assign(projectMetaObj, temp_obj);
  }
  logger.debug(
    'ProjectContext.js',
    'Calling saveProjectsMeta with required props',
  );
  const status = isElectron()
    ? await saveProjectsMeta(projectMetaObj)
    : await saveSupabaseProjectsMeta(projectMetaObj);
  return status;
};

createProject.propTypes = {
  call: PropTypes.func,
  project: PropTypes.object,
  update: PropTypes.bool,
  projectType: PropTypes.string,
};
