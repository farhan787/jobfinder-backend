const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/Admin');

router.post('/signup', AdminController.signup);

module.exports = router;
