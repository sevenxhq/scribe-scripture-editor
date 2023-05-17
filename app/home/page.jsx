'use client';

import EditorLayout from '@/src/layouts/editor/Layout';
// import Editor from '@/modules/editor/Editor';
import SectionContainer from '@/src/layouts/editor/SectionContainer';
import { Providers } from '../providers';

export default function ReferenceSelector() {
	console.log(window.location.pathname);
	return (
		<Providers>
			<SectionContainer />
		</Providers>
	);
}
