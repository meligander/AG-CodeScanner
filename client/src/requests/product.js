import api from '../utils/api';

export const loadProducts = async (filterData) => {
	let filter = '';
	if (filterData) {
		const filternames = Object.keys(filterData);
		for (let x = 0; x < filternames.length; x++) {
			const name = filternames[x];
			if (filterData[name] !== '' && filterData[name] !== 0) {
				if (filter !== '') filter = filter + '&';
				filter = filter + filternames[x] + '=' + filterData[name];
			}
		}
	}

	try {
		const res = await api.get(`/product${filter !== '' ? '?' + filter : ''}`);
		return {
			info: res.data,
			success: true,
		};
	} catch (err) {
		const msg = err.response.data.msg;
		const type = err.response.statusText;
		return {
			info: msg ? msg : type,
			success: false,
		};
	}
};

export const loadProduct = async (code) => {
	try {
		const res = await api.get(`/product/one?code=${code}`);

		return {
			info: res.data,
			success: true,
		};
	} catch (err) {
		const msg = err.response.data.msg;
		const type = err.response.statusText;
		return {
			info: msg ? msg : type,
			success: false,
		};
	}
};
