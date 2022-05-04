const workspace =require('../model/workspace')
exports.removeShare= async (req, res,next) => {
    const cardId = String(req.body.card_id);
    const userId = String(req.body.user_id);

    // let ch=[userId,UserName]
    var alam=[]
    workspace.findOne({_id:cardId})
        .then((workspaceitems)=>{
         for(let item of workspaceitems.Share){
             if(item[0]!=userId){
                 alam.push(item)
             }
         }
           workspace.findOneAndUpdate({_id:cardId},{Share:alam})
               .then((work)=>{
                   workspace.findOne({_id:cardId}).then((w)=>{
                       res.json({success:true,w})
                   })
               })
               .catch(() => res.json({ success: false }));
        })



}
