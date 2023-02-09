'use client';

import SyncContextProvider from '@/components/Sync/SyncContextProvider';
import ProjectContextProvider from '../src/components/context/ProjectContext';
import ReferenceContextProvider from '../src/components/context/ReferenceContext';
import AuthenticationContextProvider from '../src/components/Login/AuthenticationContextProvider';
import AutographaContextProvider from '../src/components/context/AutographaContext';

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
