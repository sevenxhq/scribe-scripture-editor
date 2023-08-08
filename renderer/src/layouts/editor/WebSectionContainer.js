'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import localforage from 'localforage';
import ObsEditor from '@/components/EditorPage/ObsEditor/ObsWebEditor';
import AudioEditor from '@/components/EditorPage/AudioEditor/AudioEditor';
import SectionPlaceholder1 from './WebSectionPlaceholder1';
import SectionPlaceholder2 from './WebSectionPlaceholder2';
import XelahEditor from '../../components/EditorPage/Scribex/XelahEditor';
import { newPath, supabaseStorage } from '../../../../supabase';

const MainPlayer = dynamic(
  () => import('@/components/EditorPage/AudioEditor/MainPlayer'),
  { ssr: false },
);
const SectionContainer = () => {
  const [editor, setEditor] = useState();

  const setSupabaseEditor = useCallback(async () => {
    const userProfile = await localforage.getItem('userProfile');
    const username = userProfile?.user?.email;
    const projectName = await localforage.getItem('currentProject');
    const { data } = await supabaseStorage().download(`${newPath}/${username}/projects/${projectName}/metadata.json`);
    const metadata = JSON.parse(await data.text());
    setEditor(metadata.type.flavorType.flavor.name);
  }, []);

  useEffect(() => {
      setSupabaseEditor();
  }, [editor, setSupabaseEditor]);
  return (
    <>
      <div className="grid grid-flow-col auto-cols-fr m-3 gap-2">
        <SectionPlaceholder1 editor={editor} />
        <SectionPlaceholder2 editor={editor} />
        {(editor === 'textTranslation' && <XelahEditor />)
          || (editor === 'textStories' && <ObsEditor />)
          || (editor === 'audioTranslation' && <AudioEditor editor={editor} />)}
      </div>
      {(editor === 'audioTranslation' && (<MainPlayer />))}
    </>
  );
};
export default SectionContainer;
