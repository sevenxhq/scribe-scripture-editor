import * as logger from '../../logger';
import packageInfo from '../../../../package.json';
import { isElectron } from '../handleElectron';
import { newPath, supabaseStorage } from '../../../../supabase';

const writeToFile = async ({
    username,
    projectname,
    filename,
    data,
}) => {
    if (isElectron()) {
        const fs = window.require('fs');
        const path = require('path');
        const newpath = localStorage.getItem('userPath');
        const projectsPath = path.join(newpath, packageInfo.name, 'users', username, 'projects', projectname, filename);
        if (fs.existsSync(projectsPath)) {
            // appending to an existing file
            logger.debug('writeToFile.js', 'Appending to the existing file');
            fs.writeFileSync(projectsPath, data);
        } else {
            // Creating new file if nothing present
            logger.debug('writeToFile.js', 'Creating new file to write');
            fs.writeFileSync(projectsPath, data);
        }
    }
    console.log({
        username, projectname, filename, data,
    });
    const filePath = `${newPath}/${username}/projects/${projectname}/${filename}`;
    const { data: projectsPath, error } = await supabaseStorage().download(filePath);
    if (projectsPath) {
        // appending to an existing file
        console.log('writeToFile.js', 'Appending to the existing file');
        supabaseStorage().update(filePath, data);
    } else {
        // Creating new file if nothing present
        console.log('writeToFile.js', 'Creating new file to write');
        supabaseStorage().upload(filePath, data);
    }
    if (error) {
        console.log(error);
    }
};

export default writeToFile;
