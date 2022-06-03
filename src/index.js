const express=require("express")
const app=express()
const WorkspaceRoutes=require("./router/WorkspaceRoutes")
const WidgetRoutes=require("./router/WidgetRoutes")
const UserRoutes=require("./router/UserRoutes")
const ForgetRoutes=require("./router/ForgetRoutes")
const DataRoutes=require("./router/DataRoutes")
const NotificationRoutes=require("./router/NotificationRoutes")


const cors=require("cors")
const compression =require("compression")
const initPassport =require( './config/passport.js');
const connection=require( './db/DataBase');

const passport =require('passport');
const {lpm} = require("./config/lpm");

console.log("salut sava")

app.use(cors());

require("dotenv").config()
connection.Connection()
app.use(express.json());

app.use(compression());

app.use(express.urlencoded({extended:true}))
app.use(express.static('upload'))
app.use(express.json())
// Passport Config
initPassport(passport);
app.use(passport.initialize());
app.use("/api/Workspace",lpm,WorkspaceRoutes)
app.use("/api/Forget",lpm,ForgetRoutes)
app.use("/api/Notifcatin",lpm,NotificationRoutes)
app.use("/api/Widget",lpm,WidgetRoutes)
app.use("/api/Data",lpm,DataRoutes)
app.use("/api/User",lpm,UserRoutes)

let port=process.env.PORT||5000

const server=app.listen(port,()=>{
 console.log("im working")
})

let UserConnected=[]



function find(UserId,string)
{
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




function addUser(UserId,SocketId){
 let{exist,index}=find(UserId,"send adduser")



 if(exist) {
  UserConnected.splice(index,1)
  UserConnected.push({SocketId:SocketId,UserId})

 }else{
  UserConnected.push({SocketId:SocketId,UserId})
 }
}

function DeleteUser(SocketId){
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


const io=require('socket.io')(server,{
 cors:{
  origin:'*'
 }
})
io.on('connection',(socket)=>{


console.log('one user is connected '+socket.id)
 socket.on("add_User",(UserId)=>{
  addUser(UserId,socket.id)
 })

 socket.on("send_Notification",(data)=>{

  let{exist,index}=find(data.UserId,"send notif")

if(exist) {

 io.to(UserConnected[index].SocketId).emit("send_Notification_to_user", {notification: {user:data.User,notification:data.notification}})
console.log("salut sava")
}})

 socket.on("disconnect" ,()=>{
  DeleteUser(socket.id)
  console.log("good by")
  console.log(UserConnected)
 })
})
