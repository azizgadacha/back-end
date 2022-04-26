
const user =require( '../../model/user');


exports.editUser=(req, res) => {
    const { userID,role } = req.body;
    console.log("ddddd")

    console.log(role)
    user.findOneAndUpdate({ _id: userID },{role}).then((userUpdated) => {
        if (userUpdated){
            console.log("ddddd")
            console.log(userUpdated)
userUpdated.role=role
        res.json({ success: true,user:userUpdated })}
else
            res.json({ success: false, })



    })


}