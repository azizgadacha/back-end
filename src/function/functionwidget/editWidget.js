
const Widget =require( '../../model/Widget');
const workspace=require('../../model/workspace')

exports.editWidgets=(req, res) => {
    const {superiorID, idWidget,newName } = req.body;
workspace.findOne({_id:superiorID})
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