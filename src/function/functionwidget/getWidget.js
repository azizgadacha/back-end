const workspace =require('../../model/workspace')

const Widget =require('../../model/Widget')

const data =require('../../model/data')
exports.getWidget= (req, res,next) => {
    const superior_id= String(req.body.superior_id);

    Widget.find({superior_id})
        .then((Widgetitems)=>{

            data.find({usedIn:superior_id}).then((widgetFromData,)=>{
                    console.log("mriglas")


                    res.json({success: true, Widgetitems:Widgetitems.concat(widgetFromData)});
                }
            )
        })
        .catch(() => res.json({ success: false }));
}


