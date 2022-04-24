
const user =require( '../model/user');


exports.edituser=(req, res) => {
    const { userID,role } = req.body;

    user.findOneAndUpdate({ _id: userID },{role}).then((user) => {
        if (user)
            res.json({ success: true,user })
else
            res.json({ success: false, })



    })


}