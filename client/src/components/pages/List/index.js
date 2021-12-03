import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import {
	AiOutlineScan,
	AiOutlineClear,
	AiOutlineMinusSquare,
	AiOutlinePlusSquare,
	AiOutlineCloseSquare,
} from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

import {
	loadListProducts,
	deleteProduct,
	cleanList,
	changeQuantity,
	formatNumber,
} from '../../../requests/product';

import Spinner from '../../modals/Spinner';

import './style.scss';

const List = () => {
	const [adminValues, setAdminValues] = useState({
		products: [],
		error: '',
		total: 0,
		loading: true,
	});

	const { products, error, total, loading } = adminValues;

	useEffect(() => {
		const loadProducts = async () => {
			const res = await loadListProducts();
			if (res.success) {
				setAdminValues((prev) => ({
					...prev,
					products: res.info,
					error: '',
					total: roundNumber(
						res.info.reduce((sum, item) => sum + item.total, 0)
					),
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
		};

		loadProducts();
	}, []);

	const deleteProductFromList = (code) => {
		let newProducts = products.filter((prod) => prod.code !== code);
		deleteProduct(code);

		setAdminValues((prev) => ({
			...prev,
			products: newProducts,
			total: roundNumber(
				newProducts.reduce((sum, item) => sum + item.total, 0)
			),
			...(newProducts.length === 0 && {
				error: 'No hay ningún producto en la lista',
			}),
		}));
	};

	const changeItemQuantity = (item, plus, value) => {
		let newProducts = [...products];

		const quantity =
			value !== null ? value : newProducts[item].quantity + (plus ? 1 : -1);

		newProducts[item] = {
			...newProducts[item],
			quantity,
			total:
				quantity !== '' ? roundNumber(quantity * newProducts[item].price) : 0,
		};

		changeQuantity({ code: newProducts[item].code, quantity });

		setAdminValues((prev) => ({
			...prev,
			products: newProducts,
			total: roundNumber(
				newProducts.reduce((sum, item) => sum + item.total, 0)
			),
		}));
	};

	const onChange = (e, item) => {
		e.persist();
		if (e.target.value === '' || !isNaN(e.target.value))
			if (e.target.value === '0') {
				deleteProductFromList(products[item].code);
			} else {
				changeItemQuantity(item, null, e.target.value);
			}
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
							<div className='list-table-section'>
								<table className='table'>
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
											<React.Fragment key={i}>
												<tr className='table-full'>
													<td>{item.name}</td>
													<td>${formatNumber(item.price)}</td>
													<td>
														<input
															className='form-group-input'
															type='text'
															onChange={(e) => onChange(e, i)}
															value={item.quantity}
														/>
													</td>
													<td>${formatNumber(item.total)}</td>
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
												<tr className='table-small'>
													<td className='table-small-first'>
														<img
															src={item.img}
															alt='Producto de Alovero Garcia'
														/>
													</td>
													<td className='table-small-sec'>
														<div className='table-small-sec-flex'>
															<p className='table-small-sec-name'>
																{item.name}
															</p>
															<button
																type='button'
																className='btn table-small-sec-cancel'
																onClick={(e) => {
																	e.preventDefault();
																	deleteProductFromList(item.code);
																}}
															>
																<MdCancel />
															</button>
														</div>
														<p className='table-small-sec-price'>
															${formatNumber(item.price)}
														</p>
													</td>
												</tr>
												<tr className='table-small border'>
													<td className='table-small-first'>
														<div className='table-small-first-quantity'>
															{item.quantity === 1 ? (
																<button
																	className='table-small-first-quantity-icon danger'
																	onClick={(e) => {
																		e.preventDefault();
																		deleteProductFromList(item.code);
																	}}
																	type='button'
																>
																	<AiOutlineCloseSquare />
																</button>
															) : (
																<button
																	className='table-small-first-quantity-icon'
																	onClick={(e) => {
																		e.preventDefault();
																		changeItemQuantity(i, false, null);
																	}}
																	type='button'
																>
																	<AiOutlineMinusSquare />
																</button>
															)}

															<p className='table-small-first-quantity-number'>
																{item.quantity}
															</p>
															<button
																className='table-small-first-quantity-icon'
																type='button'
																onClick={(e) => {
																	e.preventDefault();
																	changeItemQuantity(i, true, null);
																}}
															>
																<AiOutlinePlusSquare />
															</button>
														</div>
													</td>
													<td className='table-small-sec'>
														<p className='table-small-sec-total'>
															Subtotal: ${formatNumber(item.total)}
														</p>
													</td>
												</tr>
											</React.Fragment>
										))}
									</tbody>
								</table>
								<p className='list-total'>
									Total:{' '}
									<span className='list-total-price'>
										${formatNumber(total)}
									</span>
								</p>
							</div>
							<div className='btn-center'>
								<Link
									to='/'
									onClick={() => window.scrollTo(0, 0)}
									className='btn btn-primary'
								>
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
						<>
							<p className='list-error'>{error}</p>
							<div className='btn-center'>
								<Link
									to='/'
									onClick={() => window.scrollTo(0, 0)}
									className='btn btn-primary'
								>
									<AiOutlineScan className='btn-icon' /> Escanear
								</Link>
							</div>
						</>
					)}
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default List;
