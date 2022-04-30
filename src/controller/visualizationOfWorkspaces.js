const workspace =require('../model/workspace')
const User=require('../model/user')
exports.visualizationOfWorkspaces=  async (req, res,next) => {
    const superior_id= String(req.body.superior_id);
    var ListUsers =await User.find({});
    var workspaceitems=[]
    console.log(ListUsers)
    for(let item of ListUsers){
       let items=await workspace.find({superior_id:item._id})
        console.log("aeaeae")
        console.log(items)
        for(let x of items) {
            workspaceitems.push(x)
        }
    }
    res.json({success: true, workspaceitems,listeName:[]})
}