const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')
const Widget=require('../../model/Widget')
const workspace=require('../../model/workspace')
const data = require("../../model/data");

exports.addWidget=async (req,res)=>{





    const {superior_id,WidgetName,type,label,dataWidget} = req.body;
    let dataWidgetFinal=[]
for(let data of dataWidget){
    if(data==null)
    {
        dataWidgetFinal.push(0)

    }
    else
    dataWidgetFinal.push(data)

}

    workspace.findOne({_id:superior_id})
        .then((workspace)=>{
            console.log("eazeaea")
            console.log(workspace)
if(workspace){

            Widget.findOne({WidgetName,superior_id}).then((widget)=> {
                if (widget) {

                    res.json({success: false,WidgetExisite:true, msg: 'Widget already exists'});

                } else {


                    data.find({usedIn:{ $elemMatch : { superiorID:superior_id,WidgetName:WidgetName, type:{$in:["Rate", "Donuts","Bar"]}} }}).then((datwidget)=> {
                        if (datwidget.length > 0) {
console.log("salemmm")
console.log("rani lenaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
console.log(datwidget[0].usedIn)
console.log(datwidget)
                            res.json({
                                success: false,
                                msg: "widget with the same name already exist",
                                WidgetExisite: true
                            })
                        }
                        else{

                        const query = {
                            superior_id, WidgetName, type, label, dataWidget:dataWidgetFinal
                        };
                        Widget.create(query).then((newWidget) => {

                            res.json({
                                success: true,
                                widget: newWidget,
                                msg: 'The Widget was successfully created'
                            });
                        })
                            .catch(() => {
                                res.json({success: false, msg: 'The Widget not created'})

                            })
                    }}  ) }}
            )}

else{
    res.json({success: false, msg: "The workspace didn't excite "})



}

        })

        .catch(() => res.json({ success: false }));
}