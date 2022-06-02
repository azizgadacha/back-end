const workspace =require('../../model/workspace')
const Widget =require( '../../model/Widget');
const data =require( '../../model/data');


exports.editWidgetlink=(req, res) => {


    const { idData,newName,superiorID,type,WidgetName } = req.body;

workspace.findOne({_id:superiorID})
    .then((work)=>{
        if(work) {
            data.findOneAndUpdate({_id: idData, usedIn: {superiorID, type, WidgetName}}, {
                usedIn: {
                    superiorID,
                    type,
                    WidgetName: newName
                }
            }).then((dataUpdated) => {
                if (dataUpdated) {
                    let widgetupd = {
                        idData: idData,
                        WidgetName: newName,
                        sourceDB: true,
                        oldName: WidgetName,
                        type,
                        label: dataUpdated.label,
                        data: dataUpdated.data
                    }
                    res.json({success: true, widget: widgetupd})
                } else
                    res.json({success: false,})


            })
        }
        else
            res.json({success: false,msg:'Workspace No Longer Exist'})
    })



}