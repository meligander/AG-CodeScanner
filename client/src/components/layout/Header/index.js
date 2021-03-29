import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './style.scss';

const Header = () => {
	const location = useLocation();

	const [title, setTitle] = useState('');

	useEffect(() => {
		let name = '';
		switch (location.pathname) {
			case '/generator':
				name = 'Generador de Códigos';
				break;
			case '/fileuploader':
				name = 'Actualización de Precios';
				break;
			case '/list':
				name = 'Lista de Productos';
				break;
			default:
				name = 'Lector de Códigos';
				break;
		}
		setTitle(name);
	}, [location]);

	return (
		<header className='header'>
			<h1 className='header-primary'>Alovero García</h1>
			<h3 className='header-secondary'>{title}</h3>
		</header>
	);
};

export default Header;
