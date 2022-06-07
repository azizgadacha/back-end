const notification = require("../model/notification");
const user = require("../model/user");


//Add Notification

exports.addNotification=async (req,res)=>{




    let { receiver, sender, type, read,text}=req.body



    notification.create({receiver, sender, type, read,text}).then((notification)=>{
        res.json({ success: true, notification})
    })
        .catch(() => res.json({ success: false }));
}

//get Notification

exports.getNotification= (req, res,next) => {
    let {id}= req.body
    let result=[]

    notification.find({receiver:id})
        .then(async (notifFound) => {

            for (let not of notifFound) {

                let  usersender = await user.findOne({_id: not.sender})
                if (usersender) {
                    usersender.password = undefined
                    result.push([usersender, not])
                }
                else{
                    notification.deleteOne({_id:not_id})
                }
            }
            res.json({success: true, notifFound: result.reverse()});

        })




        .catch(() => res.json({ success: false }));
}

//delete Notification

exports.deleteNo=async (req, res) => {



}

//Delete Notification

exports.deleteNotification=async (req, res) => {

    let {_id,receiver} = req.body;

    notification.findOneAndDelete({_id,receiver})
        .then((notification)=>{

            if (notification)
                res.json({success: true, notification});
            else
                res.json({success: false,notFound:true,msg:"noification deleted"});

        }).catch(()=>{

        res.json({success: false,msg:"internal problem please try later"});

    })
}
//edit Notification

exports.editNotification=async (req, res) => {

    let {IdListe} = req.body;

    notification.updateMany({_id:{ $in : IdListe }},{read:true})
        .then((notification)=>{

            res.json({success: true, notification});

        }).catch(()=>{

        res.json({success: false,msg:"internal problem please try later"});

    })
}










