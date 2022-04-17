const workspace =require('../model/workspace')
exports.getSharedWorkspace=  async (req, res,next) => {
    var  id = req.body.user_id;
    var workspaceitems=[]
    var item =await workspace.find({});
    for(let item1 of item){
        for(let i of item1.Share) {
            if (id === i) {
                workspaceitems.push(item1)
            }
        }
    }
    res.json({success: true, workspaceitems})
}