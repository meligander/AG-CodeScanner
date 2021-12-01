import React, { useState, useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { ImQrcode } from 'react-icons/im';

import { loadProducts, formatNumber } from '../../../requests/product';

import Spinner from '../../modals/Spinner';
import Popup from '../../modals/Popup';
import './style.scss';

const CodeGenerator = () => {
	const [adminValues, setAdminValues] = useState({
		products: [],
		selected: '',
		error: '',
		toggleModal: false,
	});

	const [filter, setFilter] = useState({
		code: '',
		name: '',
	});

	const { products, loading, selected, error, toggleModal } = adminValues;

	const { code, name } = filter;

	useEffect(() => {
		const load = async () => {
			const products = await loadProducts({ code: '', name: '' });
			if (products.success)
				setAdminValues((prev) => ({
					...prev,
					products: products.info,
					loading: false,
				}));
		};
		//allow some time to get the token in the header
		setTimeout(() => {
			if (localStorage.token) load();
		}, 50);
	}, []);

	const onChange = (e) => {
		e.persist();
		setFilter((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const search = async () => {
		setAdminValues((prev) => ({
			...prev,
			loading: true,
			selected: '',
		}));
		const products = await loadProducts({ code, name });
		if (products.success)
			setAdminValues((prev) => ({
				...prev,
				products: products.info,
				loading: false,
				error: '',
			}));
		else
			setAdminValues((prev) => ({
				...prev,
				error: products.info,
				loading: false,
				products: [],
			}));
	};

	const select = (item) => {
		setAdminValues((prev) => ({
			...prev,
			selected: item,
			error: '',
		}));
	};

	const generateCode = () => {
		if (selected.code)
			if (selected.bar)
				setAdminValues((prev) => ({ ...prev, toggleModal: true }));
			else
				window.open(
					`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selected.code}`,
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
			<Popup
				toggleModal={toggleModal}
				setToggleModal={() =>
					setAdminValues((prev) => ({ ...prev, toggleModal: !toggleModal }))
				}
				text='El producto ya tiene un código de barra, ¿Desea generar un QR de todos modos?'
				type='confirm'
				confirm={() =>
					window.open(
						`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selected.code}`,
						'_blank'
					)
				}
			/>
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
						<th>EAN 13</th>
					</tr>
				</thead>
				<tbody>
					{products.length > 0 &&
						products.map((product, i) => (
							<tr
								key={i}
								className={selected.code === product.code ? 'selected' : ''}
								onDoubleClick={() => select(product)}
							>
								<td>{product.code}</td>
								<td>{product.name}</td>
								<td>${formatNumber(product.price)}</td>
								<td>{product.bar ? 'Si' : 'No'}</td>
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
						generateCode();
					}}
				>
					Generar Código &nbsp; <ImQrcode className='btn-icon' />
				</button>
			</div>
		</section>
	);
};

export default CodeGenerator;
