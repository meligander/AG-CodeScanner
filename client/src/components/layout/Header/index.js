import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../Navbar';

import './style.scss';

const Header = ({ setHeaderHeight }) => {
	const location = useLocation();
	const ref = useRef();

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
		setHeaderHeight(ref.current.offsetHeight);
	}, [location]);

	return (
		<header className='header' ref={ref}>
			<Navbar />
			<h1 className='header-primary'>
				Alovero García <span className='header-secondary'>{title}</span>{' '}
			</h1>
		</header>
	);
};

export default Header;
