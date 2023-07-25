import WebProjectList from '@/modules/projects/WebProjectList';
import ProtectedRoute from '@/components/Protected';
import { Providers } from '../providers';

const projects = () => (
  <Providers>
    <ProtectedRoute>
      <WebProjectList />
    </ProtectedRoute>
  </Providers>
);

export default projects;
