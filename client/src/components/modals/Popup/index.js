import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

import logo from '../../../img/solo_logo.png';
import './style.scss';

const Popup = ({ toggleModal, setToggleModal, type, confirm, text }) => {
	const [adminValues, setAdminValues] = useState({
		login: {
			user: '',
			password: '',
		},
	});

	const { login } = adminValues;

	const selectType = () => {
		switch (type) {
			case 'login':
				return (
					<div className='form'>
						<div className='form-group'>
							<input
								type='text'
								className='form-group-input'
								placeholder='Usuario'
								id='user'
								name='user'
								onChange={(e) => loginOnChange(e)}
								value={login.user}
							/>
							<label className='form-group-lbl' htmlFor='user'>
								Usuario
							</label>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-group-input'
								placeholder='Contraseña'
								id='password'
								name='password'
								onChange={(e) => loginOnChange(e)}
								value={login.password}
							/>
							<label className='form-group-lbl' htmlFor='password'>
								Contraseña
							</label>
						</div>
					</div>
				);
			case 'confirm':
				return <div className='popup-text'>{text}</div>;
			default:
				return <></>;
		}
	};

	const loginOnChange = (e) => {
		setAdminValues((prev) => ({
			...prev,
			login: {
				[e.target.name]: e.target.value,
			},
		}));
	};

	return (
		<div className={`popup  ${!toggleModal ? 'hide' : ''}`}>
			<div className='popup-content'>
				<div className='popup-header'>
					<img
						className='popup-header-logo'
						src={logo}
						alt='Logo Alovero García'
					/>
					<button
						type='button'
						className='btn btn-close'
						onClick={(e) => {
							e.preventDefault();
							setToggleModal();
						}}
					>
						<ImCross />
					</button>
				</div>
				{selectType()}

				<div className='btn-center'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={(e) => {
							e.preventDefault();
							switch (type) {
								case 'login':
									confirm(login);
									break;
								case 'confirm':
									confirm();
									break;
								default:
									break;
							}
							setToggleModal();
						}}
					>
						Aceptar
					</button>

					<button
						type='button'
						className='btn btn-danger'
						onClick={(e) => {
							e.preventDefault();
							setToggleModal();
						}}
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Popup;
