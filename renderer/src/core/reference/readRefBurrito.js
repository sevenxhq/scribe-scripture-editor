import { supabaseStorage } from '../../../../supabase';
import * as logger from '../../logger';
import { isElectron } from '../handleElectron';

export const readRefBurrito = async ({
    metaPath,
}) => {
    if (isElectron()) {
        logger.debug('readRefBurrito.js', 'In readRefBurrito');
        const fs = window.require('fs');
        const path = require('path');
        return new Promise((resolve) => {
            if (fs.existsSync(metaPath)) {
                const fileContent = fs.readFileSync(
                    path.join(metaPath),
                    'utf8',
                );
                logger.debug('readIngreadients.js', 'Returning the metadata (burrito)');
                resolve((fileContent));
            }
        });
    }
    return new Promise((resolve) => {
        const { data: files, error } = supabaseStorage()
            .download(metaPath);
        if (error) {
            console.error('Error fetching files:', error);
            return;
        }
        console.log('readIngreadients.js', 'Returning the metadata (burrito)');
        resolve((files));
    });
};
