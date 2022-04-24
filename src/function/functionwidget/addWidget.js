const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')
const Widget=require('../../model/Widget')
const workspace=require('../../model/workspace')

exports.addWidget=async (req,res)=>{

    console.log("mrigla sahbi1.0")




    const {superior_id,WidgetName,type,label,dataWidget} = req.body;

    workspace.find({superior_id})
        .then((workspace)=>{
if(workspace){

            Widget.findOne({WidgetName,superior_id}).then((widget)=> {
                if (widget) {
                    console.log(widget)
                    console.log(WidgetName)

                    res.json({success: false, msg: 'Widget already exists'});
                    console.log("mrigla sahbi5.0")

                } else {
                    const query={
                        superior_id,WidgetName,type,label,dataWidget
                    };
                    Widget.create(query).then((newWidget) => {

console.log("mrigla sahbi")
                        res.json({
                            success: true,
                            widget:newWidget,
                            msg: 'The Widget was successfully created'
                        });
                    })
                        .catch(() => {
                            res.json({success: false, msg: 'The Widget not created'})
                            console.log("mrigla sahbi3.0")

                        })
                }
            })}

else{
    res.json({success: false, msg: "The workspace didn't excite "})
    console.log("mrigla sahbi3.0")



}

        })

        .catch(() => res.json({ success: false }));
}