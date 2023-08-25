import React from 'react';
import { LeftFile } from '@/components/FileComparison/LeftFiles';
import { RightFile } from '@/components/FileComparison/RightFiles';
// import EditorLayout from '@/layouts/editor/Layout';
// import AuthenticationContextProvider from '@/components/Login/AuthenticationContextProvider';
// import AutographaContextProvider from '@/components/context/AutographaContext';
// import ProjectContextProvider from '@/components/context/ProjectContext';
// import ReferenceContextProvider from '@/components/context/ReferenceContext';
// import ScribexContextProvider from '@/components/context/ScribexContext';

const files = () => (
  // <AuthenticationContextProvider>
  //   <AutographaContextProvider>
  //     <ProjectContextProvider>
  //       <ReferenceContextProvider>
  //         <EditorLayout>
  //           <ScribexContextProvider>
  //             <div className="flex p-2">
  <>
                <LeftFile /> 
                <RightFile />
  </>
                
  //             </div>
  //           </ScribexContextProvider>
  //         </EditorLayout>
  //       </ReferenceContextProvider>
  //     </ProjectContextProvider>
  //   </AutographaContextProvider>
  // </AuthenticationContextProvider>
  );

export default files;
