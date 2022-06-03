

const user = require("../model/user");

const nodemailer = require("nodemailer");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const bcrypt=require('bcrypt');
const { isJwtExpired } =require( 'jwt-check-expiration')

//Add Change Password
exports.change=async (req, res) => {
    const { password } = req.body;

    const { token } = req.body;
    // Joy Validation
    const passwordSchema = Joi.object().keys({
        password: Joi.string().required(),
    });
    const result = passwordSchema.validate({password});if (result.error) {
        return  res.status(422).json({
            success: false,
            msg: `erreur  ${result.error.details[0].message}`,
        });
    }



    let payload= jwt_decode(token)

    bcrypt.genSalt(10, (_err, salt) => {


        bcrypt.hash(password, salt).then((hash) => {



                User.findOneAndUpdate({email:payload.email},{password:hash}).then((user)=>{

                    ForgetToken.findOneAndRemove({token:token}).then(()=>{
                            return   res.json({ success: true,msg: `la mot de passe a ete changer`});
                        }
                    )  })
            }
        ).catch(()=>{return   res.json({ success: false,
            msg: `erreur raisayer lus tart`});


        })})
}

//forget Passwoed

exports.forget=async (req, res) => {
    // Joy Validation

    const userSchema = Joi.object().keys({

        email: Joi.string().email().required(),

    });

    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }

    const { email } = req.body;

    User.findOne({ email }).then(async (user) => {
        if (!user) {
            return res.json({success: false, msg: 'Wrong credentials'});
        }


        if (!process.env.SECRET) {
            throw new Error('SECRET not provided');
        }




        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secureConnection:false,
            port :587,
            tls:{
                ciphers:'SSLv3'
            },
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        let  token = jwt.sign({
            email: user.email,
            username: user.username
        }, process.env.SECRET, {
            expiresIn: 60000, // 1 week
        });

        ForgetToken.create({token:token,email:user.email,expire:jwt_decode(token).exp*1000}).then(async (u) => {
            await transporter.sendMail({
                from:process.env.EMAIL,

                to:req.body.email,

                subject:"Restauration du mot de passe",
                html:`<h1>Hello</h1><br>
                <h3>it seems that you tried to change your password of PERSOSPACE account to change it please click bellow</h3> <br>
                   <a href="${process.env.url}/change/${token}">link is here</a>  `

            })
            return res.json({
                success: true,
                msg: `an email containing the password reset link has been sent`,
            });

            return res.json({success: false, msg: 'Wrong credentials'})        });


    });
}


//Validation Passwoed
exports.validation=async (req, res) => {

    let token = req.body.token
    jwt.verify(token, process.env.SECRET, (err, verifiedJwt) => {
        if (err) {
            res.json({success: false})


        } else {
            if (!isJwtExpired(token)) {
                ForgetToken.findOne({token}).then(async (forgettoken) => {
                        if (forgettoken) {

                            let now = new Date()

                            if (now < forgettoken.expire) {
                                await ForgetToken.findOneAndRemove(forgettoken)

                                return res.json({success: true})

                            }
                            await ForgetToken.findOneAndRemove(forgettoken)

                            return res.json({success: false})

                        }

                        return res.json({success: false})
                    }
                ).catch((error)=>{


                    return res.json({success: false})

                })



            }else
            {
                res.json({success: false})
            }
        }

    })
}
