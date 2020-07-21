const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const AdminController = require('../controllers/Admin');

router.post('/signup', asyncHandler(AdminController.signup));
router.post('/login', asyncHandler(AdminController.login));

module.exports = router;
