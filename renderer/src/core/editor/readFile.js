/* eslint-disable no-async-promise-executor */
import { readBlobAsync } from '@/components/EditorPage/ObsEditor/core';
import { supabaseStorage } from '../../../../supabase';

export const readFile = async ({
    username,
    projectname,
    filename,
}) => {
    const fs = window.require('fs');
    const path = require('path');
    const newpath = localStorage.getItem('userPath');
    const projectsPath = path.join(newpath, 'autographa', 'users', username, 'projects', projectname, filename);
    return new Promise((resolve) => {
        if (fs.existsSync(projectsPath)) {
            const fileContent = fs.readFileSync(
                path.join(projectsPath),
                'utf8',
            );
            resolve(fileContent);
        }
    });
};

export const readWebFile = async ({
    projectname,
    filename,
}) => {
    const projectsPath = `autographa/users/samuel/projects/${projectname}/${filename}`;
    return new Promise(async (resolve) => {
        const { data: fileContent, error } = await supabaseStorage().download(projectsPath);
        if (error) {
            console.error('readWebFile function error', error);
        }
        const parsedData = readBlobAsync(fileContent);
        resolve(parsedData);
    });
};
