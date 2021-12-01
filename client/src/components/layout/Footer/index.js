import React, { useEffect, useRef } from 'react';

import './style.scss';

const Footer = ({ setFooterHeight }) => {
	const ref = useRef();

	useEffect(() => {
		setFooterHeight(ref.current.offsetHeight);
	}, []);

	return (
		<footer className='footer' ref={ref}>
			Alovero García &reg; {new Date().getFullYear()} Todos los derechos
			reservados
		</footer>
	);
};

export default Footer;
