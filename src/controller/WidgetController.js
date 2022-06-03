const Workspace =require('../model/workspace');
const mongoose = require("mongoose");
const Widget = require("../model/Widget");
const data = require("../model/data");

//Add Widget
exports.addWidget=async (req,res)=>{
    const {superior_id,WidgetName,type,label,dataWidget} = req.body;
    let dataWidgetFinal=[]
    for(let data of dataWidget){
        if(data==null)
        {
            dataWidgetFinal.push(0)

        }
        else
            dataWidgetFinal.push(data)

    }

    Workspace.findOne({_id:superior_id})
        .then((workspace)=>{
            console.log("eazeaea")
            console.log(workspace)
            if(workspace){

                Widget.findOne({WidgetName,superior_id}).then((widget)=> {
                    if (widget) {

                        res.json({success: false,WidgetExisite:true, msg: 'Widget already exists'});

                    } else {


                        data.find({usedIn:{ $elemMatch : { superiorID:superior_id,WidgetName:WidgetName, type:{$in:["Rate", "Donuts","Bar"]}} }}).then((datwidget)=> {
                            if (datwidget.length > 0) {
                                console.log("salemmm")
                                console.log("rani lenaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                console.log(datwidget[0].usedIn)
                                console.log(datwidget)
                                res.json({
                                    success: false,
                                    msg: "widget with the same name already exist",
                                    WidgetExisite: true
                                })
                            }
                            else{

                                const query = {
                                    superior_id, WidgetName, type, label, dataWidget:dataWidgetFinal
                                };
                                Widget.create(query).then((newWidget) => {

                                    res.json({
                                        success: true,
                                        widget: newWidget,
                                        msg: 'The Widget was successfully created'
                                    });
                                })
                                    .catch(() => {
                                        res.json({success: false, msg: 'The Widget not created'})

                                    })
                            }}  ) }}
                )}

            else{
                res.json({success: false, msg: "The workspace didn't excite "})



            }

        })

        .catch(() => res.json({ success: false }));
}


//Delete Widget

exports.deleteWidget=async (req, res) => {

    let {superiorID,WidgetName} = req.body;
    Workspace.findOne({_id:superiorID})
        .then((work)=>{
            if(work) {
                console.log("salut")
                console.log("salut")
                Widget.findOneAndDelete({WidgetName, superiorID})
                    .then((widget) => {
                        console.log("salut")

                        if (widget) {
                            console.log('ssssssszezaeazeazezaezee')
                            res.json({success: true, widget});


                        }else
                            res.json({success: false, msg: "Widget didn't existe"});

                    }).catch(() => {

                    res.json({success: false, msg: "Widget Already deleted"});

                })
            }
            else
                res.json({success: false, msg: "Widget No Longer Exist"});

        })

}

//Edit Widget

exports.editWidgets=(req, res) => {
    const {superiorID, idWidget,newName } = req.body;
    Workspace.findOne({_id:superiorID})
        .then((work)=>{
            if(work){
                Widget.findOneAndUpdate({ _id: idWidget },{WidgetName:newName}).then((widget) => {
                    if (widget){
                        widget.WidgetName=newName

                        res.json({ success: true,widget })}
                    else
                        res.json({ success: false, })



                })
            }
            else
                res.json({ success: false,msg:"Widget No Longer Exist" })

        })



}

//get Widget


exports.getWidget= async (req, res, next) => {
    listeName = []
    let send
    console.log("salu3.0")
    console.log("salu3.0")

    let {clicked} = req.body
    console.log(clicked)


    const superior_id = String(req.body.superior_id);


    const senddata=()=>{





        Workspace.findOne({_id: mongoose.Types.ObjectId(list[list.length - 1])})
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
                                        let lastWorkspace = await Workspace.findOne({_id: mongoose.Types.ObjectId(list[list.length - 1])})
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
                let workspResult = await Workspace.findOne({_id: list[i]})
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


