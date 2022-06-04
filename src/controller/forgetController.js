

const User = require("../model/user");
const ForgetToken = require("../model/ForgetToken");

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
                html:`

<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
* {
box-sizing: border-box;
}

body {
margin: 0;
padding: 0;
}

a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: inherit !important;
}

#MessageViewBody a {
color: inherit;
text-decoration: none;
}

p {
line-height: inherit
}

.desktop_hide,
.desktop_hide table {
mso-hide: all;
display: none;
max-height: 0px;
overflow: hidden;
}

@media (max-width:690px) {
.row-content {
width: 100% !important;
}

.image_block img.big {
width: auto !important;
}

.column .border,
.mobile_hide {
display: none;
}

table {
table-layout: fixed !important;
}

.stack .column {
width: 100%;
display: block;
}

.mobile_hide {
min-height: 0;
max-height: 0;
max-width: 0;
overflow: hidden;
font-size: 0px;
}

.desktop_hide,
.desktop_hide table {
display: table !important;
max-height: none !important;
}
}
</style>
</head>

<body style="background-color: #37474f; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #37474f;">
<tbody>
<tr>
<td>
<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
<tbody>
<tr>
<td>
<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 670px;" width="670">
<tbody>
<tr>
<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 35px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
<table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
<tr>
<td style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/815506_799426/editor_images/c0073a7e-5b55-42c1-8ff0-abfb06a2e56e.png" style="display: block; height: auto; border: 0; width: 268px; max-width: 100%;" width="268" alt="company logo" title="company logo"></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
<tbody>
<tr>
<td>
<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 670px;" width="670">
<tbody>
<tr>
<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
<table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
<tr>
<td style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4056/3275432.png" style="display: block; height: auto; border: 0; width: 670px; max-width: 100%;" width="670" alt="reset password" title="reset password"></a></div>
</td>
</tr>
</table>
<table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
<tr>
<td style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:50px;">
<div style="font-family: Arial, sans-serif">
<div class="txtTinyMce-wrapper" style="font-size: 14px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 16.8px; color: #393d47; line-height: 1.2;">
<p style="margin: 0; text-align: center; font-size: 16px;"><span style="font-size:16px;">We received a request to reset your password.</span></p>
<p style="margin: 0; text-align: center; font-size: 16px;"><span style="font-size:16px;">If you didn't make this request, simply ignore this email.</span></p>
</div>
</div>
</td>
</tr>
</table>
<table class="button_block" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
<tr>
<td>
<div align="center">

<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:42px;width:158px;v-text-anchor:middle;" arcsize="58%" stroke="false" fillcolor="#ff2f2f"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="${process.env.url}/change/${token}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff2f2f;border-radius:24px;width:auto;border-top:1px solid #ff2f2f;font-weight:400;border-right:1px solid #ff2f2f;border-bottom:1px solid #ff2f2f;border-left:1px solid #ff2f2f;padding-top:5px;padding-bottom:5px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:50px;padding-right:50px;font-size:16px;display:inline-block;letter-spacing:1px;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>RESET</strong></span></span></a>
<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>

</html>







`

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
