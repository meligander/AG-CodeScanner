const mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'c1340282.ferozo.com',
	database: 'c1340282_merlo',
	user: 'c1340282_merlo',
	password: 'eporass7Ktbvaio',
});

connection.connect(function (err) {
	if (err) {
		console.error('Error connecting: ' + err.message);
	} else {
		console.log('Connected as id ' + connection.threadId);
	}
});

connection.end();
