
const User =require( '../../model/user');


exports.getall=(req, res) => {
   let  id=req.body. user_id
    let filter

    if(req.body.email){
        filter={$or: [ {email:req.body.email, _id: { $nin: `${id}` } }, {  _id: { $nin: `${id}` },username:req.body.username}]}
    }else{
        filter=   { _id: { $nin: `${id}` } }
    }


    User.find(  filter).then((users) => {


        users = users.map((item) => {
            const x = item;
            x.password = undefined;
            return x;
        });
        res.json({ success: true, users });
    }).catch(() => res.json({ success: false }))




        ;
}