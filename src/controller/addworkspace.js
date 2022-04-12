const Workspace =require('../model/workspace');
const Joi = require('joi');
const User =require( '../model/user');
const activeSession =require('../model/activeSession')


exports.addworkspace=async (req,res)=>{

    const userSchema = Joi.object().keys({
       WorkspaceName: Joi.string().allow(" ") .min(4).max(13)
            .optional().required(),
        description: Joi.string().allow(" ") .min(4).max(25)
            .optional().required(),
        token:Joi.string().required(),
        id:Joi.string().required()
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    const {id,WorkspaceName,description} = req.body;

            User.find({_id:id})
                .then((users)=>{
                  const query={
                      superior_id:id,
                      WorkspaceName,
                      description
                  };
                  Workspace.findOne({WorkspaceName,superior_id:id}).then((w1)=> {
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