const workspace =require('../../model/workspace')
exports.shareWorkspace= async (req, res,next) => {
    const cardId = String(req.body.card_id);
    const userId = String(req.body.user_id);
    const UserName = String(req.body.user_username);

    let ch = {sharedWith:userId,sharedPerson:UserName}
    var item = await workspace.findOne({_id:cardId});
    var list=[];
    for(i of item.Share){
        list.push(i.sharedWith)
    }
    console.log(list)
    if (list.includes(userId) ) {
        res.json({success: false})
    } else {

        console.log("ssssssssssssssssssssssssssssssssss")
        console.log(ch)
        workspace.findOneAndUpdate({_id: cardId}, {$addToSet: {Share: ch}})
            .then((workspaceitems) => {

                workspace.findOne({_id: cardId}).then((w) => {
                    console.log("wa les amis")
                    console.log(w)
                    res.json({success: true, w})
                })
            })
            .catch(() => res.json({success: false}));
    }
}





