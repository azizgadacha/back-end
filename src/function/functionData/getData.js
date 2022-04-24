const data =require('../../model/data')


exports.getData= (req, res,next) => {
let{superior_Id}=req.body
    data.find({usedIn:{$nin:[superior_Id]}})
        .then((data)=>{
            console.log(data)
            res.json({success: true, data});





        })
        .catch(() => res.json({ success: false }));
}


