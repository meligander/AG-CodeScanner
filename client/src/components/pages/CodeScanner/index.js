import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

import { loadProduct } from '../../../requests/product';

import Spinner from '../../modals/Spinner';

import './style.scss';

const CodeScanner = () => {
	const [data, setData] = useState('');

	const [adminValues, setAdminValues] = useState({
		product: {
			code: '',
			name: '',
			price: 0,
			img: '',
		},
		loading: false,
	});

	const { product, loading } = adminValues;

	useEffect(async () => {
		if (data !== '') {
			setAdminValues((prev) => ({
				...prev,
				loading: true,
			}));
			const info = await loadProduct(data);
			setAdminValues((prev) => ({
				...prev,
				loading: false,
				product: info.info,
			}));
		}
	}, [data]);

	return (
		<div className='scanner'>
			{data === '' ? (
				<BarcodeScannerComponent
					width={350}
					height={350}
					onUpdate={(err, result) => {
						if (result) setData(result.text);
						else setData('');
					}}
				/>
			) : loading ? (
				<Spinner />
			) : (
				<div className='scanner-description'>
					<h3 className='scanner-description-name'>{product.name}</h3>
					<img
						className='scanner-description-img'
						src={product.img}
						alt='Producto de Alovero García'
					/>
					<p className='scanner-description-price'>${product.price}</p>
					<button
						type='button'
						onClick={(e) => {
							e.preventDefault();
							setData('');
						}}
						className='scanner-description-btn btn btn-primary'
					>
						Volver a Escanear
					</button>
				</div>
			)}
		</div>
	);
};

export default CodeScanner;
