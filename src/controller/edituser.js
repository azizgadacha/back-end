
const User =require( '../model/user');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const activeSession = require("../model/activeSession");

exports.edituser=(req, res) => {
    const { userID,username, email,password,role,phone } = req.body;
console.log('hamadi')
    console.log(req.body)

    User.findOne({ _id: userID }).then((user) => {
        if (user) {

            console.log(user)
            const query = { _id: user._id };
            const newvalues = { username, email,role,phone };
console.log("ffforr")
console.log(user.password)
            console.log(password)

            bcrypt.compare(password, user.password, async (_err2, isMatch) => {
                console.log("halfdloo")

                console.log(isMatch)


                if (isMatch) {
console.log("halloo")
                    User. findOneAndUpdate(query, newvalues).then(
                        (user) => {

                            User.findOne(query).then((use)=>{
                                console.log("fartatatou")
                            console.log(use)
                            use.password = undefined;
                            console.log("hallo5")
                            console.log("halloo6")

                            return res.json({ success: true,passprob:false,user:use });}

                            )


                        }
                    ).catch(() => {
                        console.log("halloo7")

                       return  res.json({ success: false, passprob:false, msg: 'There was an error. Please contract the administrator' });
                    });



                }else {
                    console.log("halloo8")

                    return res.json({success: false, passprob: true, msg: 'Wrong credentials'});
                }});


        } else {
            console.log("halloo9")

          return  res.json({ success: false,passprob:false, msg: "User didn't excite" });
        }
    })


}