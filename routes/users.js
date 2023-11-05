const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const auth = require('../auth/userAuth');

router.post('/signup', userController.register);

router.post("/signin", userController.login);

router.post('/logout', auth, userController.logout);

router.get('/current', auth, userController.current);

router.put("/current", auth, userController.update);

module.exports = router;