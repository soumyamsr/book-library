const express = require('express');
const controller = require('../controllers/auth');

const router = express.Router();

router.route('/register')
  .post(controller.registerUser);

router.route('/login')
  .post(controller.authenticate);

router.route('/logout')
  .post(controller.logout);

module.exports = router;
