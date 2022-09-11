const express = require('express');
const router = express.Router();
const User = require('../controllers/users');
const ExUser = require('../controllers/exUsers')

router.post('/', User.register);

router.post('/login', User.login);

router.post('/logout', User.logout);

router.get('/check', User.check);

router.get('/userInfo', User.getUserInfo);

router.patch('/userInfo/:id', User.updateUserInfo);

router.post('/auth/google', ExUser.exLogin);

module.exports = router;
