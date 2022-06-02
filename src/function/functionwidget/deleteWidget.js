const bcrypt=require('bcrypt');
const User =require( '../../model/user');
const Widget = require("../../model/Widget");
const workspace=require("../../model/workspace")

exports.deleteWidget=async (req, res) => {

    let {superiorID,WidgetName} = req.body;
workspace.findOne({_id:superiorID})
    .then((work)=>{
        if(work) {
            console.log("salut")
            console.log("salut")
            Widget.findOneAndDelete({WidgetName, superiorID})
                .then((widget) => {
                    console.log("salut")

                    if (widget) {
                    console.log('ssssssszezaeazeazezaezee')
                        res.json({success: true, widget});


                    }else
                        res.json({success: false, msg: "Widget didn't existe"});

                }).catch(() => {

                res.json({success: false, msg: "Widget Already deleted"});

            })
        }
        else
            res.json({success: false, msg: "Widget No Longer Exist"});

    })

}





