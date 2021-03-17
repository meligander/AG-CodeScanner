import React, { useState } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { ImQrcode } from 'react-icons/im';

import { loadProducts } from '../../../requests/product';

import Spinner from '../../modals/Spinner';
import './style.scss';

const CodeGenerator = () => {
	const [adminValues, setAdminValues] = useState({
		filter: {
			code: '',
			name: '',
		},
		products: [],
		loading: false,
		selected: '',
		error: '',
	});

	const {
		filter: { code, name },
		products,
		loading,
		selected,
		error,
	} = adminValues;

	const onChange = (e) => {
		setAdminValues((prev) => ({
			...prev,
			filter: {
				...prev.filter,
				[e.target.name]: e.target.value,
			},
		}));
	};

	const search = async () => {
		setAdminValues((prev) => ({
			...prev,
			loading: true,
			error: '',
		}));
		const products = await loadProducts({ code, name });
		if (products.success)
			setAdminValues((prev) => ({
				...prev,
				products: products.info,
				loading: false,
			}));
		else
			setAdminValues((prev) => ({
				...prev,
				error: products.info,
				loading: false,
			}));
	};

	const select = (item) => {
		setAdminValues((prev) => ({
			...prev,
			selected: item.code,
			error: '',
		}));
	};

	const generateCode = async (code) => {
		if (code)
			window.open(
				`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${code}`,
				'_blank'
			);
		else {
			setAdminValues((prev) => ({
				...prev,
				error: 'Debe seleccionar un producto para generar el código',
			}));
			window.scroll(0, 0);
		}
	};

	return (
		<section className='generator'>
			{loading && <Spinner />}
			<form
				className='form'
				onSubmit={(e) => {
					e.preventDefault();
					search();
				}}
			>
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
					<button className='btn btn-secondary' type='submit'>
						Buscar <BiSearchAlt className='btn-icon' />
					</button>
				</div>
			</form>
			{error !== '' && <p className='generator-error'>{error}</p>}
			<table>
				<thead>
					<tr>
						<th>Código</th>
						<th>Nombre del Producto</th>
						<th>Precio</th>
					</tr>
				</thead>
				<tbody>
					{products.length > 0 &&
						products.map((product, i) => (
							<tr
								key={i}
								className={selected === product.code ? 'selected' : ''}
								onDoubleClick={() => select(product)}
							>
								<td>{product.code}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
							</tr>
						))}
				</tbody>
			</table>
			<div className='text-right margin-r'>
				<button
					className='btn btn-primary'
					type='button'
					onClick={(e) => {
						e.preventDefault();
						generateCode(selected);
					}}
				>
					Generar Código &nbsp; <ImQrcode className='btn-icon' />
				</button>
			</div>
		</section>
	);
};

export default CodeGenerator;
