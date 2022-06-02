
const user =require( '../../model/user');
const workspace = require("../../model/workspace");


exports.editRole=(req, res) => {
    const { userID,role } = req.body;

    user.findOneAndUpdate({ _id: userID },{role}).then((userUpdated) => {
        if (userUpdated){
            workspace.updateMany ({},{$pull:{share:{sharedWith:id}} })
                .then((AS) => {
                    console.log("ActiveSession deleted Succesufully")
                    console.log(AS)
                    userUpdated.password=undefined

                    userUpdated.role=role
                    res.json({ success: true,user:userUpdated })
                })

          }
else
            res.json({ success: false, })



    })


}