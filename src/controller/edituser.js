
const User =require( '../model/user');

exports.edituser=(req, res) => {
    const { userID, username, email } = req.body;


    User.find({ _id: userID }).then((user) => {
        if (user.length === 1) {
            const query = { _id: user[0]._id };
            const newvalues = { username, email };
            User. findOneAndUpdate(query, newvalues).then(
                () => {
                    res.json({ success: true });
                },
            ).catch(() => {
                res.json({ success: false, msg: 'There was an error. Please contract the administrator' });
            });
        } else {
            res.json({ success: false, msg: 'Error updating user' });
        }
    });
}