
const workspace =require('../../model/workspace');
const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')

exports.getworkspace= (req, res,next) => {
    const superior_id= String(req.body.superior_id);
    workspace.find({superior_id:superior_id})
        .then((workspaceitems)=>{

            res.json({success: true, workspaceitems,listeName:[]});





        })
        .catch(() => res.json({ success: false }));
}
