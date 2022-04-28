
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const widgetController =require( '../controller/widgetController');
const workspaceController =require( '../controller/workspacecontroller');

const userController =require( '../controller/userController');
const {lpm} = require("../config/lpm");
const router = express.Router();








router.post('/widget',lpm,widgetController);
router.post('/workspace',lpm,workspaceController);
router.post('/user',lpm, userController);



module.exports= router;
