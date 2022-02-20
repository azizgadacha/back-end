
const bcrypt=require('bcrypt');

const express=require('express');
const Joi =require( 'joi');
const jwt =require( 'jsonwebtoken');
const mongoose =require("mongoose");
const { checkToken } =require( '../config/safeRoutes');
const User =require( '../model/user');
const login =require( '../controller/login');
const edituser =require( '../controller/edituser');
const getall =require( '../controller/gelall');
const registre =require( '../controller/registre');

const logout =require( '../controller/logout');



// eslint-disable-next-line new-cap
const router = express.Router();
// Route: <HOST>:PORT/api/users/



router.post('/register',registre.registre );

router.post('/login', login.login);

router.post('/logout', checkToken,logout.logout );



router.post('/all', checkToken, getall.getall);

router.post('/edit', checkToken,edituser.edituser);

// Used for tests (nothing functional)
router.get('/testme', (_req, res) => {
    res.status(200).json({ success: true, msg: 'all good' });
});
router.post('/checkSession', checkToken, (_req, res) => {
    res.json({ success: true });
});

module.exports= router;
