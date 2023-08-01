import WebProjectList from '@/modules/projects/WebProjectList';
import ProtectedRoute from '@/components/Protected';

const projects = () => (
  <ProtectedRoute>
    <WebProjectList />
  </ProtectedRoute>
);

export default projects;
