const jwt =require( 'jsonwebtoken');
const jwt_decode =require( "jwt-decode");



const User =require( '../model/user');
const {decode} = require("jsonwebtoken");

exports.change=async (req, res) => {

    console.log(new Date().getTime() / 1000)
   // const token = String(req.headers.authorization || req.body.token);
    let token=req.body.token

    let decoded = jwt_decode(token);
    console.log(decoded)
    console.log(decoded.email)








    /*User.find({ _id: userID }).then((user) => {
        if (user.length === 1) {
            const query = { _id: user[0]._id };
            const newvalues = { username, email };
            User. findOneAndUpdate(query, newvalues).then(
                () => {*/
                  return   res.json({ success: false,
                        msg: `change`});
                  /*


                      return res.json({
            success: false,
            msg: `un mail contenant le lien de reinstalisation du mot de pass  a ete envoyer`,
        })
                },
            ).catch(() => {
                res.json({ success: false, msg: 'There was an error. Please contract the administrator' });
            });
        } else {
            res.json({ success: false, msg: 'Error updating user' });
        }
    });*/
}