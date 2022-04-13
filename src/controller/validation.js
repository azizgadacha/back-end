const bcrypt=require('bcrypt');
const User =require( '../model/user');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { isJwtExpired } =require( 'jwt-check-expiration')
const ForgetToken = require("../model/ForgetToken");


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





