const bcrypt=require('bcrypt');
const User =require( '../model/user');
const Joi = require("joi");


exports.registre=async (req, res) => {

    const userSchema = Joi.object().keys({

        email: Joi.string().email().required(),
        username: Joi.string().alphanum().allow(" ") .min(4).max(15)
            .optional().required(),
        password: Joi.string().required(),
        role:Joi.string().required()
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }

    const {username, email, password,role} = req.body;


    User.findOne({email}).then((user) => {
        if (user) {
            res.json({success: false, msg: 'Email already exists'});
        } else {
            bcrypt.genSalt(10, (_err, salt) => {

                console.log("il salt houwa :"+salt)
                bcrypt.hash(password, salt).then((hash) => {
                    console.log("il salt houwa 2:"+salt)

                    const query = {
                        username,
                        email,
                        password: hash,
                        role
                    };

                    User.create(query).then((u) => {
                        res.json({success: true, userID: u._id, msg: 'The user was successfully registered'});
                    });
                });
            });
        }
    });
}