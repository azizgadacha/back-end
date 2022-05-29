const Joi = require('joi');
const Workspace =require('../../model/workspace');
const user =require('../../model/user');



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

    console.log(req.body)
    const cardId= String(req.body.card_id);
    const workspaceName= String(req.body.WorkspaceName);
    const Description=String(req.body.description);
    const visualisation=req.body.visualise;
    const user_id=req.body.user_id
    let validation=true
user.findOne({_id:user_id}).then((user)=>{
    if((visualisation===true)&&(user.role!="administrateur"))
        validation=false


    if(validation){
    Workspace.findOneAndUpdate({_id:cardId},{WorkspaceName:workspaceName,description:Description})
        .then((workspaceitems)=>{
            if(workspaceitems!=null) {
                Workspace.findOne({_id: cardId}).then((w) => {
                    res.json({success: true, w})
                    console.log("eZEBIIIII")
                })
            }
            else
                res.json({success:false, msg: 'The Workspace not successfully Edited'});

        })}
    else
        {
            user.password=undefined

            res.json({success:false,user,adminstratorProblem:true ,msg: 'you are no longer an administrator'});


        }




})

}
















