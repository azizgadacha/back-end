const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
exports.getworkspace= (req, res,next) => {

    let {list} = req.body
    let exist = true
    for (let elem of list) {

        workspace.findOne({_id: elem})
            .then((worksp) => {

                    if (!(worksp)) {

                        exist = false
                        res.json({success: false,Valid:false});

                        break;

                    } else {
                        if (worksp._id = list[i]) {

                            workspace.find({superior_id:superior_id})
                                .then((workspaceitems)=>{

                                    res.json({success: true, workspaceitems});

                                })
                                .catch(() => res.json({ success: false }));






                        }


                    }

                }
            )
    }


}





