import React, { useState, useEffect, useRef } from 'react';
import {
	AiOutlineScan,
	AiOutlinePlus,
	AiOutlineUnorderedList,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

import {
	loadProduct,
	addProduct,
	formatNumber,
} from '../../../requests/product';

import Spinner from '../../modals/Spinner';

import './style.scss';

const CodeScanner = () => {
	const [adminValues, setAdminValues] = useState({
		product: {},
		loading: false,
		result: '',
		error: '',
		listMsg: '',
	});

	const { product, loading, result, error, listMsg } = adminValues;

	const componentIsMounted = useRef(true);

	useEffect(() => {
		return () => {
			componentIsMounted.current = false;
		};
	}, []);

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
				product: {},
			}));
		}
	};

	const cleanItem = () => {
		setAdminValues((prev) => ({
			...prev,
			result: '',
			product: {},
			error: '',
		}));
	};

	const addScannedProduct = () => {
		const res = addProduct(product.code);

		setAdminValues((prev) => ({
			...prev,
			listMsg: res,
		}));

		setTimeout(() => {
			if (componentIsMounted.current)
				setAdminValues((prev) => ({
					...prev,
					listMsg: '',
				}));
		}, 5000);
	};

	return (
		<div className='scanner'>
			{result === '' ? (
				<>
					<div className='scanner-tool'>
						<BarcodeScannerComponent
							width={window.outerWidth < 450 ? window.outerWidth - 40 : 450}
							//height={450}
							onUpdate={(err, result) => {
								if (result) handleScan(result);
							}}
						/>
					</div>
					<div className='btn-center'>
						<Link
							to='/list'
							onClick={() => window.scrollTo(0, 0)}
							className='btn btn-tertiary'
						>
							<AiOutlineUnorderedList className='btn-icon' /> Lista
						</Link>
					</div>
				</>
			) : loading ? (
				<Spinner />
			) : (
				<>
					<div className='scanner-description'>
						{error === '' ? (
							<>
								<h3 className='scanner-description-name'>{product.name}</h3>
								<img
									className='scanner-description-img'
									src={product.img}
									alt='Producto de Alovero García'
								/>
								<p className='scanner-description-price'>
									${formatNumber(product.price)}
								</p>
							</>
						) : (
							<p className='scanner-error'>{error}</p>
						)}

						{listMsg !== '' && (
							<p
								className={`scanner-description-msg-${
									listMsg.success ? 'success' : 'danger'
								}`}
							>
								{listMsg.info}
							</p>
						)}
					</div>
					<div className='btn-center'>
						{error === '' && (
							<button
								type='button'
								onClick={(e) => {
									e.preventDefault();
									addScannedProduct();
								}}
								className='btn btn-secondary'
							>
								<AiOutlinePlus className='btn-icon' /> Agrear
							</button>
						)}

						<Link
							to='/list'
							onClick={() => window.scrollTo(0, 0)}
							className='btn btn-tertiary'
						>
							<AiOutlineUnorderedList className='btn-icon' /> Lista
						</Link>

						<button
							type='button'
							onClick={(e) => {
								e.preventDefault();
								cleanItem();
							}}
							className='btn btn-primary'
						>
							<AiOutlineScan className='btn-icon' /> Escanear
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default CodeScanner;
