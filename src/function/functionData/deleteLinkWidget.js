
const data =require('../../model/data')

exports.deleteLinkWidget= (req, res,next) => {
    const {superiorID,idData,type,WidgetName}= req.body;




console.log('mrl')
    console.log("id data "+idData+" sup "+superiorID+" type: "+type+" name   "+WidgetName)
    console.log(idData)

    data.updateOne({_id:idData},{$pull:{usedIn:{superiorID,type,WidgetName}}})
        .then((dataSend)=>{

            if(dataSend.modifiedCount==1) {
                console.log('mrd5l5')

                console.log(dataSend)
                res.json({success: true,widget:{WidgetName,type}});
            }else {

                console.log('mrl5')
                res.json({success: false})
            }

        })
        .catch((e) =>{
            console.log('98mrd5l5')
            console.log(e)

            res.json({ success: false });
})}


