const bcrypt=require('bcrypt');
const jwt =require( 'jsonwebtoken');
const User =require( '../model/user');
const nodemailer=require("nodemailer")
const {v4 : uuidv4}=require("uuid")
const activeSession =require( '../model/activeSession');
const verificationuser =require( '../model/verificationuser');
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
        console.log(process.env.EMAIL)
        console.log(process.env.PASSWORD)

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        await transporter.verify((error, success) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("ready")
                }

            }
        )

        return res.json({
            success: false,
            msg: `le compte exciste`,
        });

        return res.json({success: false, msg: 'Wrong credentials'});
    });
    }
