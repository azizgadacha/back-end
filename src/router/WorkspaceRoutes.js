const express=require('express');



//import  Validation
const { AdminstratorVlidation } =require( '../config/AdminstratorValidation');
const { SimpleEmployerValidation } =require( '../config/SimpleEmployerValidation');
const { checkToken } =require( '../config/safeRoutes');
const router = express.Router();


//import  Workspace
const {shareWorkspace,
       getSharedWorkspace,
       editworkspace,
       addinsideworkspace,
       getworkspace,
       deleteworkspace,
       addworkspace,
       getinsideworkspace,
       visualizationOfWorkspaces,
       removeShare
        } = require("../controller/WorkspaceController");


//Router  Workspace
router.post('/shareWorkspace',checkToken,shareWorkspace)
router.post('/removeShare',checkToken,removeShare)
router.post('/visualizationOfWorkspaces',checkToken,AdminstratorVlidation,visualizationOfWorkspaces)
router.post('/editworkspace',checkToken,editworkspace);
router.post('/getworkspace',checkToken,getworkspace);
router.post('/addinsideworkspace',checkToken,addinsideworkspace)
router.post('/getsharedWorkspace',checkToken,SimpleEmployerValidation,getSharedWorkspace)
router.post('/getinsideworkspace',checkToken,getinsideworkspace);
router.post('/addworkspace',checkToken,addworkspace);
router.post('/deleteworkspace',checkToken,deleteworkspace)










module.exports= router;
