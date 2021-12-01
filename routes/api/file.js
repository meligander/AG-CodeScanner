const router = require('express').Router();

const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

const multer = require('multer');
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '.csv');
	},
});

let upload = multer({ storage: storage });

//Middleware
const auth = require('../../middleware/auth');

//@route    POST /api/file/upload
//@desc     update products prices
//@access   Private
router.post('/upload', [auth, upload.single('file')], (req, res) => {
	let results = [];

	let data = fs.readFileSync(
		path.resolve(__dirname, '../../output/data.json'),
		'utf8'
	);

	data = JSON.parse(data);

	fs.createReadStream(req.file.path)
		.on('error', (err) => {
			res.status(500).json({ msg: 'Failed to upload: ' + err.message });
		})
		.pipe(csvParser())
		.on('data', (row) => {
			let obj = {};

			obj.code = row.sku;
			obj.price = Number(row.regular_price);

			//If is the CSV file with the code and price it looks for the item in the json file from the previous time
			if (!row.post_title) {
				const indexNumber = data.findIndex((item) => item.code === obj.code);
				const result = data[indexNumber];

				obj.name = result.name;
				obj.img = result.img;
				if (result.bar) obj.bar = result.bar;
			} else {
				obj.name = row.post_title.replace(/"/g, '');
				obj.img = row.images;
				if (row.bar.trim() !== '') obj.bar = row.bar;
			}

			results.push(obj);
		})
		.on('end', () => {
			console.log('CSV file successfully processed');
			let json = JSON.stringify(results);
			fs.writeFileSync('output/data.json', json);
		});

	res.json({ msg: 'file uploaded' });
});

module.exports = router;
