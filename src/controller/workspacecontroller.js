
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');

const {addworkspace}=require('../controller/addworkspace')
const {getinsideworkspace}=require('../controller/getinsideworkspace')
const {getworkspace} = require("../controller/getworkspace");
const {deleteworkspace}=require('../controller/deleteworkspace');

const {addinsideworkspace} = require("../controller/addinsideworkspace");



const router = express.Router();


router.post('/addinsideworkspace',checkToken,addinsideworkspace)

router.post('/getinsideworkspace',checkToken,getinsideworkspace);
router.post('/addworkspace',checkToken,addworkspace);
router.post('/deleteworkspace',checkToken,deleteworkspace)

router.post('/getworkspace',checkToken,getworkspace);







module.exports= router;
