const workspace =require('../model/workspace')

const Widget =require('../model/Widget')

const activeSession =require('../model/activeSession')
exports.getwWidget= (req, res,next) => {
    const superior_id= String(req.body.superior_id);

    Widget.find({superior_id:superior_id})
        .then((Widgetitems)=>{

            res.json({success: true, Widgetitems});





        })
        .catch(() => res.json({ success: false }));
}


