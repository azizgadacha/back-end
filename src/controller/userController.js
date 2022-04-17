
const express=require('express');
const { checkToken } =require( '../config/safeRoutes');
const {login} =require( '../controller/login');
const {edituser} =require( '../controller/edituser');
const {editPass} =require( '../controller/editPass');


const {getall} =require( '../controller/gelall');
const {registre} =require( '../controller/registre');

const {logout} =require( '../controller/logout');

const {DeleteUser} = require("../controller/DeleteUser");

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
const router = express.Router();


router.post('/register',upload.single('file'),checkToken,registre,);
router.post('/login', login);
router.post('/logout', checkToken,logout );
router.post('/all', checkToken, getall);
router.post('/edit', checkToken,edituser);
router.post('/editPass', checkToken,editPass);
router.post('/deleteUser', checkToken,DeleteUser);







module.exports= router;
