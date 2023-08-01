'use client';

import SectionContainer from '@/layouts/editor/SectionContainer';
import ProtectedRoute from '@/components/Protected';

export default function page() {
  return (
    <ProtectedRoute>
      <SectionContainer />
    </ProtectedRoute>
  );
}
