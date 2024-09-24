const express = require('express');
const { createUser, findUser, updateUser, deleteUser, getUsers, login } = require('../controllers/userControllers');
const router = express.Router();
router.use(express.json());

// allow url encoding
router.use(express.urlencoded({extended:true}));

// create new user
router.post('/createuser',createUser);
router.get('/finduser/:id',findUser);
router.put('/updateuser/:id',updateUser);
router.delete('/deleteuser/:id', deleteUser);
router.get('/allusers', getUsers);
router.post('/login', login);

module.exports = router;