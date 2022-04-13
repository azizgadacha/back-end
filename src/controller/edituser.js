
const User =require( '../model/user');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const activeSession = require("../model/activeSession");

exports.edituser=(req, res) => {
    const { userID,username, email,password,role,phone } = req.body;

    User.findOne({ _id: userID }).then((user) => {
        if (user) {

            const query = { _id: user._id };
            const newvalues = { username, email,role,phone };

            bcrypt.compare(password, user.password, async (_err2, isMatch) => {

                if (isMatch) {
                    User. findOneAndUpdate(query, newvalues).then(
                        (user) => {

                            User.findOne(query).then((use)=>{

                            use.password = undefined;

                            return res.json({ success: true,passprob:false,user:use });}

                            )


                        }
                    ).catch(() => {

                       return  res.json({ success: false, passprob:false, msg: 'There was an error. Please contract the administrator' });
                    });



                }else {

                    return res.json({success: false, passprob: true, msg: 'Wrong credentials'});
                }});


        } else {

          return  res.json({ success: false,passprob:false, msg: "User didn't excite" });
        }
    })


}