
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const login =require( '../controller/login');
const edituser =require( '../controller/edituser');
const getall =require( '../controller/gelall');
const registre =require( '../controller/registre');
const forget =require( '../controller/forget');

const logout =require( '../controller/logout');
const router = express.Router();


router.post('/register',registre.registre );

router.post('/login', login.login);
router.post('/forget', forget.forget);

router.post('/logout', checkToken,logout.logout );

router.post('/all', checkToken, getall.getall);

router.post('/edit', checkToken,edituser.edituser);



module.exports= router;
