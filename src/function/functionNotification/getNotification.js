const notification =require('../../model/notification')
const user =require('../../model/user')

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
