
const Widget =require( '../../model/Widget');
const data =require( '../../model/data');


exports.editWidgetlink=(req, res) => {
<<<<<<< HEAD
    const { idWidget,newName,superiorID,type,WidgetName } = req.body;

    data.findOneAndUpdate({ _id: idWidget ,usedIn:{superiorID,type,WidgetName}},{usedIn:{superiorID,type,newName}}).then((widget) => {
        if (widget){


            res.json({ success: true,wiget })}
=======
    const { idData,newName,superiorID,type,WidgetName } = req.body;

    data.findOneAndUpdate({ _id: idData ,usedIn:{superiorID,type,WidgetName}},{usedIn:{superiorID,type,WidgetName:newName}}).then((dataUpdated) => {
        if (dataUpdated){
         let widgetupd={idData:idData,WidgetName:newName,oldName:WidgetName,type,label:dataUpdated.label,data:dataUpdated.data}
            res.json({ success: true,widget:widgetupd})}
>>>>>>> edituw
        else
            res.json({ success: false, })



    })


}