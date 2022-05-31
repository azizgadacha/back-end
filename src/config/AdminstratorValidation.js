const user =require ('../model/user');

exports.AdminstratorVlidation = (req, res, next) => {

    const _id =  req.body.user_id;
    user.findOne({ _id:_id }).then((user) => {


        if ((user.role === "administrateur")) {

            return next();
        }
user.password=undefined
        return res.json({ success: false, administratorProblem: true ,user});
    });
};
