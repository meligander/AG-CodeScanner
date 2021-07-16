import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

import logo from '../../../img/solo_logo.png';
import './style.scss';

const Popup = ({
	toggleModal,
	setToggleModal,
	type,
	confirm,
	text,
	finished,
	uploadRef,
	progressRef,
}) => {
	const [adminValues, setAdminValues] = useState({
		login: {
			username: '',
			password: '',
		},
	});

	const { login } = adminValues;

	const selectType = () => {
		switch (type) {
			case 'login':
				return (
					<>
						<p className='popup-error' ref={uploadRef}></p>
						<div className='form'>
							<div className='form-group'>
								<input
									type='text'
									className='form-group-input'
									placeholder='Usuario'
									id='username'
									name='username'
									onChange={(e) => loginOnChange(e)}
									value={login.username}
								/>
								<label className='form-group-lbl' htmlFor='username'>
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
					</>
				);
			case 'confirm':
				return <div className='popup-text'>{text}</div>;
			case 'uploadFile':
				return (
					<div className='popup-upload'>
						<span className='popup-upload-text' ref={uploadRef}></span>
						<div className='popup-upload-progress'>
							<div
								className='popup-upload-progress-bar'
								ref={progressRef}
							></div>
						</div>
					</div>
				);
			default:
				return <></>;
		}
	};

	const loginOnChange = (e) => {
		setAdminValues((prev) => ({
			...prev,
			login: {
				...prev.login,
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
						className={`btn btn-close ${
							finished !== undefined && !finished ? 'hide' : ''
						}`}
						onClick={(e) => {
							e.preventDefault();
							if (
								(finished !== undefined && finished) ||
								finished === undefined
							)
								setToggleModal();
						}}
					>
						<ImCross />
					</button>
				</div>
				{selectType()}
				{type !== 'uploadFile' && (
					<div className='btn-center'>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={(e) => {
								e.preventDefault();
								switch (type) {
									case 'login':
										confirm(login);
										break;
									case 'confirm':
										confirm();
										setToggleModal();
										break;
									default:
										break;
								}
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
				)}
			</div>
		</div>
	);
};

export default Popup;
