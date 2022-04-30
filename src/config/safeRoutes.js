const activeSession =require ('../model/activeSession');
const { isJwtExpired } =require( 'jwt-check-expiration')


exports.checkToken = (req, res, next) => {


    const token = String(req.headers.authorization || req.body.token);
    activeSession.find({ token }).then((session) => {



        if (session.length === 1) {

            if (!isJwtExpired(token)) {
            return next();
        }}
        return res.json({ success: false, notConnected:true,msg: 'User is not logged on' });
    });
};
