const router = require('express').Router();
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

			if (result.length === 0)
				return res
					.status(400)
					.json({ msg: 'No hay ningún producto con dichas descripciones' });
		}

		res.json(filter.name || filter.code ? result : data);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

//@route    GET /api/product/one
//@desc     get the product from code
//@access   Public
router.get('/one', async (req, res) => {
	const code = req.query.code;

	try {
		let data = fs.readFileSync(
			path.resolve(__dirname, '../../output/data.json'),
			'utf8'
		);

		data = JSON.parse(data);

		const indexBar = !isNaN(code)
			? data.findIndex((item) => item.bar && item.bar === code)
			: -1;

		const indexCode =
			indexBar < 0
				? data.findIndex(
						(item) => item.code.toLowerCase() === code.toLowerCase()
				  )
				: -1;

		const result = data[indexBar > -1 ? indexBar : indexCode];

		if (!result) return res.status(400).json({ msg: 'Producto no encontrado' });

		res.json(result);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send({ msg: 'Server Error' });
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
			const product = array[x].split(',');

			let obj = {
				code: product[0],
				quantity: Number(product[1]),
			};

			const index = data.findIndex((item) => item.code === obj.code);

			obj = {
				...obj,
				...(index !== -1 ? { ...data[index] } : { name: 'Item no encontrado' }),
				total: Math.floor(data[index].price * obj.quantity * 100) / 100,
			};

			result.push(obj);
		}

		res.json(result);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;
