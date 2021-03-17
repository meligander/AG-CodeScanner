import api from '../utils/api';

export const loginUser = async (formData) => {
	let user = {};

	for (const prop in formData) {
		if (formData[prop] !== '') user[prop] = formData[prop];
	}

	try {
		const res = await api.post('/auth', user);
		return {
			info: res.data,
			success: true,
		};
	} catch (err) {
		const errors = err.response.data.errors;
		const msg = err.response.data.msg;
		const type = err.response.statusText;
		return {
			info: errors ? errors[0].msg : msg ? msg : type,
			success: false,
		};
	}
};
