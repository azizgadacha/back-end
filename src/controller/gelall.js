
const User =require( '../model/user');


exports.getall=(req, res) => {
   let  {id}=req.body


    User.find( { _id: { $nin: `${id}` } } ).then((users) => {
        users = users.map((item) => {
            const x = item;
            x.password = undefined;
            return x;
        });
        res.json({ success: true, users });
    }).catch(() => res.json({ success: false }));
}