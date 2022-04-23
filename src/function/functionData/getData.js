const data =require('../../model/data')


exports.getData= (req, res,next) => {

    data.find()
        .then((data)=>{
            console.log(data)
            res.json({success: true, data});





        })
        .catch(() => res.json({ success: false }));
}


