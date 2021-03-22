import React, { useState } from 'react';
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
		console.log(data);
		setAdminValues((prev) => ({
			...prev,
			result: data.text,
			err: '',
			loading: true,
		}));
		const res = await loadProduct(data.text);
		console.log(res);

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
				product: { code: '', name: '', price: 0, img: '' },
			}));
		}
	};

	const cleanItem = () => {
		setAdminValues((prev) => ({
			...prev,
			result: '',
			product: { code: '', name: '', price: 0, img: '' },
			error: '',
		}));
	};

	return (
		<div className='scanner'>
			{result === '' ? (
				<BarcodeScannerComponent
					width={450}
					height={450}
					onUpdate={(err, result) => {
						if (result) handleScan(result);
					}}
				/>
			) : loading ? (
				<Spinner />
			) : (
				<div className='scanner-description'>
					{error === '' ? (
						<>
							<h3 className='scanner-description-name'>{product.name}</h3>
							<img
								className='scanner-description-img'
								src={product.img}
								alt='Producto de Alovero García'
							/>
							<p className='scanner-description-price'>${product.price}</p>
						</>
					) : (
						<p className='scanner-error'>{error}</p>
					)}
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
