const workspace =require('../../model/workspace')
const data =require('../../model/data')

exports.deleteLinkWidget= (req, res,next) => {
    console.log("nemchis")
    const {superiorID,idData,type,WidgetName}= req.body;
workspace.findOne({_id:superiorID})
    .then((work)=>{
if(work) {
    data.updateOne({_id: idData}, {$pull: {usedIn: {superiorID, type, WidgetName}}})
        .then((dataSend) => {

            if (dataSend.modifiedCount == 1) {

                res.json({success: true, widget: {WidgetName, type}});
            } else {

                res.json({success: false})
            }

        })
        .catch((e) => {


            res.json({success: false});
        })
}else
    res.json({success: false,msg:"Widget No Longer Exist"});
    })
        }



