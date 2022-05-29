const workspace =require('../../model/workspace');


const  mongoose=require("mongoose")

exports.getinsideworkspace=  async (req, res, next) => {
    let {clicked} = req.body

   let listeName=[]
    let send
console.log("ena eli ne5dem")
    let senddata = async () => {
        if (exist) {
            let space = await workspace.find({_id: mongoose.Types.ObjectId(list[list.length - 1])})
            if (space.length!==0) {


                let workspaceitems = await workspace.find({superior_id: mongoose.Types.ObjectId(list[list.length - 1])})
                if (workspaceitems) {
                    console.log("ena eli mened5olub")

                    console.log(workspaceitems)
                    send = listeName
                    if (clicked) {
                        let lastWorkspace = await workspace.findOne({_id: mongoose.Types.ObjectId(list[list.length - 1])})
                        listeNameReceive.push([lastWorkspace.WorkspaceName, lastWorkspace._id])
                        send = listeNameReceive
                    }
                    res.json({success: true, workspaceitems, listeName: send});
                } else
                {if(clicked==true){
                    res.json({success: false})

                }else

                    res.json({success: false,invalidLink:true})
            }}
            else
                res.json({success: false})
        }



        else {
            res.json({success: false})
        }

    }
    let {list} = req.body
    let {user_id,locVis} = req.body
    let listeNameReceive=req.body.listeNameReceive
    let exist = true
    let workres

if (clicked===false){
    for (let i = 0; i < list.length; i++) {
            if (list[i].length == 24) {
                worksp = await workspace.findOne({_id: list[i]})
                if (!(worksp)) {
                    exist = false;
break
                } else {


                    if (i == 0) {
                    if(locVis)   {
                        console.log("rani lina bb")
                        console.log([worksp.WorkspaceName,worksp._id])
                        listeName.push([worksp.WorkspaceName,worksp._id])
                        workres = worksp
                    } else {

                        if (!(worksp.superior_id == user_id)) {

                            exist = false
break
                        } else {
                            listeName.push([worksp.WorkspaceName,worksp._id])
                                workres = worksp
                            }}
                    } else {
                        if (!(workres._id == worksp.superior_id)) {
                            exist = false
break
                        } else {
                            listeName.push([worksp.WorkspaceName,worksp._id])

                            workres = worksp
                        }
                    }
                }
            } else {
                exist = false
break
            }
        }}
    if(exist){
senddata()
    }
    else
    {
        res.json({success: false,invalidLink:true})
    }
    }

