const express = require('express');
const internalServerError = require('../middlewares/InternalSeverError');

module.exports = function (app) {
	app.use(express.json());

	app.use(internalServerError);
};
