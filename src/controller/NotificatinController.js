const notification = require("../model/notification");
const user = require("../model/user");
const workspace = require("../model/workspace");


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
    console.log("de4eeeee")
    console.log(id)

    notification.find({receiver:id})
        .then(async (notifFound) => {
console.log("dddddz")
console.log(notifFound)
            for (let not of notifFound) {
                console.log("dddddz")

                let  usersender = await user.findOne({_id: not.sender})
                if (usersender) {
                    usersender.password = undefined
                    let name=null
                    if(not.type==="shared") {
                        let work= await workspace.findOne({_id: not.idNotified})
                        console.log(work)
                        console.log(work.WorkspaceName)
                        name= work.WorkspaceName
                    }else{
                        let userReceiver= await user.findOne({_id: not.idNotified})
                        name= userReceiver.username
                    }
                    console.log("salut")
                    console.log(result)

                    result.push({user:usersender,notification: not,NameShared:name})
                }
                else{
                    notification.deleteOne({_id:not._id})
                }
            }
            console.log("deeeeee")
            console.log(notifFound)
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










