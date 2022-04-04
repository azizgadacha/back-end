
const User =require( '../model/user');
const bcrypt = require("bcrypt");


exports.editPass=(req, res) => {
    const { userID,newPassword,oldPassword } = req.body;
console.log("daq")
    console.log(oldPassword)

    User.findOne({ _id: userID }).then((user) => {
        if (user) {

            console.log(user)
            const query = { _id: user._id };

            console.log(user.password)


            bcrypt.compare(oldPassword, user.password, async (_err2, isMatch) => {

                console.log(isMatch)


                if (isMatch) {

                    bcrypt.genSalt(10, (_err, salt) => {
                        bcrypt.hash(newPassword, salt).then((hash) => {




                            User.findOneAndUpdate(query, {password:hash}).then(
                                (user1) => {
                                    user1.password = undefined;
                                    return res.json({ success: true,passprob:false,user:user1 })



                                }
                            ).catch(() => {
                                console.log("halloo7")

                                return  res.json({ success: false, passprob:false, msg: 'There was an error. Please contract the administrator' });
                            });







                            });
                        });







                }else {
                    console.log("halloo8")

                    return res.json({success: false, passprob: true, msg: 'Wrong credentials'});
                }}



            );


        } else {
            console.log("halloo9")

            return  res.json({ success: false,passprob:false, msg: "User didn't excite" });
        }
    }).catch(()=>{

        return  res.json({ success: false,passprob:false, msg: "User didn't excite" })
    })


}