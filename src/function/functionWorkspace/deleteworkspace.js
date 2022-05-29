const workspace =require('../../model/workspace');
const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')
const notification=require('../../model/notification')
const user = require("../../model/user");

exports.deleteworkspace=  async (req, res,next) => {
    var id = req.body.superior_id;
    const user_id=req.body.user_id
    const visualisation = req.body.visualise;
    var descendants = []
    var workspaceitems = []
    var stack = [];
    descendants.push(id)
    let validation = true
    user.findOne({_id: user_id}).then(async (user) => {
        if ((visualisation === true) && (user.role != "administrateur"))
            validation = false
        if (validation) {
            var item = await workspace.findOne({_id: id});
            if (item != null) {
                stack.push(item);
                workspaceitems.push(item)
                while (stack.length > 0) {
                    var currentnode = stack.pop();
                    var children = await workspace.find({superior_id: currentnode._id});
                    children.forEach(function (child) {
                        descendants.push(child._id);
                        workspaceitems.push(child)
                        stack.push(child);
                    });
                }
                descendants.join(",")
                for (item of descendants) {
                    await workspace.findByIdAndRemove(item.toString())

                    let ListNotification = await notification.find({idNotified: item._id})
                    for (let notif of ListNotification) {
                        await notification.deleteOne({idNotified: notif.idNotified})
                    }

                }
                res.json({success: true, workspaceitems})

            } else
                res.json({success: false,})

        }
        else
        {
            user.password=undefined

            res.json({success:false,user,adminstratorProblem:true ,msg: 'you are no longer an administrator'});


        }
    })
}