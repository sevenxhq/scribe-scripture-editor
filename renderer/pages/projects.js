import { useState } from 'react';
import ProjectList from '@/components/Projects/ProjectList';
import AuthenticationContextProvider from '@/components/Login/AuthenticationContextProvider';
import AutographaContextProvider from '@/components/context/AutographaContext';
import ProjectContextProvider from '@/components/context/ProjectContext';
import NewProject from '@/components/Projects/NewProject';
import * as localforage from 'localforage';
import * as logger from '../src/logger';

const Projects = async () => {
  const [callEditProject, setCallEditProject] = useState(false);
  const closeEditProject = async () => {
    logger.debug('ProjectList.js', 'Closing edit project page and updating the values');
    setCallEditProject(false);
    // await FetchProjects();
  };
  const currentProject = await localforage.getItem('currentProject');
  return (

    <AuthenticationContextProvider>
      <AutographaContextProvider>
        <ProjectContextProvider>
          {
            callEditProject ? <NewProject call="edit" project={currentProject} closeEdit={() => closeEditProject()} /> : <ProjectList />
          }
        </ProjectContextProvider>
      </AutographaContextProvider>
    </AuthenticationContextProvider>
  );
};

export default Projects;
