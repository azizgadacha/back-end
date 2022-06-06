find=async (UserId,string,UserConnected)=> {
    let exist=false
    let index=0
    console.log("sadik bil3id")

    for (let item of UserConnected){
        if (item.UserId==UserId)
        {
            exist=true

            break
        }else{
            index++
        }}
    console.log("sadik bil3id2")
console.log(exist)
console.log(index)
        return{ exist,index}
}

addUser=(UserId,SocketId,UserConnected)=> {


    let{exist,index}=find(UserId,"send adduser",UserConnected)



        if(exist) {
            UserConnected.splice(index,1)
            UserConnected.push({SocketId:SocketId,UserId})


        }else{
            UserConnected.push({SocketId:SocketId,UserId})
            console.log("chakib")

            console.log(UserConnected)

        }

}
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

