
const Widget =require( '../../model/Widget');
const data =require( '../../model/data');


exports.editWidgetlink=(req, res) => {
console.log("salem")

    const { idData,newName,superiorID,type,WidgetName } = req.body;
    let  mg={ idData,newName,superiorID,type,WidgetName }
    console.log(mg)

    data.findOneAndUpdate({ _id: idData ,usedIn:{superiorID,type,WidgetName}},{usedIn:{superiorID,type,WidgetName:newName}}).then((dataUpdated) => {
        if (dataUpdated){
         let widgetupd={idData:idData,WidgetName:newName,sourceDB:true,oldName:WidgetName,type,label:dataUpdated.label,data:dataUpdated.data}
            res.json({ success: true,widget:widgetupd})}
        else
            res.json({ success: false, })



    })


}