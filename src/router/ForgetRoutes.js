const express=require('express');
const router = express.Router();


const {forget,
       change,
       validation} =require( '../controller/forgetController');


//Router  Forget
router.post('/forget', forget);
router.post('/change',change);
router.post('/validation',validation);


module.exports= router;
