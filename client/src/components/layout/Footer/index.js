import React from 'react';

import './style.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			Alovero García &reg; {new Date().getFullYear()} Todos los derechos
			reservados
		</footer>
	);
};

export default Footer;
