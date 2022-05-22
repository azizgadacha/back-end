const workspace =require('../../model/workspace')
exports.shareWorkspace= async (req, res,next) => {
    const cardId = String(req.body.card_id);
    const userId = String(req.body.user_id);
    const UserName = String(req.body.user_username);

    let ch = [userId, UserName]
    var item = await workspace.findOne({_id:cardId});
    var list=[];
    for(i of item.Share){
        list.push(i[0])
    }
    console.log(list)
    if (list.includes(userId) ) {
        res.json({success: false})
    } else {
        workspace.findOneAndUpdate({_id: cardId}, {$addToSet: {Share: ch}})
            .then((workspaceitems) => {

                workspace.findOne({_id: cardId}).then((w) => {
                    res.json({success: true, w})
                })
            })
            .catch(() => res.json({success: false}));
    }
}





