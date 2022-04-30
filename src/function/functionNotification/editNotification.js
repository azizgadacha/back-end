
const notification = require("../../model/notification");

exports.editNotification=async (req, res) => {

    let {IdListe} = req.body;
console.log("im there")
console.log(IdListe)
    notification.updateMany({_id:{ $in : IdListe }},{read:true})
        .then((notification)=>{

                res.json({success: true, notification});

        }).catch(()=>{

        res.json({success: false,msg:"internal problem please try later"});

    })
}





