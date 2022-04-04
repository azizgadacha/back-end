const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
//const {raw} = require("express");
exports.deleteworkspace=  async (req, res,next) => {
    var  id = req.body.superior_id;
    var descendants=[]
    var workspaceitems=[]
    var stack=[];
    descendants.push(id)
    var item =await workspace.findOne({_id:id});
    console.log('111111111111111')
    console.log(item)
    stack.push(item);
    workspaceitems.push(item)

    while (stack.length>0){

        var currentnode = stack.pop();
        var children = await workspace.find({superior_id:currentnode._id});
        console.log(children)
        children.forEach(function(child) {
            descendants.push(child._id);
            workspaceitems.push(child)
            stack.push(child);
        });

    }

    descendants.join(",")
    for(item of descendants){
        console.log(item.toString())
       await workspace.findByIdAndRemove(item.toString())

    }


    console.log(workspaceitems)
    res.json({success: true, workspaceitems})
    /*workspace.find({}).then((w)=>{
        var deleted =[]


        var WorkspaceName=String(req.body.WorkspaceName);
        for(item of w){
            if(item.superior_id===id){
                for(item1 of w){
                    if(item1.superior_id===id){
                        deleted.push(item1.WorkspaceName)
                    }
                }
                id=item.id
            }

        }
        console.log(deleted)

        res.json({success: true, w})
    })



     */





    //console.log(deleted)








    //var superior_id='1'
   /* workspace.find({WorkspaceName,superior_id:id})
        .then((w)=>{
            let id=w[0]._id
            console.log(w[0])
            workspaceitems.push(id);
             var i=0
             while (i!=2) {
                 let id1=id
               console.log("wje3a " +   id1)
                workspace.find({superior_id: id1})
                   .then((w1) => {
                      // superior_id = w1[0]._id
                        id1 = w1[0]._id
                       console.log("alam  " +id1)
                       console.log(i+   ' noumrou'+         id1)
                       workspaceitems.push(id1);
                       console.log(workspaceitems)

                   })
                 i++
             }
                res.json({success: true, workspaceitems});




        })





    */




/*
              const id = req.body.superior_id;
              const WorkspaceName=String(req.body.WorkspaceName);
              workspace.findOneAndDelete({WorkspaceName,superior_id:id})
                    .then((workspace)=>{
                        console.log(workspace)
                        let workspaceitems =[];
                        let workspaceitem={};
                        workspaceitem.WorkspaceName = workspace.WorkspaceName;
                        workspaceitem.description = workspace.description;
                        workspaceitems.push({...workspaceitem});

                        res.json({success: true, workspaceitems});
                    })



 */







}