const router = require('express').Router();
const userCtr = require('../controllers/User.controller');
const auth = require('../middlewares/auth')

router.post('/signup', auth.loginLimiter, userCtr.signup);
router.post('/login', auth.loginLimiter, userCtr.login)
module.exports = router;