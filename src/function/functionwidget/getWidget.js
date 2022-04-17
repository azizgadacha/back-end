const workspace =require('../../model/workspace')

const Widget =require('../../model/Widget')

const activeSession =require('../../model/activeSession')
exports.getWidget= (req, res,next) => {
    const superior_id= String(req.body.superior_id);

    Widget.find({superior_id})
        .then((Widgetitems)=>{
console.log("mriglas")
            res.json({success: true, Widgetitems});





        })
        .catch(() => res.json({ success: false }));
}


