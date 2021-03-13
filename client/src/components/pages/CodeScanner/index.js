import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

import './style.scss';

const CodeScanner = () => {
	const [data, setData] = useState('');

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
			) : (
				<div className='scanner-description'>
					{/* <p>{data}</p> */}
					<h3 className='scanner-description-name'>
						Bordeadora 1500W Tramontina
					</h3>
					<p className='scanner-description-price'>$8.921,61</p>
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
