const Workspace =require('../model/workspace');
const User =require( '../model/user');
const notification = require("../model/notification");
const Joi = require('joi');
const mongoose = require("mongoose");


//Add inside Workspace

exports.addinsideworkspace=async (req,res)=>{
    const {superior_id,WorkspaceName,description} = req.body;
    Workspace.find({_id:superior_id})
        .then((W2)=>{
            console.log("haw fibeli")
            console.log(W2)
            console.log(W2[0].superior_id)
            if(W2.length!=0){
                const query={
                    superior_id:superior_id,
                    WorkspaceName,
                    description,
                };
                Workspace.findOne({WorkspaceName,superior_id:superior_id}).then((w1)=> {
                    if (w1) {
                        res.json({success: false, msg: 'Workspace already exists'});
                    } else {
                        Workspace.create(query).then((w) => {
                            res.json({
                                success: true,
                                WorkspaceID: w._id,
                                msg: 'The Workspace was successfully created'
                            });
                        })
                            .catch(() => {
                                res.json({success: false, msg: 'The workspace not created'})
                            })
                    }
                })
            }
            else{
                res.json({success: false, msg: 'The Workspace No Longer Exist'})
            }})
        .catch(() => res.json({ success: false }));
}

//Add Workspace

exports.addworkspace=async (req,res)=>{
    verif={WorkspaceName:req.body.WorkspaceName,description: req.body.description,token:req.body.token}
    const userSchema = Joi.object().keys({
        WorkspaceName: Joi.string().allow(" ") .min(4).max(13)
            .optional().required(),
        description: Joi.string().allow(" ") .min(4).max(25)
            .optional().required(),
        token:Joi.string().required(),
    });
    const result = userSchema.validate(verif);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    const {superior_id,WorkspaceName,description} = req.body;
    User.find({_id:superior_id})
        .then((users)=>{
            const query={
                superior_id:superior_id,
                WorkspaceName,
                description
            };
            Workspace.findOne({WorkspaceName,superior_id:superior_id}).then((w1)=> {
                if (w1) {
                    res.json({success: false, msg: 'Workspace already exists'});
                } else {
                    Workspace.create(query).then((w) => {
                        res.json({
                            success: true,
                            WorkspaceID: w._id,
                            msg: 'The Workspace was successfully created'
                        });
                    })
                        .catch(() => {
                            res.json({success: false, msg: 'The workspace not created'})
                        })
                }
            })
        })
        .catch(() => res.json({ success: false }));
}

//Delete Workspace

exports.deleteworkspace=  async (req, res,next) => {
    var id = req.body.superior_id;
    const user_id=req.body.user_id
    const visualisation = req.body.visualise;
    var descendants = []
    var workspaceitems = []
    var stack = [];
    descendants.push(id)
    let validation = true
    User.findOne({_id: user_id}).then(async (user) => {
        if ((visualisation === true) && (user.role != "administrateur"))
            validation = false
        if (validation) {
            var item = await Workspace.findOne({_id: id});
            if (item != null) {
                stack.push(item);
                workspaceitems.push(item)
                while (stack.length > 0) {
                    var currentnode = stack.pop();
                    var children = await Workspace.find({superior_id: currentnode._id});
                    children.forEach(function (child) {
                        descendants.push(child._id);
                        workspaceitems.push(child)
                        stack.push(child);
                    });
                }
                descendants.join(",")
                for (item of descendants) {
                    await Workspace.findByIdAndRemove(item.toString())
                    let ListNotification = await notification.find({idNotified: item._id})
                    for (let notif of ListNotification) {
                        await notification.deleteOne({idNotified: notif.idNotified})
                    }
                }
                res.json({success: true, workspaceitems})
            } else
                res.json({success: false,})
        }
        else
        {
            user.password=undefined

            res.json({success:false,user,adminstratorProblem:true ,msg: 'you are no longer an administrator'});
        }
    })
}

//Edit Workspace

exports.editworkspace=async (req,res)=>{

    verif={WorkspaceName:req.body.WorkspaceName,description: req.body.description,token:req.body.token}
    const userSchema = Joi.object().keys({
        WorkspaceName: Joi.string().allow(" ") .min(4).max(13)
            .optional().required(),
        description: Joi.string().allow(" ") .min(4).max(25)
            .optional().required(),
        token:Joi.string().required(),
    });
    const result = userSchema.validate(verif);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }
    console.log(req.body)
    const cardId= String(req.body.card_id);
    const workspaceName= String(req.body.WorkspaceName);
    const Description=String(req.body.description);
    const visualisation=req.body.visualise;
    const user_id=req.body.user_id
    let validation=true
    User.findOne({_id:user_id}).then((user)=>{
        if((visualisation===true)&&(user.role!="administrateur"))
            validation=false
        if(validation){
            Workspace.findOneAndUpdate({_id:cardId},{WorkspaceName:workspaceName,description:Description})
                .then((workspaceitems)=>{
                    if(workspaceitems!=null) {
                        Workspace.findOne({_id: cardId}).then((w) => {
                            res.json({success: true, w})
                            console.log("eZEBIIIII")
                        })
                    }
                    else
                        res.json({success:false, msg: 'The Workspace not successfully Edited'});
                })}
        else
        {
            user.password=undefined
            res.json({success:false,user,adminstratorProblem:true ,msg: 'you are no longer an administrator'});
        }
    })
}

//Get inside Workspace Workspace

