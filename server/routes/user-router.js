const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/user', UserCtrl.createUser);
router.get('/user/:email/:password', UserCtrl.login);
router.get('/users', UserCtrl.getUsers);
router.get('/user/:id', UserCtrl.getUser);

module.exports = router;