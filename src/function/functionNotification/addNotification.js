const notification =require('../../model/notification')


exports.addNotification=async (req,res)=>{




    let { receiver, sender, type, read,name}=req.body




    notification.create({receiver, sender, type, read,name}).then((notification)=>{

        })
        .catch(() => res.json({ success: false }));
}
