exports.getinsideworkspace=  async (req, res, next) => {
    let {clicked} = req.body
    let listeName=[]
    let send
    console.log("ena eli ne5dem")
    let senddata = async () => {
        if (exist) {
            let space = await Workspace.find({_id: mongoose.Types.ObjectId(list[list.length - 1])})
            if (space.length!==0) {
                let workspaceitems = await Workspace.find({superior_id: mongoose.Types.ObjectId(list[list.length - 1])})
                if (workspaceitems) {
                    console.log("ena eli mened5olub")
                    console.log(workspaceitems)
                    send = listeName
                    if (clicked) {
                        let lastWorkspace = await Workspace.findOne({_id: mongoose.Types.ObjectId(list[list.length - 1])})
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
                worksp = await Workspace.findOne({_id: list[i]})
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

//Get Shared Workspace

exports.getSharedWorkspace=  async (req, res,next) => {
    var  id = req.body.user_id;
    var workspaceitems=[]
    var item =await Workspace.find({});
    for(let item1 of item){
        for(let i of item1.Share) {
            if (id === i.sharedWith) {
                await User.findOne({_id:i.sharedPerson})
                    .then((user)=>{
                        console.log(user)
                        workspaceitems.push([item1,user.username])
                    })
            }
        }
    }
    res.json({success: true, workspaceitems})
}

//Get Workspace Workspace

exports.getworkspace= (req, res,next) => {
    const superior_id= String(req.body.superior_id);
    Workspace.find({superior_id:superior_id})
        .then((workspaceitems)=>{
            res.json({success: true, workspaceitems,listeName:[]});
        })
        .catch(() => res.json({ success: false }));
}

//Remove Workspace Share

exports.removeShare= async (req, res,next) => {
    const cardId = String(req.body.card_id);
    const userId = String(req.body.user_id);
    const owner_id=String(req.body.owner_id)
    const visualisation = req.body.visualise;
    // let ch=[userId,UserName]
    var alam=[]
    var test=[]
    let validation = true
    User.findOne({_id:owner_id}).then(async (user) => {
        if ((visualisation === true) && (user.role != "administrateur"))
            validation = false
        if(validation) {
            await Workspace.findOne({_id: cardId})
                .then((workspaceitems) => {
                    for (let item of workspaceitems.Share) {
                        if (item.sharedWith != userId) {
                            alam.push(item)
                        }
                        test.push(item.sharedWith)
                    }
                    console.log(workspaceitems.Share.sharedWith)
                })
            console.log("alam")
            console.log(test)
            if (test.includes(userId)) {
                Workspace.findOneAndUpdate({_id: cardId}, {Share: alam})
                    .then((work) => {
                        Workspace.findOne({_id: cardId}).then((w) => {
                            console.log('salam')
                            console.log('salam')
                            console.log('salam')
                            console.log(w)

                            res.json({success: true, w})
                        })
                    })
                    .catch(() => res.json({success: false}));
            } else {
                res.json({success: false})
            }
        }else{
            user.password=undefined
            res.json({success:false,user,adminstratorProblem:true ,msg: 'you are no longer an administrator'});
        }
    })
}

//Remove Workspace Share

exports.shareWorkspace= async (req, res,next) => {
    const cardId = String(req.body.card_id);
    const userId = String(req.body.user_id);
    const withShared = String(req.body.withShared);
    const visualisation = req.body.visualise;
    console.log(req.body)
    let NewChare = {sharedWith:withShared,sharedPerson:userId}
    let validation = true
    User.findOne({_id: userId}).then(async (user) => {
        if ((visualisation === true) && (user.role != "administrateur"))
            validation = false
        if (validation) {
            var item = await Workspace.findOne({_id: cardId});
            var list = [];
            for (let i of item.Share) {
                list.push(i.sharedWith)
            }
            console.log(list)
            if (list.includes(withShared)) {
                console.log("rani lina les amis ")
                res.json({success: false})
            } else {
                console.log("rani lina les amis2.0 ")
                Workspace.findOneAndUpdate({_id: cardId}, {$addToSet: {Share: NewChare}})
                    .then((workspaceitems) => {
                        console.log("im here1")
                        console.log("im here1")
                        Workspace.findOne({_id: cardId}).then((item) => {
                            console.log("im here2")
                            notification.create({
                                receiver: withShared,
                                sender: userId,
                                type: "shared",
                                read: false,
                                text: ` has shared ${workspaceitems.WorkspaceName} with you`
                            }).then((notification) => {
                                console.log("im here")
                                res.json({success: true, workspace: item, notification})
                            })
                        })
                    })
                    .catch((e) => {
                        console.log("im here3")
                        console.log(e)
                        res.json({success: false})
                    });
            }
        } else {
            user.password = undefined
            res.json({success: false, user, adminstratorProblem: true, msg: 'you are no longer an administrator'});
        }
    })
}

//See all WorkspaceWorkspace Share

exports.visualizationOfWorkspaces=  async (req, res,next) => {
    const superior_id= String(req.body.user_id);
    var ListUsers =await User.find({});
    var workspaceitems=[]
    console.log(ListUsers)
    for(let item of ListUsers){
        let ListeWorkspace=[]
        if(item._id!=superior_id) {
            let items = await Workspace.find({superior_id: item._id})
            if(items!=null) {
                for (let x of items) {
                    console.log(x)
                    workspaceitems.push([x,item._id,item.username])                }
            }
        }
    }
    res.json({success: true, workspaceitems,listeName:[]})
}







