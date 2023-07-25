import ProtectedRoute from '@/components/Protected';
import Sync from '@/modules/projects/Sync';

const sync = () => (
  <ProtectedRoute>
    <Sync />
  </ProtectedRoute>
);

export default sync;
