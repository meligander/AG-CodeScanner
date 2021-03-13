const csvParser = require('csv-parser');
const fs = require('fs');

const filePath = './excel_file/LISTA COMPLETA.csv';

let results = [];

fs.createReadStream(filePath)
	.on('error', (err) => {
		console.error(err);
	})
	.pipe(csvParser())
	.on('data', async (row) => {
		let obj = {};
		let str = row.sku.replace(/"/g, '');

		const item = str.split(',');

		obj.code = item[0];
		obj.name = item[1];
		obj.price = Number(item[2]);

		obj.img = item.find((it) => it.substring(0, 5) === 'https');

		results.push(obj);
	})
	.on('end', () => {
		console.log('CSV file successfully processed');
		let json = JSON.stringify(results);
		fs.writeFileSync('output/DB.json', json);
	});
