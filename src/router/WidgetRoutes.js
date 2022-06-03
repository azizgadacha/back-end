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


const {lpm} = require("../config/lpm");

//import  Data
const {getData} = require("../function/functionData/getData");



//import  Workspace
const {shareWorkspace} = require("../function/functionWorkspace/shareWorkspace");
const {getSharedWorkspace} = require("../function/functionWorkspace/getSharedWorkspaces");
const {editworkspace} = require("../function/functionWorkspace/editworkspace");
const {addinsideworkspace} = require("../function/functionWorkspace/addinsideworkspace");
const {getworkspace} = require("../function/functionWorkspace/getworkspace");
const {deleteworkspace}=require('../function/functionWorkspace/deleteworkspace');
const {addworkspace}=require('../function/functionWorkspace/addworkspace')
const {getinsideworkspace}=require('../function/functionWorkspace/getinsideworkspace')

const {visualizationOfWorkspaces} = require("../function/functionWorkspace/visualizationOfWorkspaces");
const {removeShare} = require("../function/functionWorkspace/removeShare");

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
