import React, { useState } from 'react';
import { BiLogInCircle } from 'react-icons/bi';

import letters from '../../../img/letras.svg';
import './style.scss';

const Navbar = () => {
	const [showMenu, setshowMenu] = useState(false);

	return (
		<nav className='navbar' onClick={() => setshowMenu(!showMenu)}>
			<div className={`navbar-logo ${showMenu ? 'close' : ''}`}>
				<div className='navbar-logo-line'></div>
				<img className='navbar-logo-img' src={letters} alt='letras' />
				<div className='navbar-logo-line'></div>
			</div>
			<div className={`navbar-item ${showMenu ? 'close' : ''}`}>
				<BiLogInCircle className='navbar-item-icon' />
			</div>
		</nav>
	);
};

export default Navbar;
