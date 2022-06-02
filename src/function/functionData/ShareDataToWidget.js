const data =require('../../model/data')
const Widget=require('../../model/Widget')
const workspace =require('../../model/workspace')



exports.ShareDataToWidget= async (req, res,next) => {
    const {idData,superiorID,WidgetName,type,}= req.body;

workspace.findOne({_id:superiorID})
    .then((work)=>{
        if(work) {
            Widget.findOne({superior_id: superiorID, WidgetName}).then((widgetGetit) => {
                if (widgetGetit) {

                    res.json({success: false, msg: "widget already exist", WidgetExisite: true})

                } else {
                    data.find({usedIn:{ $elemMatch : { superiorID:superiorID,WidgetName:WidgetName, type:{$in:["Rate", "Donuts","Bar"]}} }}).then((datwidget)=> {
                            if (datwidget.length > 0) {

                                res.json({
                                    success: false,
                                    msg: "widget with the same name already exist",
                                    WidgetExisite: true
                                })
                            } else {

                                data.findOneAndUpdate({_id: idData}, {
                                    $addToSet: {
                                        usedIn: {
                                            superiorID,
                                            type,
                                            WidgetName
                                        }
                                    }
                                }).then(
                                    (dataupdated) => {


                                        if (dataupdated)

                                            res.json({
                                                success: true,
                                                widget: {
                                                    idData: idData,
                                                    WidgetName: WidgetName,
                                                    sourceDB: true,
                                                    type: type,
                                                    label: dataupdated.label,
                                                    data: dataupdated.data
                                                },
                                                WidgetExisite: false
                                            })
                                        else {

                                            res.json({
                                                success: false,
                                                msg: "internal problem please try later",
                                                WidgetExisite: false
                                            })
                                        }
                                    }
                                )

                                    .catch(() => res.json({
                                        msg: "internal problem please try later",
                                        success: false,
                                        WidgetExisite: false
                                    }));


                            }
                        }
                    )
                }


            })
        }
        else
            res.json({success: false, msg: "Workspace No Longer Exist"})
    })




}
