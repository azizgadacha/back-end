
//find user  to Socket table

find= (UserId,UserConnected)=> {
    let exist=false
    let index=0

    for (let item of UserConnected){
        if (item.UserId==UserId)
        {
            exist=true

            break
        }else{
            index++
        }}
   
        return{ exist,index}
}
//add user to Socket table

addUser=(UserId,SocketId,UserConnected)=> {


    let{exist,index}=find(UserId,UserConnected)



        if(exist) {
            UserConnected.splice(index,1)
            UserConnected.push({SocketId:SocketId,UserId})


        }else{
            UserConnected.push({SocketId:SocketId,UserId})
           
        }

}
//Delete User Connextion from  Socket table

DeleteUser=(SocketId,UserConnected)=>{
    let index=0
    for (let item of UserConnected){
        if (item.SocketId==SocketId)
        {
            break
        }else{
            index++
        }}
    UserConnected.splice(index,1)
}


module.exports = {find, DeleteUser,addUser }

