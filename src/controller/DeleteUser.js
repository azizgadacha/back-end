const bcrypt=require('bcrypt');
const User =require( '../model/user');


exports.DeleteUser=async (req, res) => {


    const id = req.body.user.user_id;


    User.findOne({_ic:id}).then((user) => {
        if (user) {
            res.json({success: false, msg: "User dosn't excite" });
        } else {
           User.findOneAndRemove({}).then((u) => {
                        res.json({success: true, msg:"User deleted"});
                    });
                };
            });
        };
