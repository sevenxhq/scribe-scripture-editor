import ProtectedRoute from '@/components/Protected';
import NewProject from '@/components/Projects/NewProject';

const newproject = () => (
  <ProtectedRoute>
    <NewProject call="new" />
  </ProtectedRoute>
);

export default newproject;
