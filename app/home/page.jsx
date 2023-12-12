/* eslint-disable no-tabs */

'use client';

import React from 'react';
import SectionContainer from '@/layouts/editor/WebSectionContainer';
import ProtectedRoute from '@/components/Protected';

export default function page() {
	return (
  <ProtectedRoute>
    <SectionContainer />
  </ProtectedRoute>
	);
}
