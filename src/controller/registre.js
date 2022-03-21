const bcrypt=require('bcrypt');
const Joi = require("joi");
const User =require("../model/user")



exports.registre=async (req,res) => {

    let   valid={email:req.body.email,username:req.body.username,password:req.body.password,phone:req.body.phone,role:req.body.role}

    const userSchema = Joi.object().keys({

        email: Joi.string().email().required(),
        username: Joi.string().allow(" ") .min(4).max(15)
            .optional().required(),
        password: Joi.string().required(),
        phone: Joi.number().required(),

        role:Joi.string().required()
    });
    const result = userSchema.validate(valid);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }

    const {username, email, password,phone,role} = req.body;

    let  file=null
    if (req.body.sendtphoto)
    {
       file=req.file.filename
    }else{
        file="avatar_1.jpg"

    }

    User.findOne({ $or: [{ email }, { username }]}).then((user) => {
        if (user) {
            res.json({success: false, msg: 'User already excite already exists'});
        } else {
          //  if(!file)
          //  {
              // file:"avatar_1.jpg"
          // }
            bcrypt.genSalt(10, (_err, salt) => {
                bcrypt.hash(password, salt).then((hash) => {
                    const query = {
                        username,
                        email,
                        password: hash,
                        phone,
                        role,
                        photo:file

                    };



                    User.create(query).then((u) => {




                        res.json({success: true, userID: u._id, msg: 'The user was successfully registered'});
                    });
                });
            });
        }
    });
}