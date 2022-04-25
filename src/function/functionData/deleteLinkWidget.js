
const data =require('../../model/data')

exports.deleteLinkWidget= (req, res,next) => {
    const {superior_id,idData,type,WidgetName}= req.body;
console.log('mrl')
    console.log(superior_id)
    console.log(idData)

    data.updateOne({_id:idData},{$pull:{usedIn:{superior_id,type,WidgetName}}})
        .then((dataSend)=>{

            if(dataSend.modifiedCount==1) {
                console.log('mrd5l5')

                console.log(dataSend)
                res.json({success: true,widget:{_id:idData}});
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


