const bcrypt=require('bcrypt');
const User =require( '../model/user');
const fs = require("fs");
const workspace = require("../model/workspace");


exports.DeleteUser=async (req, res) => {

    let id = req.body.user_id;
console.log(id)
    if(User.findOne({_id:id}))
    {
        var descendants = []
        var workspaceitems = []
        var stack = [];
        var item = await workspace.findOne({superior_id: id});
        console.log('111111111111111')
        console.log(item)
        stack.push(item);
        workspaceitems.push(item)
        descendants.push(item._id)
        while (stack.length > 0) {

            var currentnode = stack.pop();
            var children = await workspace.find({superior_id: currentnode._id});
            console.log(children)
            children.forEach(function (child) {
                descendants.push(child._id);
                workspaceitems.push(child)
                stack.push(child);
            });

        }
        descendants.join(",")
        for (item of descendants) {
            console.log(item.toString())
            await workspace.findByIdAndRemove(item.toString())

        }
    }
    console.log(workspaceitems)
    User.findOneAndDelete({_id:id}).then((user) => {
        console.log(user)

        if (user) {
            user.password = undefined;
console.log("hello"+user.photo)
            let usertable = user
            if((user.photo)&&(user.photo==="avatar_1"))
            fs.unlinkSync("./upload/"+user.photo)



            res.json({success: true, msg: "User has been deleted ", user: usertable});

        } else {
            res.json({success: false, msg: "error  user dosn't excite "});
        }

    })}