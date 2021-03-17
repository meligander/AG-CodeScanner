const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { check, validationResult } = require('express-validator');

require('dotenv').config({
	path: path.resolve(__dirname, '../../config/.env'),
});

//@route    POST /api/auth
//@desc     Authenticate user when login & get token
//@access   Public
router.post(
	'/',
	[
		check('username', 'El usuario es necesario').exists(),
		check('password', 'La contraseña es necesaria').exists(),
	],
	async (req, res) => {
		let errors = [];
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()) {
			errors = errorsResult.array();
			return res.status(400).json({ errors });
		}

		const { username, password } = req.body;

		/* const salt = await bcrypt.genSalt(10);

		const pass = await bcrypt.hash(password, salt);

		console.log(pass, username); */

		try {
			const isMatch = await bcrypt.compare(password, process.env.PASSWORD);
			if (!isMatch || process.env.USER !== username) {
				return res.status(400).json({ msg: 'Credenciales Inválidas' });
			}
			const payload = {
				user: {
					username,
				},
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: 60 * 60 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
