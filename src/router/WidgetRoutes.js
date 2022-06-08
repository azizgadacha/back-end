const express=require('express');

const multer=require('multer')






const fileStorage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,'./upload')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+'--'+Math.floor(Math.random()*1000)+file.originalname.replace(/\s+/g,'-'))
        }
    }
)
const upload=multer({storage:fileStorage});

//import  Validation
const { AdminstratorVlidation } =require( '../config/AdminstratorValidation');
const { SimpleEmployerValidation } =require( '../config/SimpleEmployerValidation');

const { checkToken } =require( '../config/safeRoutes');






const router = express.Router();




//import  Data




//import  Widget
const {getWidget,
       editWidgets,
       addWidget,
       deleteWidget,
      }=require('../controller/WidgetController');



//Router  Widget
router.post('/addWidget', checkToken,addWidget);

router.post('/editWidget', checkToken,editWidgets);
router.post('/getWidget',checkToken,getWidget);
router.post('/deleteWidget',checkToken,deleteWidget)





module.exports= router;
