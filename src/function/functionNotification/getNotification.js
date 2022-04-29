const notification =require('../../model/notification')
exports.getNotification= (req, res,next) => {
    let {id}= req.body
    notification.find({receiver:id})
        .then((notifFound)=>{
            res.json({success: true, notifFound});
        })
        .catch(() => res.json({ success: false }));
}
