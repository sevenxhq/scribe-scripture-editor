'use client';

import ProjectList from '@/modules/projects/ProjectList';
import ProtectedRoute from '@/components/Protected';

const projects = () => (
  <ProtectedRoute>
    <ProjectList />
  </ProtectedRoute>
);

export default projects;
