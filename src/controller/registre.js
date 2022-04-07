const bcrypt=require('bcrypt');
const Joi = require("joi");
const User =require("../model/user")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const ForgetToken = require("../model/ForgetToken");



exports.registre=async (req,res) => {

    console.log("salah")
   console.log( req.body.sendtphoto)
    let   valid={email:req.body.email,username:req.body.username,phone:req.body.phone,role:req.body.role}

    const userSchema = Joi.object().keys({

        email: Joi.string().email().required(),
        username: Joi.string().allow(" ") .min(4).max(15)
            .optional().required(),
        phone: Joi.number().required(),

        role:Joi.string().required()
    });
    const result = userSchema.validate(valid);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }

    const {username, email,phone,role} = req.body;

    let  file=null
    console.log(  req.body.sendtphoto)
    console.log('fdfsdfd')
    console.log(typeof (req.body.sendtphoto))

    if (req.body.sendtphoto==='true')
    {console.log("helllo")
       file=req.file.filename
    }else{
        console.log("sahbi")
        file="avatar_1.png"

    }

    User.findOne({ $or: [{ email }, { username }]}).then((user) => {
        if (user) {
            console.log("rani lena")
            res.json({success: false, msg: 'User already excite'});
        } else {
          //  if(!file)
          //  {
          // }

            console.log("rani lena2.0")

           let  password=Math.random().toString(36).slice(-8);
            bcrypt.genSalt(10, (_err, salt) => {
                bcrypt.hash(password, salt).then(async (hash) => {
                    const query = {
                        username,
                        email,
                        password: hash,
                        phone,
                        role,
                        photo: file

                    };

                    try {
                        console.log("h5ello")

                        let transporter = nodemailer.createTransport({
                            hos: req.hostname,
                            service: "gmail",
                            port: 3000,
                            secure: true,
                            auth: {
                                user: process.env.EMAIL,
                                pass: process.env.PASSWORD
                            }
                        })
                        console.log("h5es6llo")


                        await transporter.sendMail({
                            from: process.env.EMAIL,

                            to: email,

                            subject: "Account creation in PERSOSPACE",
                            html: `<h1>Hello</h1><br>
                <h3>Welcome to our family</h3> <br>
                                <h3>An account with your email has ben created to connect there is your information </h3> <br>
                                <h3>Email : ${email} </h3> <br>
                                <h3>Password : ${password} </h3> <br>

                <h3>link of Our platform is    <a href="${process.env.url}">${process.env.url}</a></h3>  `

                        })
                        console.log("8h5ello")


                        User.create(query).then((u) => {

                            u.password = undefined;
                            console.log("h75ello")


                            res.json({success: true, user: u, msg: 'The user was successfully registered'});


                        })
                    }catch (e){


console.log("hello")
                            res.status(422).json({

                                success: false,
                                msg: `unvalide Mail`,
                            });


                    }

                    ;
                });
            });
        }
    });
}