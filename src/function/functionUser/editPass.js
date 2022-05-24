
const User =require( '../../model/user');
const bcrypt = require("bcrypt");


exports.editPass=(req, res) => {
    const { userID,newPassword,oldPassword } = req.body;

    User.findOne({ _id: userID }).then((user) => {
        if (user) {

            const query = { _id: user._id };
consle.log('salut')


            bcrypt.compare(oldPassword, user.password, async (_err2, isMatch) => {



                if (isMatch) {

                    bcrypt.genSalt(10, (_err, salt) => {
                        bcrypt.hash(newPassword, salt).then((hash) => {




                            User.findOneAndUpdate(query, {password:hash}).then(
                                (user1) => {
                                    user1.password = undefined;
                                    return res.json({ success: true,passprob:false,user:user1 })



                                }
                            ).catch(() => {

                                return  res.json({ success: false, passprob:false, msg: 'There was an error. Please contract the administrator' });
                            });







                            });
                        });







                }else {

                    return res.json({success: false, passprob: true, msg: 'Wrong credentials'});
                }}



            );


        } else {

            return  res.json({ success: false,passprob:false, msg: "User didn't excite" });
        }
    }).catch(()=>{

        return  res.json({ success: false,passprob:false, msg: "User didn't excite" })
    })


}