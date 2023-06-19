import { readRefMeta } from '@/core/reference/readRefMeta';
import { readRefBurrito } from '@/core/reference/readRefBurrito';
import * as localforage from 'localforage';
import { isElectron } from '@/core/handleElectron';
import { supabaseStorage } from '../../../../../supabase';

const path = require('path');

export async function readResourceMetadata(projectsDir, resourcePath, setSubMenuItems, parseData) {
  console.log({
    projectsDir, resourcePath,
  });
  if (isElectron()) {
    const refs = await readRefMeta({ projectsDir });
    refs.forEach(async (ref) => {
      const metaPath = path.join(`${resourcePath}`, ref, 'metadata.json');
      const data = await readRefBurrito({ metaPath });
      if (data) {
        const burrito = {};
        burrito.projectDir = ref;
        burrito.value = JSON.parse(data);
        parseData.push(burrito);
        await localforage.setItem('resources', parseData);
        setSubMenuItems(parseData);
      }
    });
  }
  const refs = await readRefMeta({ projectsDir });
  console.log({ projectsDir, refs });
  refs.forEach(async (ref) => {
    const metaPath = `${projectsDir}/${ref}/metadata.json`;
    const { data } = await supabaseStorage().download(metaPath);
    const metadata = JSON.parse(await data.text());
    console.log('resources metadata', { data, metadata });
    if (data) {
      const burrito = {};
      burrito.projectDir = ref;
      burrito.value = metadata;
      parseData.push(burrito);
      await localforage.setItem('resources', parseData);
      setSubMenuItems(parseData);
    }
  });
}
