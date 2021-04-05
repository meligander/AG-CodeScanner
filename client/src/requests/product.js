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
		const msg = err.response.data.msg;
		const type = err.response.statusText;
		return {
			info: msg ? msg : type,
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

		const item = products.filter((prod) => prod.code === code);

		if (item.length > 0)
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
