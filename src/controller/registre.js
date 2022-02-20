const bcrypt=require('bcrypt');
const User =require( '../model/user');
const verificationuser =require( '../model/verificationuser');


exports.registre=async (req, res) => {


    const result = verificationuser.userSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }

    const {username, email, password} = req.body;


    User.findOne({email}).then((user) => {
        if (user) {
            res.json({success: false, msg: 'Email already exists'});
        } else {
            bcrypt.genSalt(10, (_err, salt) => {
                bcrypt.hash(password, salt).then((hash) => {
                    const query = {
                        username,
                        email,
                        password: hash,
                    };

                    User.create(query).then((u) => {
                        res.json({success: true, userID: u._id, msg: 'The user was successfully registered'});
                    });
                });
            });
        }
    });
}