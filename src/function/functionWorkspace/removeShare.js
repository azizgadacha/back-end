const workspace =require('../../model/workspace')
exports.removeShare= async (req, res,next) => {
    const cardId = String(req.body.card_id);
    const userId = String(req.body.user_id);

    // let ch=[userId,UserName]
    var alam=[]
    var test=[]
   await workspace.findOne({_id:cardId})
        .then((workspaceitems)=>{
         for(let item of workspaceitems.Share){
             if(item.sharedWith!=userId){
                 alam.push(item)
             }
             test.push(item.sharedWith)

         }
        console.log(workspaceitems.Share.sharedWith)

        })

    console.log("alam")
    console.log(test)
    if(test.includes(userId)) {
        workspace.findOneAndUpdate({_id: cardId}, {Share: alam})
            .then((work) => {
                workspace.findOne({_id: cardId}).then((w) => {
                    console.log('salam')
                    console.log('salam')
                    console.log('salam')
                    console.log(w)

                    res.json({success: true, w})
                })
            })
            .catch(() => res.json({success: false}));
    }
    else {
        res.json({success:false})

    }



}
