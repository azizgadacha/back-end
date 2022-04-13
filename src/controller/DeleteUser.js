const bcrypt=require('bcrypt');
const User =require( '../model/user');
const fs = require("fs");
const workspace = require("../model/workspace");


exports.DeleteUser=async (req, res) => {

    let id = req.body.user_id;

    if (User.findOne({_id: id})) {
        var descendants = []
        var workspaceitems = []

        //descendants.push(id)
        var items = await workspace.find({superior_id: id})
        console.log(items)
        for (let item of items) {
            descendants.push(item._id)
            console.log('111111111111111')
            console.log(item)
            var stack = [];
            stack.push(item);
            workspaceitems.push(item)
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
            for(item of descendants){
                console.log(item.toString())
                await workspace.findByIdAndRemove(item.toString())

            }





        }
        console.log(workspaceitems)

    }



    User.findOneAndDelete({_id:id}).then((user) => {



        if (user) {
            user.password = undefined;
            let usertable = user

            if (fs.existsSync(user.photo)){
                if (user.photo)
                    fs.unlinkSync("./upload/" + user.photo)
            }



            res.json({success: true, msg: "User has been deleted ", user: usertable});

        } else {
            res.json({success: false, msg: "error  user dosn't excite "});
        }



    })}





