import React, { useState, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { CgSoftwareUpload } from 'react-icons/cg';
import { ImQrcode } from 'react-icons/im';

import Popup from '../../modals/Popup';
import Spinner from '../../modals/Spinner';

import { loginUser } from '../../../requests/auth';
import setAuthToken from '../../../utils/setAuthToken';

import letters from '../../../img/letras.svg';
import './style.scss';

const Navbar = ({ history }) => {
	const [adminValues, setAdminValues] = useState({
		showMenu: false,
		toggleModal: false,
		logged: localStorage.getItem('token'),
		loading: false,
	});

	const { showMenu, toggleModal, logged, loading } = adminValues;

	const errorMsg = useRef();

	const setToggleModal = () => {
		setAdminValues((prev) => ({
			...prev,
			toggleModal: !toggleModal,
		}));
		errorMsg.current.innerHTML = '';
	};

	const login = async (user) => {
		const res = await loginUser(user);
		setAdminValues((prev) => ({
			...prev,
			loading: true,
		}));

		if (res.success) {
			setAuthToken(res.info.token);
			setAdminValues((prev) => ({
				...prev,
				logged: localStorage.getItem('token'),
			}));
			setToggleModal();
			history.push('/generator');
		} else {
			setAuthToken();
			errorMsg.current.innerHTML = res.info;
		}

		setAdminValues((prev) => ({
			...prev,
			loading: false,
		}));
	};

	const logout = () => {
		setAuthToken();
		setAdminValues((prev) => ({
			...prev,
			logged: null,
		}));
		history.push('/');
	};

	return (
		<>
			{loading && <Spinner />}
			<Popup
				toggleModal={toggleModal}
				setToggleModal={setToggleModal}
				type='login'
				confirm={login}
				uploadRef={errorMsg}
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
								logout();
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

export default withRouter(Navbar);
