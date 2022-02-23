
const Joi = require("joi");

const userSchema = Joi.object().keys({

    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(4).max(15)
        .optional(),
    password: Joi.string(),
});
module.exports={
userSchema

}