const express=require('express');
//import  Validation

const { checkToken } =require( '../config/safeRoutes');






const router = express.Router();



//import  Notification
const {getNotification,
       deleteNotification,
       editNotification,
       deleteNo} = require("../controller/NotificatinController");



//Router  Notification
router.post('/deleteNotification', checkToken, deleteNotification);
router.post('/deleteNot', checkToken, deleteNo);
router.post('/getNotification',checkToken,getNotification);
router.post('/editNotification',checkToken,editNotification);




module.exports= router;
