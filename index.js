require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const ErrorHandler = require('./errors/ErrorHandler');

const PORT = process.env.PORT || 5000;

const db = require('./models/index');
db.authenticate()
	.then(async () => {
		await db.sync();
	})
	.catch((err) => console.log('Error', err));

const requestLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

app.use(cors());
app.use(requestLimiter);

require('./startup/routes')(app);
app.use(ErrorHandler);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
