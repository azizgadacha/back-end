const workspace =require('../../model/workspace')
const User=require('../../model/user')
exports.visualizationOfWorkspaces=  async (req, res,next) => {
    const superior_id= String(req.body.user_id);
    var ListUsers =await User.find({});
    var workspaceitems=[]
    console.log(ListUsers)
    for(let item of ListUsers){
        let ListeWorkspace=[]

        if(item._id!=superior_id) {
            let items = await workspace.find({superior_id: item._id})
            if(items!=null) {
                for (let x of items) {
                    console.log(x)
                    workspaceitems.push([x,item._id,item.username])                }

            }

        }
    }
    res.json({success: true, workspaceitems,listeName:[]})
}