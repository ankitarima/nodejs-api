const express = require('express');

const {register, login, getUser} = require('../controllers/auth');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router()

router.post('/register',register);
router.post('/login',login);
router.get('/user',protect, getUser);

module.exports = router;