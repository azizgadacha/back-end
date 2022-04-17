const workspace =require('../../model/workspace')
const activeSession =require('../../model/activeSession')
exports.deleteworkspace=  async (req, res,next) => {
    var  id = req.body.superior_id;
    var descendants=[]
    var workspaceitems=[]
    var stack=[];
    descendants.push(id)
    var item =await workspace.findOne({_id:id});

    stack.push(item);
    workspaceitems.push(item)
    while (stack.length>0){
        var currentnode = stack.pop();
        var children = await workspace.find({superior_id:currentnode._id});
        children.forEach(function(child) {
            descendants.push(child._id);
            workspaceitems.push(child)
            stack.push(child);
        });
    }
    descendants.join(",")
    for(item of descendants){
       await workspace.findByIdAndRemove(item.toString())

    }
    res.json({success: true, workspaceitems})










}