const Workspace =require('../model/workspace');
const Joi = require('joi');
const workspace = require("../model/workspace");



exports.editworkspace=async (req,res)=>{



    verif={WorkspaceName:req.body.WorkspaceName,description: req.body.description,token:req.body.token}
    const userSchema = Joi.object().keys({
        WorkspaceName: Joi.string().allow(" ") .min(4).max(13)
            .optional().required(),
        description: Joi.string().allow(" ") .min(4).max(25)
            .optional().required(),
        token:Joi.string().required(),
    });
    const result = userSchema.validate(verif);

    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    const cardId= String(req.body.card_id);
    const workspaceName= String(req.body.WorkspaceName);
    const Description=String(req.body.description);
    Workspace.findOneAndUpdate({_id:cardId},{WorkspaceName:workspaceName,description:Description})
        .then((workspaceitems)=>{
            workspace.findOne({_id:cardId}).then((w)=>{
                res.json({success:true,w})
            })
        })
        .catch(()=>{
            res.json({success: true, msg: 'The Workspace not successfully Edited'});
        })


}
















