import React, { useState, useEffect } from 'react';

import './style.scss';

const Header = () => {
	const [title, setTitle] = useState('');

	useEffect(() => {
		let name = '';
		switch (window.location.pathname) {
			case '/generator':
				name = 'Generador de Códigos';
				break;
			case '/file-upload':
				name = 'Actualización de Precios';
			default:
				name = 'Lector de Códigos';
				break;
		}
		setTitle(name);
	}, [window.location.pathname]);

	return (
		<header className='header'>
			<h1 className='header-primary'>Alovero García</h1>
			<h3 className='header-secondary'>{title}</h3>
		</header>
	);
};

export default Header;
