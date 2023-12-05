'use client';

import React from 'react';
import ProjectList from '@/components/Projects/ProjectList';
import ProtectedRoute from '@/components/Protected';

const projects = () => (
  <ProtectedRoute>
    <ProjectList />
  </ProtectedRoute>
);

export default projects;
