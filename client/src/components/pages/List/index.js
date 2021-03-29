import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineScan, AiOutlineClear } from 'react-icons/ai';

import {
	loadListProducts,
	deleteProduct,
	cleanList,
	changeQuantity,
} from '../../../requests/product';

import Spinner from '../../modals/Spinner';

import './style.scss';

const List = () => {
	const [adminValues, setAdminValues] = useState({
		products: [],
		error: '',
		total: 0,
		loading: false,
	});

	const { products, error, total, loading } = adminValues;

	useEffect(async () => {
		setAdminValues((prev) => ({
			...prev,
			loading: true,
		}));
		const res = await loadListProducts();
		if (res.success) {
			let total = 0;

			res.info.map((item) => (total = total + item.total));

			total = roundNumber(total);

			setAdminValues((prev) => ({
				...prev,
				products: res.info,
				error: '',
				total,
				loading: false,
			}));
		} else {
			setAdminValues((prev) => ({
				...prev,
				error: res.info,
				products: [],
				loading: false,
			}));
		}
	}, [loadListProducts]);

	const onChange = (e, item) => {
		let newProducts = [...products];

		newProducts[item] = {
			...newProducts[item],
			quantity: e.target.value,
			total: roundNumber(e.target.value * newProducts[item].price),
		};

		changeQuantity({ code: newProducts[item].code, quantity: e.target.value });

		let total = 0;

		newProducts.map((item) => (total = total + item.total));

		total = roundNumber(total);

		setAdminValues((prev) => ({
			...prev,
			products: newProducts,
			total,
		}));
	};

	const deleteProductFromList = (code) => {
		let newProducts = products.filter((prod) => prod.code !== code);
		deleteProduct(code);

		let total = 0;

		newProducts.map((item) => (total = total + item.total));

		total = roundNumber(total);

		setAdminValues((prev) => ({
			...prev,
			products: newProducts,
			total,
			...(newProducts.length === 0 && {
				error: 'No hay ningún producto en la lista',
			}),
		}));
	};

	const roundNumber = (number) => {
		return Math.floor(number * 100) / 100;
	};

	return (
		<>
			{!loading ? (
				<div className='list'>
					{error === '' ? (
						<>
							<div className='wrapper'>
								<table>
									<thead>
										<tr>
											<th>Nombre del Producto</th>
											<th>Precio Unitario</th>
											<th>Cantidad</th>
											<th>Total</th>
											<th>&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										{products.map((item, i) => (
											<tr key={i}>
												<td>{item.name}</td>
												<td>${item.price}</td>
												<td>
													<input
														className='form-group-input'
														type='number'
														onChange={(e) => onChange(e, i)}
														value={item.quantity}
													/>
												</td>
												<td>${item.total}</td>
												<td>
													<button
														type='button'
														onClick={(e) => {
															e.preventDefault();
															deleteProductFromList(item.code);
														}}
														className='btn btn-danger'
													>
														<IoTrashOutline className='btn-icon' />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<p className='list-total'>
								Total: <span className='list-total-price'>${total}</span>
							</p>
							<div className='btn-center'>
								<Link to='/' className='btn btn-primary'>
									<AiOutlineScan className='btn-icon' /> Escanear
								</Link>
								<button
									type='button'
									onClick={(e) => {
										e.preventDefault();
										cleanList();
										setAdminValues((prev) => ({
											...prev,
											products: [],
											total: 0,
											error: 'No hay ningún producto en la lista',
										}));
									}}
									className='btn btn-danger'
								>
									<AiOutlineClear className='btn-icon' /> Vaciar Lista
								</button>
							</div>
						</>
					) : (
						<div className='list-error'>
							<div>
								<p className='list-error-msg'>{error}</p>
								<div className='btn-center'>
									<Link to='/' className='btn btn-primary'>
										<AiOutlineScan className='btn-icon' /> Escanear
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default List;
