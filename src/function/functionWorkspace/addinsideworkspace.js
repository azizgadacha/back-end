const Workspace =require('../../model/workspace');
const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')


exports.addinsideworkspace=async (req,res)=>{


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
