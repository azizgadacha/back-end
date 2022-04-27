
const data =require('../../model/data')

exports.deleteLinkWidget= (req, res,next) => {
    const {superiorID,idData,type,WidgetName}= req.body;





    data.updateOne({_id:idData},{$pull:{usedIn:{superiorID,type,WidgetName}}})
        .then((dataSend)=>{

            if(dataSend.modifiedCount==1) {

                res.json({success: true,widget:{WidgetName,type}});
            }else {

                res.json({success: false})
            }

        })
        .catch((e) =>{

            res.json({ success: false });
})}


