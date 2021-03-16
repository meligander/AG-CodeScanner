import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { CgSoftwareUpload } from 'react-icons/cg';
import { ImQrcode } from 'react-icons/im';

import Popup from '../../modals/Popup';
import letters from '../../../img/letras.svg';
import './style.scss';

const Navbar = () => {
	const [adminValues, setAdminValues] = useState({
		showMenu: false,
		toggleModal: false,
		logged: true,
	});

	const { showMenu, toggleModal, logged } = adminValues;

	const setToggleModal = () => {
		setAdminValues((prev) => ({
			...prev,
			toggleModal: !toggleModal,
		}));
	};

	const login = () => {
		console.log('in');
		setToggleModal();
	};

	return (
		<>
			<Popup
				toggleModal={toggleModal}
				setToggleModal={setToggleModal}
				type='login'
				confirm={login}
			/>
			<nav
				className='navbar'
				onClick={() =>
					setAdminValues((prev) => ({ ...prev, showMenu: !showMenu }))
				}
			>
				<div className={`navbar-logo ${showMenu ? 'close' : ''}`}>
					<div className='navbar-logo-line'></div>
					<img className='navbar-logo-img' src={letters} alt='letras' />
					<div className='navbar-logo-line'></div>
				</div>
				{logged ? (
					<>
						<Link
							to='/generator'
							className={`navbar-item ${showMenu ? 'close' : ''}`}
						>
							<ImQrcode className='navbar-item-icon' />
						</Link>

						<Link
							to='/fileuploader'
							className={`navbar-item ${showMenu ? 'close' : ''}`}
						>
							<CgSoftwareUpload className='navbar-item-icon icon-up' />
						</Link>
						<button
							type='button'
							onClick={(e) => {
								e.preventDefault();
							}}
							className={`navbar-item ${showMenu ? 'close' : ''}`}
						>
							<BiLogOutCircle className='navbar-item-icon' />
						</button>
					</>
				) : (
					<button
						type='button'
						onClick={(e) => {
							e.preventDefault();
							setAdminValues((prev) => ({
								...prev,
								toggleModal: true,
								showMenu: false,
							}));
						}}
						className={`navbar-item ${showMenu ? 'close' : ''}`}
					>
						<BiLogInCircle className='navbar-item-icon' />
					</button>
				)}
			</nav>
		</>
	);
};

export default Navbar;
