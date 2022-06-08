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


//import  User
const {DeleteUser,
       editRole,
       login,
       edituser,
       editPass,
       getall,
       registre,
       logout} =require( '../controller/UserController');


//Router  User
router.post('/editUser', checkToken,AdminstratorVlidation,editRole );
router.post('/register',upload.single('file'),AdminstratorVlidation,checkToken,registre,);
router.post('/login', login);
router.post('/logout', checkToken,logout );
router.post('/all', checkToken, getall);
router.post('/getAll',AdminstratorVlidation, checkToken, getall);
router.post('/edit', upload.single('file'),checkToken,edituser);
router.post('/editPass', checkToken,editPass);
router.post('/deleteUser', checkToken,AdminstratorVlidation,DeleteUser);




module.exports= router;
