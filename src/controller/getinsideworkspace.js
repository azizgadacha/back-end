const workspace =require('../model/workspace')
const activeSession =require('../model/activeSession')
const  mongoose=require("mongoose")
exports.getinsideworkspace=  async (req, res, next) => {
    let  listeName=[]

    let senddata = async () => {
        if (exist) {
            console.log("barrrrrrrrrrrrrrrra ")
          let   workspaceitems = await workspace.find({superior_id: mongoose.Types.ObjectId(list[list.length - 1])})
            if (workspaceitems)


                res.json({success: true, workspaceitems,listeName});

            else
                res.json({success: false})
        } else {
            res.json({success: false})
        }

    }
    console.log('manidrouch')
    let {list} = req.body
    let {user_id} = req.body
    let {clicked} = req.body

    let exist = true
    let workres
    console.log("3asfour")
    console.log(list)
    console.log(list.length)
if (!clicked){
    for (let i = 0; i < list.length; i++) {
            console.log("lppmm")


            if (list[i].length == 24) {
                console.log("salemccccccc  " + i)
                console.log(mongoose.Types.ObjectId(list[i]))
                worksp = await workspace.findOne({_id: list[i]})

                console.log("rani gzez")
                if (!(worksp)) {
                    console.log("salem3")

                    exist = false;
break
                } else {
                    listeName.push(worksp.WorkspaceName)
                    if (i == 0) {
                        if (!(worksp.superior_id == user_id)) {
                            console.log("ran lina " + i)
                            console.log("salem2")
                            console.log(exist)

                            exist = false
break

                        } else {

                                console.log("ran lina " + i + " tnejil")
                                workres = worksp
                            }


                    } else {
                        console.log(workres)
                        console.log(worksp)
                        if (!(workres._id == worksp.superior_id)) {
                            console.log("ran lina " + i)
                            console.log("salem1")
                            console.log(mongoose.Types.ObjectId(list[i] - 1))
                            console.log(worksp.superior_id)
                            exist = false

break

                        } else {
                            console.log("ran lina " + i)
                            console.log("ran lina 21 " + i + "tnejil")


                            workres = worksp
                        }
                    }
                }
                console.log("eb3ed zahi ya  5ra")
            } else {

                console.log("samahni baba rani no5rom")
                exist = false
break
            }
        }}
    if(exist){
senddata()

    }
    else
    {
        res.json({success: false})

    }


    }

