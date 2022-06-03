const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const router = express.Router();

//import  Data
const {getData,
       editWidgetlink,
       ShareDataToWidget,
       deleteLinkWidget}=require('../controller/DataController');


//Router  Widget
router.post('/deleteLinkWidget', checkToken, deleteLinkWidget);
router.post('/editWidgetlink', checkToken,editWidgetlink);
router.post('/shareData',ShareDataToWidget);
router.post('/getData',getData);






module.exports= router;
