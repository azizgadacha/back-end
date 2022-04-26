
const Widget =require( '../../model/Widget');


exports.editWidgets=(req, res) => {
    const { idWidget,newName } = req.body;
    console.log("ddddd")

    console.log(newName)
    Widget.findOneAndUpdate({ _id: idWidget },{WidgetName:newName}).then((widget) => {
        if (widget){


            res.json({ success: true,widget })}
        else
            res.json({ success: false, })



    })


}