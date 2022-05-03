
const express=require('express');
const widgetController =require( '../controller/widgetController');

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
const { AdminstratorVlidation } =require( '../config/AdminstratorVlidation');
const { checkToken } =require( '../config/safeRoutes');






const router = express.Router();


const {lpm} = require("../config/lpm");

//import  Data
const {getData} = require("../function/functionData/getData");



//import  Workspace
const {shareWorkspace} = require("../controller/shareWorkspace");
const {getSharedWorkspace} = require("../controller/getSharedWorkspaces");
const {editworkspace} = require("../controller/editworkspace");
const {addinsideworkspace} = require("../controller/addinsideworkspace");
const {getworkspace} = require("../controller/getworkspace");
const {deleteworkspace}=require('../controller/deleteworkspace');
const {addworkspace}=require('../controller/addworkspace')
const {getinsideworkspace}=require('../controller/getinsideworkspace')

//import  Widget
const {getWidget} = require("../function/functionwidget/getWidget");
const {editWidgetlink} = require("../function/functionData/editWidgetlink");
const {editWidgets} = require("../function/functionwidget/editWidget");
const {addWidget} =require( '../function/functionwidget/addWidget');
const {deleteWidget} =require( '../function/functionwidget/deleteWidget');
const {ShareDataToWidget} =require( '../function/functionData/ShareDataToWidget');
const {deleteLinkWidget}=require('../function/functionData/deleteLinkWidget');
const {shareDataToWidget}=require('../function/functionData/ShareDataToWidget')
//import  Notification
const {getNotification} = require("../function/functionNotification/getNotification");
const {addNotification} = require("../function/functionNotification/addNotification");
const {deleteNotification} = require("../function/functionNotification/deleteNotification");
const {editNotification} = require("../function/functionNotification/editNotification");


//import  User
const {DeleteUser} = require("../controller/DeleteUser");
const {editUser} = require("../function/functionUser/editUser");
const {login} =require( '../controller/login');
const {edituser} =require( '../controller/edituser');
const {editPass} =require( '../controller/editPass');
const {getall} =require( '../controller/gelall');
const {registre} =require( '../controller/registre');
const {forget} =require( '../function/functionForget/forget');
const {change} =require( '../function/functionForget/change');
const {validation} =require( '../function/functionForget/validation');
const {logout} =require( '../controller/logout');
const {deleteNo} = require("../function/functionNotification/deleteNo");


//Router  User
router.post('/editUser', checkToken,AdminstratorVlidation,editUser );
router.post('/register',upload.single('file'),checkToken,registre,);
router.post('/login', login);
router.post('/logout', checkToken,logout );
router.post('/all', checkToken, getall);
router.post('/edit', checkToken,edituser);
router.post('/editPass', checkToken,editPass);
router.post('/deleteUser', checkToken,DeleteUser);

//Router  Widget
router.post('/addWidget', checkToken,addWidget);
router.post('/deleteLinkWidget', checkToken, deleteLinkWidget);
router.post('/editWidgetlink', checkToken,editWidgetlink);
router.post('/editWidget', checkToken,editWidgets);
router.post('/getWidget',checkToken,getWidget);
router.post('/deleteWidget',checkToken,deleteWidget)
router.post('/widget',lpm,widgetController);


//Router  Workspace
router.post('/addworkspace',checkToken,addworkspace);
router.post('/editworkspace',checkToken,editworkspace);
router.post('/addworkspace',checkToken,addworkspace);
router.post('/editworkspace',checkToken,editworkspace);
router.post('/getworkspace',checkToken,getworkspace);
router.post('/shareData',ShareDataToWidget);
router.post('/getworkspace',checkToken,getworkspace);
router.post('/addinsideworkspace',checkToken,addinsideworkspace)
router.post('/shareWorkspace',checkToken,shareWorkspace)
router.post('/getsharedWorkspace',checkToken,getSharedWorkspace)
router.post('/getinsideworkspace',checkToken,getinsideworkspace);
router.post('/addworkspace',checkToken,addworkspace);
router.post('/deleteworkspace',checkToken,deleteworkspace)
router.post('/getworkspace',checkToken,getworkspace);



//Router  Forget
router.post('/forget', forget);
router.post('/change',change);
router.post('/validation',validation);


//Router  Data
router.post('/getData',getData);


//Router  Notification
router.post('/addNotification', checkToken,addNotification);
router.post('/deleteNotification', checkToken, deleteNotification);
router.post('/deleteNot', checkToken, deleteNo);
router.post('/getNotification',checkToken,getNotification);
router.post('/editNotification',checkToken,editNotification);




module.exports= router;
