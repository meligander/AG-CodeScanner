const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const app = express();

//Middleware
app.use(express.json({ limit: '50mb', extended: false }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.static('public'));
app.use(cors());

app.use('/api/product', require('./routes/api/product'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/file', require('./routes/api/file'));

const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
