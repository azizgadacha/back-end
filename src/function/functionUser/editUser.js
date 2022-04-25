
const user =require( '../../model/user');


exports.editUser=(req, res) => {
    const { userID,role } = req.body;
    console.log("ddddd")

    console.log(role)
    user.findOneAndUpdate({ _id: userID },{role}).then((user) => {
        if (user){
            console.log("ddddd")

        res.json({ success: true,user })}
else
            res.json({ success: false, })



    })


}