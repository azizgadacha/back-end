const bcrypt=require('bcrypt');
const jwt =require( 'jsonwebtoken');
const User =require( '../model/user');
const nodemailer=require("nodemailer")
const {v4 : uuidv4}=require("uuid")
const activeSession =require( '../model/activeSession');
const verificationuser =require( '../model/verificationuser');
const {text} = require("express");
require("dotenv").config()


exports.forget=(req, res) => {
    // Joy Validation
    const result = verificationuser.userSchema.validate(req.body);
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
        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.SECRET, {
            expiresIn: 86400, // 1 week
        });

        await transporter.sendMail({
            from:process.env.EMAIL,

            to:req.body.email,

            subject:"Restauration du mot de passe",
            html:`<h1>bonjour</h1><br>
                <h3>un personne a esseyer de reainstaller votre mot de passe si c est vous vous devez</h3> <br>
                <h3> votre${process.env.url}h lien est   <a href="${process.env.url}/forget/${token}">lin is here</a></h3>  `

        })
console.log(process.env.url)
        return res.json({
            success: false,
            msg: `le compte exciste`,
        });

        return res.json({success: false, msg: 'Wrong credentials'});
    });
    }
