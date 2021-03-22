import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

import { loadProduct } from '../../../requests/product';

import Spinner from '../../modals/Spinner';

import './style.scss';

const CodeScanner = () => {
	const [adminValues, setAdminValues] = useState({
		product: {
			code: '',
			name: '',
			price: 0,
			img: '',
		},
		loading: false,
		result: '',
		error: '',
	});

	const { product, loading, result, error } = adminValues;

	const handleScan = async (data) => {
		setAdminValues((prev) => ({
			...prev,
			result: data.text,
			err: '',
			loading: true,
		}));
		const res = await loadProduct(data.text);

		if (res.success) {
			setAdminValues((prev) => ({
				...prev,
				loading: false,
				product: res.info,
			}));
		} else {
			setAdminValues((prev) => ({
				...prev,
				loading: false,
				error: res.info,
			}));
		}
	};

	const cleanItem = () => {
		setAdminValues((prev) => ({
			...prev,
			result: '',
			error: '',
		}));
	};

	return (
		<div className='scanner'>
			{error !== '' && <p className='scanner-error'>{error}</p>}
			{result === '' ? (
				<BarcodeScannerComponent
					width={350}
					height={350}
					onUpdate={(err, result) => {
						if (result) handleScan(result);
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
							cleanItem();
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
