import React, { useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { BiFileBlank, BiDownload } from 'react-icons/bi';
import api from '../../../../utils/api';

import Popup from '../../../modals/Popup';

import './style.scss';

const DropZone = () => {
	const fileInputRef = useRef();
	const progressRef = useRef();
	const uploadRef = useRef();

	const [adminValues, setAdminValues] = useState({
		selectedFile: '',
		errorMessage: '',
		uploaded: false,
		fileIn: false,
		toggleModal: false,
		finished: false,
	});

	const {
		selectedFile,
		errorMessage,
		uploaded,
		fileIn,
		toggleModal,
		finished,
	} = adminValues;

	const dragOver = (e) => {
		e.preventDefault();
		if (!fileIn) setAdminValues((prev) => ({ ...prev, fileIn: true }));
	};

	const dragLeave = (e) => {
		e.preventDefault();
		if (fileIn) setAdminValues((prev) => ({ ...prev, fileIn: false }));
	};

	const fileDrop = (e) => {
		e.preventDefault();
		//const file = e.target.files[0];
		const file = e.dataTransfer.files[0];
		if (file) handleFiles(file);
	};

	const fileSelected = (e) => {
		if (e.target.value) {
			const file = e.target.files[0];
			handleFiles(file);
		}
	};

	const fileInputClicked = () => {
		fileInputRef.current.click();
	};

	const handleFiles = (file) => {
		if (validateFile(file)) {
			setAdminValues((prev) => ({
				...prev,
				selectedFile: file,
				uploaded: true,
				fileIn: false,
				finished: false,
			}));
		} else {
			file.invalid = true;
			setAdminValues((prev) => ({
				...prev,
				fileIn: false,
				selectedFile: file,
				errorMessage: 'Tipo de archivo no admitido',
				uploaded: true,
				finished: false,
			}));
		}
	};

	const validateFile = (file) => {
		const validTypes = ['application/vnd.ms-excel'];
		if (validTypes.indexOf(file.type) === -1) {
			return false;
		}
		return true;
	};

	const fileSize = (size) => {
		if (size === 0) {
			return '0 Bytes';
		}
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const fileType = (fileName) => {
		return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
	};

	const removeFile = () => {
		setAdminValues((prev) => ({
			...prev,
			selectedFile: '',
			errorMessage: '',
			uploaded: false,
		}));
	};

	const setToggleModal = () => {
		setAdminValues((prev) => ({
			...prev,
			toggleModal: !toggleModal,
		}));
	};

	const uploadFile = async () => {
		let data = new FormData();
		data.append('file', selectedFile);
		uploadRef.current.innerHTML = 'Precios actualizándose...';

		setAdminValues((prev) => ({
			...prev,
			toggleModal: true,
		}));

		api
			.post('/file/upload', data, {
				onUploadProgress: (progressEvent) => {
					let uploadPercentage = Math.floor(
						(progressEvent.loaded / progressEvent.total) * 100
					);
					progressRef.current.innerHTML = `<p>${uploadPercentage}%</p>`;
					progressRef.current.style.width = `${uploadPercentage}%`;

					if (uploadPercentage === 100) {
						uploadRef.current.innerHTML = 'Precios Actualizados';
						setAdminValues((prev) => ({
							...prev,
							selectedFile: '',
							uploaded: false,
							finished: true,
						}));
					}
				},
			})
			.catch(() => {
				uploadRef.current.innerHTML = `<span class="popup-error">Error al subir el archivo</span>`;
				progressRef.current.style.backgroundColor = '#b92525';
			});
	};

	return (
		<>
			<div className='drop'>
				{!uploaded ? (
					<div
						className={`drop-container ${fileIn ? 'lighter' : ''}`}
						onDragLeave={dragLeave}
						onDragOver={dragOver}
						onDrop={fileDrop}
						onClick={fileInputClicked}
					>
						<div className='drop-container-message'>
							<BiDownload className='drop-container-icon' />
							Arrastre y suelte el archivo aquí o haga click para seleccionarlo.
						</div>
						<input
							ref={fileInputRef}
							className='drop-container-file-input'
							type='file'
							onChange={fileSelected}
						/>
					</div>
				) : (
					<>
						<div
							className='drop-file-display'
							onClick={() => selectedFile.invalid && removeFile()}
						>
							<div className='drop-file-type'>
								<BiFileBlank />
								<div className='drop-file-type-name'>
									{fileType(selectedFile.name)}
								</div>
							</div>
							<span
								className={`drop-file-name ${
									selectedFile.invalid ? 'drop-file-error' : ''
								}`}
							>
								{selectedFile.name} &nbsp; ({fileSize(selectedFile.size)})
								{selectedFile.invalid && (
									<span className='drop-file-error'>({errorMessage})</span>
								)}
							</span>
							<div className='drop-file-remove' onClick={() => removeFile()}>
								<IoMdCloseCircle />
							</div>
						</div>
						{errorMessage === '' && uploaded ? (
							<div className='text-right'>
								<button
									className='btn btn-secondary'
									onClick={() => uploadFile()}
								>
									Cargar archivo
								</button>
							</div>
						) : (
							errorMessage !== '' && (
								<p className='drop-error'>
									Por favor, quite el archivo y seleccione un archivo CSV
								</p>
							)
						)}
					</>
				)}
			</div>

			<Popup
				type='uploadFile'
				finished={finished}
				uploadRef={uploadRef}
				progressRef={progressRef}
				setToggleModal={setToggleModal}
				toggleModal={toggleModal}
			/>
		</>
	);
};

export default DropZone;
