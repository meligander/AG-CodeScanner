const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//Middleware
const auth = require('../../middleware/auth');

//@route    GET /api/product
//@desc     get all products || with filter
//@access   Private
router.get('/', auth, (req, res) => {
	const filter = req.query;

	try {
		let result = [];
		let data = fs.readFileSync(
			path.resolve(__dirname, '../../output/data.json'),
			'utf8'
		);

		data = JSON.parse(data);

		if (filter.name || filter.code) {
			if (filter.name && filter.code)
				result = data.filter(
					(item) =>
						item.name.toLowerCase().includes(filter.name.toLowerCase()) &&
						item.code.toLowerCase().includes(filter.code.toLowerCase())
				);
			else {
				if (filter.name)
					result = data.filter((item) =>
						item.name.toLowerCase().includes(filter.name.toLowerCase())
					);
				else
					result = data.filter((item) =>
						item.code.toLowerCase().includes(filter.code.toLowerCase())
					);
			}
		} else {
			result = data;
		}

		if (result.length === 0)
			return res
				.status(400)
				.json({ msg: 'No hay ningún producto con dichas descripciones' });

		res.json(result);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route    GET /api/product/one
//@desc     get the product from code
//@access   Public
router.get('/one', async (req, res) => {
	const filter = req.query;

	try {
		let data = fs.readFileSync(
			path.resolve(__dirname, '../../output/data.json'),
			'utf8'
		);

		data = JSON.parse(data);

		let result = data.filter((item) =>
			item.code.toLowerCase().includes(filter.code.toLowerCase())
		);

		result = result[0];

		if (!result) return res.status(400).json({ msg: 'Producto no encontrado' });

		res.json(result);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route    GET /api/product/list
//@desc     get the list of products
//@access   Public
router.get('/list', async (req, res) => {
	const array = req.query.productsList;

	try {
		let result = [];
		let data = fs.readFileSync(
			path.resolve(__dirname, '../../output/data.json'),
			'utf8'
		);

		data = JSON.parse(data);

		for (let x = 0; x < array.length; x++) {
			let product = array[x].split(',');

			let obj = {
				code: product[0],
				quantity: Number(product[1]),
			};

			product = data.filter((item) => item.code.includes(obj.code));

			obj = {
				...obj,
				...product[0],
				total: Math.floor(product[0].price * obj.quantity * 100) / 100,
			};

			result.push(obj);
		}

		res.json(result);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
