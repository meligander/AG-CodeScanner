const express = require('express');
const router = express.Router();
let data = require('../../output/data.json');

/* //Middleware
const auth = require("../../middleware/auth");*/

//@route    GET /api/product
//@desc     get all products
//@access   Private
router.get('/', async (req, res) => {
	const filter = req.query;

	try {
		let result = [];

		if (filter.name || filter.code) {
			if (filter.name && filter.code)
				result = data.filter(
					(item) =>
						item.name.includes(filter.name) && item.code.includes(filter.code)
				);
			else {
				if (filter.name)
					result = data.filter((item) => item.name.includes(filter.name));
				else result = data.filter((item) => item.code.includes(filter.code));
			}
		} else {
			result = data;
		}

		res.json(result);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
