const bcrypt=require('bcrypt');
const User =require( '../../model/user');
const Widget = require("../../model/Widget");
const workspace=require("../../model/workspace")

exports.deleteWidget=async (req, res) => {

    let {superior_id,WidgetName} = req.body;

    Widget.findOneAndDelete({WidgetName,superior_id})
        .then((widget)=>{

if (widget)
            res.json({success: true, widget});
else
    res.json({success: false,msg:"Widget didn't existe"});

        }).catch(()=>{

        res.json({success: false,msg:"Widget Already deleted"});

    })
}





