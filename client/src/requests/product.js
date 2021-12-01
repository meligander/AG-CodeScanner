import api from '../utils/api';

export const loadProducts = async (formData) => {
	let filter = '';
	for (const x in formData) {
		if (formData[x] !== '')
			filter = `${filter !== '' ? `${filter}&` : ''}${x}=${formData[x]}`;
	}

	try {
		const res = await api.get(`/product${filter !== '' ? '?' + filter : ''}`);
		return {
			info: res.data,
			success: true,
		};
	} catch (err) {
		return {
			info: err.response.data.msg,
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
		return {
			info: err.response.data.msg,
			success: false,
		};
	}
};

export const loadListProducts = async () => {
	try {
		let products = localStorage.getItem('productsList');

		if (products) {
			products = JSON.parse(products);

			const res = await api.get(
				`/product/list?${products
					.map((n, index) => `productsList[${index}]=${n.code},${n.quantity}`)
					.join('&')}`
			);

			return {
				info: res.data,
				success: true,
			};
		} else {
			return {
				success: false,
				info: 'No hay ningún producto en la lista',
			};
		}
	} catch (err) {
		return {
			info: err.response.data.msg,
			success: false,
		};
	}
};

export const addProduct = (code) => {
	let products = localStorage.getItem('productsList');

	const newProduct = {
		code,
		quantity: 1,
	};

	if (products) {
		products = JSON.parse(products);

		const index = products.findIndex((prod) => prod.code === code);

		if (index !== -1)
			return {
				success: false,
				info: 'Ya está el producto en la lista',
			};

		products.push(newProduct);
	} else {
		products = [newProduct];
	}

	localStorage.setItem('productsList', JSON.stringify(products));
	return {
		success: true,
		info: 'Se agregó el producto correctamente',
	};
};

export const changeQuantity = (obj) => {
	let products = localStorage.getItem('productsList');

	products = JSON.parse(products);

	products = products.map((prod) => (prod.code === obj.code ? obj : prod));

	if (products.length === 0) localStorage.removeItem('productsList');
	else localStorage.setItem('productsList', JSON.stringify(products));
};

export const deleteProduct = (code) => {
	let products = localStorage.getItem('productsList');

	if (products) {
		products = JSON.parse(products);

		products = products.filter((prod) => prod.code !== code);

		if (products.length === 0) localStorage.removeItem('productsList');
		else localStorage.setItem('productsList', JSON.stringify(products));
	} else {
		return {
			success: false,
			info: 'No hay ningún producto en la lista',
		};
	}
};

export const cleanList = () => {
	localStorage.removeItem('productsList');
};

export const formatNumber = (number) => {
	if (number) return new Intl.NumberFormat('de-DE').format(number);
	else return null;
};
