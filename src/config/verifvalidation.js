
const ForgetToken =require ('../model/ForgetToken');
const jwt_decode = require("jwt-decode");
const { isJwtExpired } =require( 'jwt-check-expiration')

exports.checkValidity = (req, res, next) => {
let tokenn=req.body.token
    ForgetToken.find( { token:tokenn}).then((result)=>
        {
            if (result)
            {
                if (!isJwtExpired(tokenn))
                      return ({success:true});
                    }

            return res.json({ success: false, msg: 'User is not logged on' });
        })

    console.log(token);
    console.log(session);
    if (session.length === 1) {
        return next();
    }
    return res.json({ success: false, msg: 'User is not logged on' });


};
