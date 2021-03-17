const express = require('express');
const router = express.Router();
let data = require('../../output/data.json');

//Middleware
const auth = require('../../middleware/auth');

//@route    GET /api/product
//@desc     get all products || with filter
//@access   Private
router.get('/', auth, async (req, res) => {
	const filter = req.query;

	try {
		let result = [];

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
		let result = data.filter((item) =>
			item.code.toLowerCase().includes(filter.code.toLowerCase())
		);

		result = result[0];

		res.json(result);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
