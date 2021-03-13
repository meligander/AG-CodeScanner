import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import './style.scss';

const CodeGenerator = () => {
	const [filter, setFilter] = useState({
		code: '',
		name: '',
	});

	const { code, name } = filter;

	const onChange = (e) => {
		setFilter((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<section className='generator'>
			<form className='form'>
				<div className='form-input'>
					<div className='form-group'>
						<input
							className='form-group-input'
							type='text'
							name='code'
							value={code}
							onChange={onChange}
							id='code'
							placeholder='Código'
						/>
						<label className='form-group-lbl' htmlFor='code'>
							Código
						</label>
					</div>
					<div className='form-group'>
						<input
							className='form-group-input'
							type='text'
							name='name'
							value={name}
							onChange={onChange}
							id='name'
							placeholder='Nombre del Producto'
						/>
						<label className='form-group-lbl' htmlFor='name'>
							Nombre del Producto
						</label>
					</div>
				</div>
				<div className='text-right'>
					<button className='btn btn-primary' type='submit'>
						Buscar <BiSearchAlt className='btn-icon' />
					</button>
				</div>
			</form>
		</section>
	);
};

export default CodeGenerator;
