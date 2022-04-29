
const notification = require("../../model/notification");

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





