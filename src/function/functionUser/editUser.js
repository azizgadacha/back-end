
const user =require( '../../model/user');


exports.editUser=(req, res) => {
    const { userID,role } = req.body;

    user.findOneAndUpdate({ _id: userID },{role}).then((userUpdated) => {
        if (userUpdated){
<<<<<<< HEAD
=======

            userUpdated.password=undefined
>>>>>>> edituw
userUpdated.role=role
        res.json({ success: true,user:userUpdated })}
else
            res.json({ success: false, })



    })


}