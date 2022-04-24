const data =require('../../model/data')
const Widget=require('../../model/Widget')


exports.ShareDataToWidget= async (req, res,next) => {
    const {idData}= req.body;
    const {superiorID}= req.body;
    const {WidgetName}=req.body
console.log(idData)
console.log(superiorID)
    console.log('kkk')
    console.log(WidgetName)

Widget.findOne({superior_id:superiorID,WidgetName}).then((widgetGetit)=>{
    if(widgetGetit)
    {
        console.log('sehbi')
        console.log(widgetGetit)
        console.log(widgetGetit.widgetName)
        res.json({ success: false,WidgetExisite:true })

    }else
    {
       data.findOneAndUpdate({_id:idData},{$addToSet:{usedIn:superiorID}}).then(
        (dataupdated)=>{
            console.log(dataupdated)
            console.log('meigk')
            if(dataupdated)
                res.json({ success: true ,dataupdated,WidgetExisite:false})
            else
            {            console.log('1meigk')

                res.json({ success: false,WidgetExisite:false })}}
    )

        .catch(() => res.json({ success: false,WidgetExisite:false }));
    }

})


}
