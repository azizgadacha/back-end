const Workspace =require('../../model/workspace');
const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')


exports.addworkspace=async (req,res)=>{



    verif={WorkspaceName:req.body.WorkspaceName,description: req.body.description,token:req.body.token}
    const userSchema = Joi.object().keys({
       WorkspaceName: Joi.string().allow(" ") .min(4).max(13)
            .optional().required(),
        description: Joi.string().allow(" ") .min(4).max(25)
            .optional().required(),
        token:Joi.string().required(),
    });
    const result = userSchema.validate(verif);
    console.log("salah1")

    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    console.log("salah1")
    const {superior_id,WorkspaceName,description} = req.body;

            User.find({_id:superior_id})
                .then((users)=>{
                  const query={
                      superior_id:superior_id,
                      WorkspaceName,
                      description
                  };
                    console.log("salah2")

                    Workspace.findOne({WorkspaceName,superior_id:superior_id}).then((w1)=> {
                        console.log("salah3")

                        if (w1) {
                            console.log("salah4")

                            res.json({success: false, msg: 'Workspace already exists'});
                      } else {
                            console.log("salah5")

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
                })
                .catch(() => res.json({ success: false }));
        }
















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