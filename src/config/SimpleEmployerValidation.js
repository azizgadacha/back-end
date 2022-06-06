const user =require ('../model/user');

exports.SimpleEmployerValidation = (req, res, next) => {

    const _id =req.body.user_id;

    user.findOne({ _id:_id }).then((user) => {


        if (user.role === 'simple employer') {

            return next();
        }

        return res.json({ success: false, SimpleEmployerProblem: true ,user});
    });
};
