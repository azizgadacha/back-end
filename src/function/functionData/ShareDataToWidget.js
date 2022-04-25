const data =require('../../model/data')
const Widget=require('../../model/Widget')


exports.ShareDataToWidget= async (req, res,next) => {
    const {idData,superiorID,WidgetName,type,}= req.body;

console.log(idData)
console.log(superiorID)
    console.log(type)

    console.log('kkk')
    console.log(WidgetName)

Widget.findOne({superior_id:superiorID,WidgetName}).then((widgetGetit)=>{
    if(widgetGetit)
    {
        console.log('sehbi')
        console.log(widgetGetit)
        console.log(widgetGetit.widgetName)
        res.json({ success: false,msg:"widget with the same name already exist", WidgetExisite:true })

    }else
    {
        data.find({"usedIn.superiorID":superiorID,"usedIn.WidgetName":WidgetName }).then((datwidget)=>{
        if (datwidget.length>0){
            console.log(datwidget)
            console.log("rani nhawes len")
            res.json({ success: false,msg:"widget with the same name already exist", WidgetExisite:true })}
else{
                    console.log("rani nhawes len2.0")

            data.findOneAndUpdate({_id:idData},{$addToSet:{usedIn:{superiorID,type,WidgetName}}}).then(
                (dataupdated)=>{

                    console.log(dataupdated)
                    console.log('meigk')
                    console.log('meigk')

                    console.log(dataupdated.label)
                    console.log(dataupdated.data)

                    if(dataupdated)

                        res.json({ success: true ,widget:{idData:idData,title:WidgetName,type:type,label:dataupdated.label,data:dataupdated.data},WidgetExisite:false})
                    else
                    {            console.log('1meigk')

                        res.json({ success: false,msg:"internal problem please try later",WidgetExisite:false })}}
            )

                .catch(() => res.json({msg:"internal problem please try later", success: false,WidgetExisite:false }));


        }}
    )}





})


}
