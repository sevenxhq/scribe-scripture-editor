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
    const { data: burrito } = await supabaseStorage().download(metaPath);
    return burrito;
};
