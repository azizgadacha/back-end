
const Widget =require( '../../model/Widget');
const data =require( '../../model/data');


exports.editWidgetlink=(req, res) => {
    const { idWidget,newName,superiorID,type,WidgetName } = req.body;

    data.findOneAndUpdate({ _id: idWidget ,usedIn:{superiorID,type,WidgetName}},{usedIn:{superiorID,type,newName}}).then((widget) => {
        if (widget){


            res.json({ success: true,wiget })}
        else
            res.json({ success: false, })



    })


}