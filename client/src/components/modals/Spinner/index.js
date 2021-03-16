import React from 'react';

import spinner from '../../../img/logo.gif';
import './style.scss';

const Spinner = () => {
	return (
		<div className='spinner'>
			<img src={spinner} alt='Spinner' />
		</div>
	);
};

export default Spinner;
