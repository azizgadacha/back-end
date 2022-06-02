const workspace =require('../../model/workspace')

const Widget =require('../../model/Widget')

const data =require('../../model/data')
const mongoose = require("mongoose");
exports.getWidget= async (req, res, next) => {
    listeName = []
    let send
    console.log("salu3.0")
    console.log("salu3.0")

    let {clicked} = req.body
    console.log(clicked)


    const superior_id = String(req.body.superior_id);


    const senddata=()=>{





    workspace.findOne({_id: mongoose.Types.ObjectId(list[list.length - 1])})
        .then((work) => {
            if (work) {
                Widget.find({superior_id:mongoose.Types.ObjectId(list[list.length - 1])})
                    .then((Widgetitems) => {

                        data.find({"usedIn.superiorID": mongoose.Types.ObjectId(list[list.length - 1])}).then(async (widgetFromData,) => {

                                console.log("mriglas")
                                console.log(widgetFromData)


                                for (let item of widgetFromData) {
                                    for (let item2 of item.usedIn) {
                                        if (item2.superiorID == superior_id)
                                            Widgetitems.push({
                                                idData: item._id,
                                                WidgetName: item2.WidgetName,
                                                type: item2.type,
                                                sourceDB: true,
                                                label: item.label,
                                                data: item.data
                                            })
                                    }
                                }
                                send = listeName
                                send = listeName
                                if (clicked) {
                                    let lastWorkspace = await workspace.findOne({_id: mongoose.Types.ObjectId(list[list.length - 1])})
                                    listeNameReceive.push([lastWorkspace.WorkspaceName, lastWorkspace._id])
                                    send = listeNameReceive
                                }
                                res.json({
                                    listeName: send,
                                    success: true,
                                    Widgetitems: Widgetitems,
                                    workspace: {_id: work._id, WorkspaceName: work.WorkspaceName}
                                });
                            }
                        )
                    })
                    .catch(() => res.json({success: false}));
            } else {

                if(clicked===true)

                res.json({success: false, InExistedWorksapce: true});
                else
                    res.json({success: false, invalidLink: true});

            }
        })}


    let {list} = req.body
    let {user_id, locVis} = req.body

    console.log("salu2")
    console.log(req.body.listeNameReceive)
    console.log("salu2.0")

    console.log(req.body)



    let listeNameReceive = req.body.listeNameReceive
    let exist = true
    let previousWorkspace=null
    console.log("salu2ssssssssssssssssssssss.0")

    console.log(listeNameReceive)
    if (clicked==false) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].length == 24) {
                let workspResult = await workspace.findOne({_id: list[i]})
                if (!(workspResult)) {
                    exist = false;
                    break
                } else {


                    if (i == 0) {
                        if (locVis) {
                            console.log("rani lina bb")
                            console.log([workspResult.WorkspaceName, workspResult._id])
                            listeName.push([workspResult.WorkspaceName, workspResult._id])
                            previousWorkspace = workspResult
                        } else {

                            if (!(workspResult.superior_id == user_id)) {

                                exist = false
                                break
                            } else {
                                listeName.push([workspResult.WorkspaceName, workspResult._id])
                                previousWorkspace = workspResult
                            }
                        }
                    } else {
                        if (!(previousWorkspace._id == workspResult.superior_id)) {
                            exist = false
                            break
                        } else {
                            listeName.push([workspResult.WorkspaceName, workspResult._id])

                            previousWorkspace = workspResult
                        }
                    }
                }
            } else {
                exist = false
                break
            }
        }
    }
    if (exist) {
        senddata()
        console.log("dz")
    } else {
        console.log("dz1")

        res.json({success: false,invalidLink:true})
    }
}