const workspace =require('../../model/workspace')
const notification = require("../../model/notification");
exports.shareWorkspace= async (req, res,next) => {
    const cardId = String(req.body.card_id);
    const userId = String(req.body.user_id);
    const withShared = String(req.body.withShared);
    console.log(req.body)
    let NewChare = {sharedWith:withShared,sharedPerson:userId}
    var item = await workspace.findOne({_id:cardId});
    var list=[];
    for(let i of item.Share){
        list.push(i.sharedWith)
    }
    console.log(list)
    if (list.includes(userId) ) {
        res.json({success: false})
    } else {


        workspace.findOneAndUpdate({_id: cardId}, {$addToSet: {Share: NewChare}})
            .then((workspaceitems) => {
                console.log("im here1")
                console.log("im here1")

                workspace.findOne({_id: cardId}).then((item) => {
                    console.log("im here2")

                    notification.create({receiver:withShared, sender:userId, type:"shared", read:false,text:` has shared ${workspaceitems.WorkspaceName} with you`}).then((notification)=>{
                        console.log("im here")

                        res.json({ success: true,workspace:item, notification})


                    })



                })
            })
            .catch((e) => {
                console.log("im here3")

                console.log(e)
                res.json({success: false})});
    }
}





