module.exports = function (err, req, res, next) {
	console.log('Internal Server Error Message Log...');
	console.log(err);
	res.status(500).send({ 'Internal Server Error': 'Something failed' });
};
