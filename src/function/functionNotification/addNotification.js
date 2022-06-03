const notification =require('../../model/notification')


exports.addNotification=async (req,res)=>{




    let { receiver, sender, type, read,text}=req.body



    notification.create({receiver, sender, type, read,text}).then((notification)=>{
        res.json({ success: true, notification})
        })
        .catch(() => res.json({ success: false }));
}







