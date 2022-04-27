const express=require("express")
const app=express()
const routes=require("./router/routes")
const route2=require("./router/route2")


const cors=require("cors")
const compression =require("compression")
const initPassport =require( './config/passport.js');
const connection=require( './db/DataBase');

const passport =require('passport');
const {lpm} = require("./config/lpm");
//const {Server}=require('socket.io')
app.use(cors());
/*àconst io=new Server(app,{
 cors:{
  origin:"*"
 }

})*/
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
app.use("/ap2/PersoSpace",lpm,route2)
app.use("/api/users",lpm,routes)



app.listen(5000)