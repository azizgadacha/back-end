const bcrypt=require('bcrypt');
const User =require( '../../model/user');
const Widget = require("../../model/Widget");
const notification=require("../../model/notification")

exports.deleteNo=async (req, res) => {



    notification.deleteMany()
        .then((notification)=>{

            if (notification)
                res.json({success: true, notification});
            else
                res.json({success: false,msg:"Widget didn't existe"});

        }).catch(()=>{

        res.json({success: false,msg:"Widget Already deleted"});

    })
}





