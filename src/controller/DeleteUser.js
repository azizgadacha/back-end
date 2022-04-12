const bcrypt=require('bcrypt');
const User =require( '../model/user');
const fs = require("fs");
const workspace = require("../model/workspace");


exports.DeleteUser=async (req, res) => {

    let id = req.body.user_id;

    User.findOneAndDelete({_id:id}).then((user) => {



        if (user) {
            user.password = undefined;
            let usertable = user

            if (fs.existsSync(user.photo)){
                if (user.photo)
                    fs.unlinkSync("./upload/" + user.photo)
            }



            res.json({success: true, msg: "User has been deleted ", user: usertable});

        } else {
            res.json({success: false, msg: "error  user dosn't excite "});
        }

    })}