const bcrypt=require('bcrypt');
const User =require( '../model/user');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { isJwtExpired } =require( 'jwt-check-expiration')
const ForgetToken = require("../model/ForgetToken");


exports.validation=async (req, res) => {

    let token = req.body.token
console.log(process.env.SECRET)
    console.log(token)
    jwt.verify(token, process.env.SECRET, (err, verifiedJwt) => {
        if (err) {
            res.json({success: false})


        } else {
if (!isJwtExpired(token)) {
    console.log("il token houwa    "+token)
    ForgetToken.findOne({token}).then(async (forgettoken) => {
        console.log("il token houwa ")
            if (forgettoken) {
                console.log("iffffffffl token houwa ")

                let now = new Date()
                console.log("sff ")

                if (now < forgettoken.expire) {
                    await ForgetToken.findOneAndRemove(forgettoken)
                    console.log("sffert ")

                    return res.json({success: true})

                }
                await ForgetToken.findOneAndRemove(forgettoken)
                console.log("sffsdqdsdddzert ")

                return res.json({success: false})

            }

            return res.json({success: false})
        }
    ).catch((error)=>{
        console.log("sffedqccccccccrt ")


        return res.json({success: false})

    })



}else
{
    res.json({success: false})
}
        }

    })
}





