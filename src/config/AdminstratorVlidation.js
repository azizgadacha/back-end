const user =require ('../model/user');

exports.AdminstratorVlidation = (req, res, next) => {

    const _id =  req.body._id;
    user.find({ _id:_id }).then((user) => {


        if (user.length === 1) {

            return next();
        }

        return res.json({ success: false, administratorProblem: true ,user});
    });
};
