const activeSession =require ('../model/activeSession');
const { isJwtExpired } =require( 'jwt-check-expiration')


exports.checkToken = (req, res, next) => {
console.log("jomla 3andha ma3na")
console.log(req.body)
    const token = String(req.headers.authorization || req.body.token);
    activeSession.find({ token }).then((session) => {



        if (session.length === 1) {

            if (!isJwtExpired(token)) {
            return next();
        }}
        return res.json({ success: false, notConnected:true,msg: 'User is not logged on' });
    });
};
