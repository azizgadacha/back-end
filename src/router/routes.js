
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const {login} =require( '../controller/login');
const {edituser} =require( '../controller/edituser');
const {getall} =require( '../controller/gelall');
const {registre} =require( '../controller/registre');
const {forget} =require( '../controller/forget');
const {change} =require( '../controller/change');
const {checkValidity} =require( '../config/verifvalidation');

const {logout} =require( '../controller/logout');

const router = express.Router();


router.post('/register',registre);

router.post('/login', login);
router.post('/forget', forget);

router.post('/logout', checkToken,logout );

router.post('/all', checkToken, getall);

router.post('/edit', checkToken,edituser);
router.post('/change',checkValidity,change);
router.post('/checkValidity',checkValidity);





module.exports= router;
