const jwt =require( 'jsonwebtoken');
const jwt_decode =require( "jwt-decode");


const ForgetToken=require("../../model/ForgetToken")
const User =require( '../../model/user');
const Joi = require("joi");
const bcrypt = require("bcrypt");

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