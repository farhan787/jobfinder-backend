const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

const db = require('./models/index');
db.authenticate()
	.then(async () => {
		await db.sync();
	})
	.catch((err) => console.log('Error', err));

require('./startup/routes')(app);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
