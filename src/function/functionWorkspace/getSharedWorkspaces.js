
const workspace =require('../../model/workspace');
const Joi = require('joi');
const User =require( '../../model/user');
const activeSession =require('../../model/activeSession')

exports.getSharedWorkspace=  async (req, res,next) => {
    var  id = req.body.user_id;
    var workspaceitems=[]
    var item =await workspace.find({});
    for(let item1 of item){
        for(let i of item1.Share) {
            if (id === i.sharedWith) {
                await User.findOne({_id:isharedPerson})
                    .then((user)=>{
                        workspaceitems.push([item1,user.username])
                    })

            }
        }
    }
    res.json({success: true, workspaceitems})
}