const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')
const Widget=require('../../model/Widget')
const workspace=require('../../model/workspace')
const data = require("../../model/data");

exports.addWidget=async (req,res)=>{





    const {superior_id,WidgetName,type,label,dataWidget} = req.body;

    workspace.find({superior_id})
        .then((workspace)=>{
if(workspace){

            Widget.findOne({WidgetName,superior_id}).then((widget)=> {
                if (widget) {

                    res.json({success: false, msg: 'Widget already exists'});

                } else {


                    data.find({"usedIn.superiorID":superiorID,"usedIn.WidgetName":WidgetName }).then((datwidget)=> {
                        if (datwidget.length > 0) {

                            res.json({
                                success: false,
                                msg: "widget with the same name already exist",
                                WidgetExisite: true
                            })
                        }

                        const query = {
                            superior_id, WidgetName, type, label, dataWidget
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
                    }  ) }}
            )}

else{
    res.json({success: false, msg: "The workspace didn't excite "})



}

        })

        .catch(() => res.json({ success: false }));
}