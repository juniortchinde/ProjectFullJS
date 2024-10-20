const router = require('express').Router();
const userCtr = require('../Controllers/User.controller');
const auth = require('../Middleware/auth')

router.post('/signup', auth.loginLimiter, userCtr.signup);
router.post('/login', auth.loginLimiter, userCtr.login)
module.exports = router;