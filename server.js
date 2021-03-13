const express = require('express');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const app = express();

//Middleware
app.use(express.json({ limit: '50mb', extended: false }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use('/api/product', require('./routes/api/product'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

/* if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
 */
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
