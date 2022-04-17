
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const {login} =require( '../controller/login');
const {edituser} =require( '../controller/edituser');
const {editPass} =require( '../controller/editPass');
const {addWidget} =require( '../function/functionwidget/addWidget');
const {deleteWidget} =require( '../function/functionwidget/deleteWidget');

const {getall} =require( '../controller/gelall');
const {registre} =require( '../controller/registre');
const {forget} =require( '../controller/forget');
const {change} =require( '../controller/change');
const {validation} =require( '../controller/validation');
const {addworkspace}=require('../controller/addworkspace')
const {getinsideworkspace}=require('../controller/getinsideworkspace')
const {logout} =require( '../controller/logout');
const {getworkspace} = require("../controller/getworkspace");
const {deleteworkspace}=require('../controller/deleteworkspace');
const {DeleteUser} = require("../controller/DeleteUser");

const multer=require('multer')

const {addinsideworkspace} = require("../controller/addinsideworkspace");
const {getWidget} = require("../function/functionwidget/getWidget");



const router = express.Router();



router.post('/forget', forget);
router.post('/change',change);
router.post('/validation',validation);







module.exports= router;
