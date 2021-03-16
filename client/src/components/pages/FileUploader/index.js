import React from 'react';

import DropZone from './DropZone';

import './style.scss';

const FileUploader = () => {
	return (
		<div className='file-uploader'>
			<DropZone />
		</div>
	);
};

export default FileUploader;
