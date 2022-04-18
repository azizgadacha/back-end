const workspace =require('../model/workspace')
const User=require('../model/user')
exports.getSharedWorkspace=  async (req, res,next) => {
    var  id = req.body.user_id;
    var workspaceitems=[]
    var item =await workspace.find({});
    for(let item1 of item){
        for(let i of item1.Share) {
            if (id === i[0]) {
                await User.findOne({_id:i[1]})
                    .then((user)=>{
                        workspaceitems.push([item1,user.username])
                    })

            }
        }
    }
    console.log(workspaceitems)
    res.json({success: true, workspaceitems})
}