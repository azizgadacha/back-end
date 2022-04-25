const user =require ('../model/user');

exports.AdminstratorVlidation = (req, res, next) => {

console.log(req.body._id)
    const _id =  req.body._id;
    user.find({ _id:_id }).then((user) => {

console.log("lllllllllpppppp")

        if (user.length === 1) {
            console.log("lllllllllpppppp2.0")

            return next();
        }
        console.log("lllllllllpppppp2.5555555550")

        return res.json({ success: false, administratorProblem: true ,user});
    });
};
