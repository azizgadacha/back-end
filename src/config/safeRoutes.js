const activeSession =require ('../model/activeSession');

exports.checkToken = (req, res, next) => {
    console.log("il token houwa" +req.body.token)
    console.log("ye hemil3")

    const token = String(req.headers.authorization || req.body.token);
    activeSession.find({ token }).then((session) => {
        console.log(token);
        console.log("ye hemil2")

        console.log(session);
        if (session.length === 1) {
            console.log("ye hemil")
            return next();
        }
        return res.json({ success: false, msg: 'User is not logged on' });
    });
};
