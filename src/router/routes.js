
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const {login} =require( '../controller/login');
const {edituser} =require( '../controller/edituser');
const {editPass} =require( '../controller/editPass');
const {addWidget} =require( '../controller/addWidget');

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
const {getwWidget} = require("../controller/getWidget");
const {shareWorkspace} = require("../controller/shareWorkspace");
const {getSharedWorkspace} = require("../controller/getSharedWorkspaces");
const {editworkspace} = require("../controller/editworkspace");


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



router.post('/register',upload.single('file'),checkToken,registre,);
router.post('/login', login);
router.post('/forget', forget);
router.post('/logout', checkToken,logout );
router.post('/all', checkToken, getall);
router.post('/edit', checkToken,edituser);
router.post('/editPass', checkToken,editPass);
router.post('/addWidget', checkToken,addWidget);

router.post('/deleteUser', checkToken,DeleteUser);
router.post('/getinsideworkspace',checkToken,getinsideworkspace);
router.post('/change',change);
router.post('/validation',validation);

router.post('/addworkspace',checkToken,addworkspace);
router.post('/editworkspace',checkToken,editworkspace);

router.post('/getworkspace',checkToken,getworkspace);
router.post('/getWidget',checkToken,getwWidget);

router.post('/deleteworkspace',checkToken,deleteworkspace)
router.post('/addinsideworkspace',checkToken,addinsideworkspace)
router.post('/shareWorkspace',checkToken,shareWorkspace)
router.post('/getsharedWorkspace',checkToken,getSharedWorkspace)






module.exports= router;
