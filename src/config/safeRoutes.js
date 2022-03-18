const activeSession =require ('../model/activeSession');

exports.checkToken = (req, res, next) => {
    console.log("il token houwa" +req.body.token)
    const token = String(req.headers.authorization || req.body.token);
    activeSession.find({ token }).then((session) => {
        console.log(token);
        console.log(session);
        if (session.length === 1) {
            console.log("lll")
            return next();
        }
        return res.json({ success: false, msg: 'User is not logged on' });
    });
};
