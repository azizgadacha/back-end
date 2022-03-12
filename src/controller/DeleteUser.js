const bcrypt=require('bcrypt');
const User =require( '../model/user');


exports.DeleteUser=async (req, res) => {


    const {username, email, password,phone,role} = req.body.user;


    User.findOne({email,username,phone}).then((user) => {
        if (user) {
            res.json({success: false, msg: "User dosn't excite" });
        } else {
           User.findOneAndRemove({}).then((u) => {
                        res.json({success: true, msg:"User deleter=d"});
                    });
                };
            });
        };
