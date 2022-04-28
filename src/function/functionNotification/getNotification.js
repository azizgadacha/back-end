const notification =require('../../model/notification')
exports.getNotification= (req, res,next) => {
    const {id}= req.body;

    notification.find({receiver:id})
        .then((notif)=>{
            res.json({success: true, notif});
        })
        .catch(() => res.json({ success: false }));
}
