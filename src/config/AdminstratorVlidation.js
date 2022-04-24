const user =require ('../model/user');

exports.AdminstratorVlidation = (req, res, next) => {


    const _id = String(req.headers || req.body.id);
    user.find({ _id:id }).then((user) => {



        if (user.length === 1) {
            return next();
        }
        return res.json({ success: false, administratorProblem: true ,user});
    });
};
