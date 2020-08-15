require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
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
	windowMs: 1 * 60 * 1000,
	max: 100,
});

app.use(cors());
app.use(helmet());
app.use(requestLimiter);

app.get('/*', function (req, res, next) {
	res.header('X-XSS-Protection', 1);
	res.header('X-Content-Type-Options', 'nosniff');
	res.header('X-Frame-Options', 'DENY');
	next();
});

require('./startup/routes')(app);
app.use(ErrorHandler);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
