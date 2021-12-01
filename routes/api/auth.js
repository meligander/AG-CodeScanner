const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

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
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty())
			return res.status(400).json({ errors: errorsResult.array() });

		const { username, password } = req.body;

		try {
			const isMatch = await bcrypt.compare(password, process.env.PASSWORD);

			if (!isMatch || process.env.AGUSER !== username)
				return res.status(400).json({
					msg: !isMatch ? 'Contraseña Inválida' : 'Usuario Inválido',
				});

			const payload = {
				user: {
					username,
				},
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: 60 * 60 * 2,
			});

			res.json({ token });
		} catch (err) {
			console.error(err.message);
			return res.status(500).json({ msg: 'Server Error' });
		}
	}
);

module.exports = router;
