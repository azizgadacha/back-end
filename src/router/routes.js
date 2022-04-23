
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const widgetController =require( '../controller/widgetController');

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
const {lpm} = require("../config/lpm");
const {getData} = require("../function/functionData/getData");


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
const router = express.Router();
console.log("pmp3")

router.post('/widget',lpm,widgetController);

router.post('/register',upload.single('file'),checkToken,registre,);
router.post('/login', login);
router.post('/logout', checkToken,logout );
router.post('/forget', forget);
router.post('/all', checkToken, getall);
router.post('/edit', checkToken,edituser);
router.post('/editPass', checkToken,editPass);
router.post('/deleteUser', checkToken,DeleteUser);
router.post('/change',change);
router.post('/validation',validation);
router.post('/getData',getData);


router.post('/addinsideworkspace',checkToken,addinsideworkspace)

router.post('/getinsideworkspace',checkToken,getinsideworkspace);
router.post('/addworkspace',checkToken,addworkspace);
router.post('/deleteworkspace',checkToken,deleteworkspace)




router.post('/addWidget', checkToken,addWidget);

console.log("pmp2")

router.post('/getworkspace',checkToken,getworkspace);
router.post('/getWidget',checkToken,getWidget);
router.post('/deleteWidget',checkToken,deleteWidget)
console.log("pmp")


/*

router.post('/widget', checkToken,widgetController);
router.post('/workspace', checkToken,workspaceController);
router.post('/user', checkToken,userController);

 */

module.exports= router;
