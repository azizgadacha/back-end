
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');

const {addWidget} =require( '../function/functionwidget/addWidget');
const {deleteWidget} =require( '../function/functionwidget/deleteWidget');

const {getWidget} = require("../function/functionwidget/getWidget");



const router = express.Router();





router.post('/addWidget', checkToken,addWidget);

router.post('/getWidget',checkToken,getWidget);
router.post('/delete_Widget',checkToken,deleteWidget)





module.exports= router;
