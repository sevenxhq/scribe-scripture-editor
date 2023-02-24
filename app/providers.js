'use client';

import SyncContextProvider from '@/components/Sync/SyncContextProvider';
import ProjectContextProvider from '../renderer/src/components/context/ProjectContext';
import ReferenceContextProvider from '../renderer/src/components/context/ReferenceContext';
import AuthenticationContextProvider from '../renderer/src/components/Login/AuthenticationContextProvider';
import AutographaContextProvider from '../renderer/src/components/context/AutographaContext';

export function Providers({ children }) {
  return (
    <AuthenticationContextProvider>
      <ProjectContextProvider>
        <ReferenceContextProvider>
          <AutographaContextProvider>
            <SyncContextProvider>
              {children}
            </SyncContextProvider>
          </AutographaContextProvider>
        </ReferenceContextProvider>
      </ProjectContextProvider>
    </AuthenticationContextProvider>
  );
}