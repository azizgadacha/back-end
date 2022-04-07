const jwt_decode =require( "jwt-decode");
const bcrypt=require('bcrypt');

const ForgetToken=require('../model/ForgetToken');
const jwt =require( 'jsonwebtoken');
const User =require( '../model/user');
const nodemailer=require("nodemailer")

const Joi = require("joi");
require("dotenv").config()


exports.forget=async (req, res) => {
    // Joy Validation

    const userSchema = Joi.object().keys({

        email: Joi.string().email().required(),
        username: Joi.string().allow(" ") .min(6).max(15)
            .optional().required()
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
    const { username } = req.body;

    User.findOne({ email ,username}).then(async (user) => {
        if (!user) {
            return res.json({success: false, msg: 'Wrong credentials'});
        }


        if (!process.env.SECRET) {
            throw new Error('SECRET not provided');
        }




        let transporter = nodemailer.createTransport({
              hos:req.hostname,
              service: "gmail",
            port:3000,
            secure:true,
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
