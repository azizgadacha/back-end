const activeSession =require ('../model/activeSession');

exports.checkToken = (req, res, next) => {


    const token = String(req.headers.authorization || req.body.token);
    activeSession.find({ token }).then((session) => {



        if (session.length === 1) {
            return next();
        }
        return res.json({ success: false, msg: 'User is not logged on' });
    });
};
