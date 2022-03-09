
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const {login} =require( '../controller/login');
const {edituser} =require( '../controller/edituser');
const {getall} =require( '../controller/gelall');
const {registre} =require( '../controller/registre');
const {forget} =require( '../controller/forget');
const {change} =require( '../controller/change');
const {validation} =require( '../controller/validation');
const {addworkspace}=require('../controller/addworkspace')

const {logout} =require( '../controller/logout');
const {getworkspace} = require("../controller/getworkspace");

const router = express.Router();



router.post('/register',checkToken,registre);
router.post('/login', login);
router.post('/forget', forget);
router.post('/logout', checkToken,logout );
router.post('/all', checkToken, getall);
router.post('/edit', checkToken,edituser);
router.post('/change',change);
router.post('/validation',validation);
router.post('/addworkspace',addworkspace);
router.post('/getworkspace',getworkspace);



module.exports= router;
