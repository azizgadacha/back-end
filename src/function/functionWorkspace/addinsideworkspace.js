const Workspace =require('../../model/workspace');
const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')


exports.addinsideworkspace=async (req,res)=>{

  /*  const WorkspaceSchema = Joi.object().keys({
        WorkspaceName: Joi.string().allow(" ") .min(4).max(13)
            .optional().required(),
        description: Joi.string().allow(" ") .min(4).max(25)
            .optional().required(),
        token:Joi.string().required(),
        id:Joi.string().required()
    });
    const result = WorkspaceSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }

   */
    const {superior_id,WorkspaceName,description} = req.body;

    Workspace.find({_id:superior_id})
        .then((W2)=>{
            console.log("haw fibeli")
            console.log(W2)
            console.log(W2[0].superior_id)
            if(W2.length!=0){
                const query={
                    superior_id:superior_id,
                    WorkspaceName,
                    description,

                };
                Workspace.findOne({WorkspaceName,superior_id:superior_id}).then((w1)=> {
                    if (w1) {
                        res.json({success: false, msg: 'Workspace already exists'});
                    } else {
                        Workspace.create(query).then((w) => {
                            res.json({
                                success: true,
                                WorkspaceID: w._id,
                                msg: 'The Workspace was successfully created'
                            });
                        })
                            .catch(() => {
                                res.json({success: false, msg: 'The workspace not created'})
                            })
                    }
                })

            }
        else{
                res.json({success: false, msg: 'The Workspace No Longer Exist'})
            }})


        .catch(() => res.json({ success: false }));
}

/*Workspace.findOne({WorkspaceName,user_id:user_id}).then((w1)=> {
    if (w1) {
        res.json({success: false, msg: 'Workspace already exists'});
    } else {
        Workspace.create(query).then((w) => {


            res.json({
                success: true,
                WorkspaceID: w._id,
                msg: 'The Workspace was successfully created'
            });
        })
            .catch(() => {
                res.json({success: false, msg: 'The workspace not created'})
            })
    }
})


 */













/*const workspaceSchema=Joi.object().keys({
     WorkspaceName:Joi.string().alphanum().allow(" ") .min(4).max(15)
         .optional().required(),
     description:Joi.string().alphanum().allow(" ") .min(4).max(15)
         .optional().required(),
 });
 const result = workspaceSchema.validate(req.body);
 if (result.error) {
     res.status(422).json({
         success: false,
         msg: `Validation err: ${result.error.details[0].message}`,
     });
     return;
 }

   */