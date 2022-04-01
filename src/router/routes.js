
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const {login} =require( '../controller/login');
const {edituser} =require( '../controller/edituser');
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



router.post('/register',checkToken,upload.single('file'),registre,);
router.post('/login', login);
router.post('/forget', forget);
router.post('/logout', checkToken,logout );
router.post('/all', checkToken, getall);
router.post('/edit', checkToken,edituser);
router.post('/deleteUser', checkToken,DeleteUser);
router.post('/getinsideworkspace',checkToken,getinsideworkspace);
router.post('/change',change);
router.post('/validation',validation);

router.post('/addworkspace',checkToken,addworkspace);
router.post('/getworkspace',checkToken,getworkspace);
router.post('/deleteworkspace',checkToken,deleteworkspace)
router.post('/addinsideworkspace',checkToken,addinsideworkspace)




module.exports= router;
