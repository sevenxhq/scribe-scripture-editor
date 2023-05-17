'use client';

import PropTypes from 'prop-types';
// import MenuBar from '../../src/layouts/editor/MenuBar';
import MenuBar from '@/src/layouts/editor/MenuBar';
import SubMenuBar from '@/src/layouts/editor/SubMenuBar';

export default function EditorLayout(props) {
	const { children } = props;

	return (
		<>
			<MenuBar />
			<SubMenuBar />

			<main className='bg-gray-50-x'>{children}</main>
		</>
	);
}

EditorLayout.propTypes = {
	children: PropTypes.any,
};
