const notification =require('../../model/notification')


exports.addNotification=async (req,res)=>{




    let { receiver, sender, type, read,name}=req.body
    let salah={ receiver, sender, type, read,name}

console.log("dddddd")
console.log(salah)


    notification.create({receiver, sender, type, read,name}).then((notification)=>{

        })
        .catch(() => res.json({ success: false }));
}
















