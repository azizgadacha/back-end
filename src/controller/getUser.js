const User =require( '../model/user');
const activeSession =require('../model/activeSession')
const bcrypt = require("bcrypt");
exports.getUser= (req, res,next) => {
    const token = String(req.body.token);
    activeSession.find({token})
        .then((session)=>{
            let id= session[0].userId
           User.find({_id:id})
                .then((users)=>{
                    let password=users[0].password;
                    let username=users[0].username;
                    let email=users[0].email;
                   res.json({ success: true, password,username,email });
            })
                .catch(() => res.json({ success: false }));
        })
        .catch(()=>res.json({success:false}))




}