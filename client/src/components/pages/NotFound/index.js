import React from 'react';
import { GoCircleSlash } from 'react-icons/go';

import './style.scss';

const NotFound = () => {
	return (
		<div className='notfound'>
			<GoCircleSlash className='notfound-icon' /> Página no encontrada
		</div>
	);
};

export default NotFound;
