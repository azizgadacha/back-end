const workspace =require('../../model/workspace')

const Widget =require('../../model/Widget')

const data =require('../../model/data')
exports.getWidget= (req, res,next) => {
    const superior_id= String(req.body.superior_id);
workspace.findOne({_id:superior_id})
    .then((work)=>{
        if(work) {
            Widget.find({superior_id})
                .then((Widgetitems) => {

                    data.find({"usedIn.superiorID": superior_id}).then((widgetFromData,) => {

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
                            res.json({success: true, Widgetitems: Widgetitems,workspace:{_id:work._id,WorkspaceName:work.WorkspaceName}});
                        }
                    )
                })
                .catch(() => res.json({success: false}));
        }
        else{
            res.json({success: false, InExistedWorksapce:true});
        }
    })

}


