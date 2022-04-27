
const Widget =require( '../../model/Widget');


exports.editWidgets=(req, res) => {
    const { idWidget,newName } = req.body;

    Widget.findOneAndUpdate({ _id: idWidget },{WidgetName:newName}).then((widget) => {
        if (widget){
widget.WidgetName=newName

            res.json({ success: true,widget })}
        else
            res.json({ success: false, })



    })


}