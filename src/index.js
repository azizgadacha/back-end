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
app.use("/ap2/PersoSpace",lpm,route2)
app.use("/api/users",lpm,routes)



const server=app.listen(5000,()=>{
 console.log("im working")
})
const io=require('socket.io')(server,{
 cors:{
  origin:'*'
 }
})
io.on('connection',(socket)=>{
 console.log('connected to server')
})

/*
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
const io=require('socket.io')(5000,{
 cors:{
  origin:'*'
 }
})
io.on('connection',(socket)=>{
 console.log('a user connected')
})

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
app.use("/ap2/PersoSpace",lpm,route2)
app.use("/api/users",lpm,routes)



app.listen(5000,()=>{
 console
})
*/




/*const express=require("express")
const app=express()
const routes=require("./router/routes")
const route2=require("./router/route2")


const cors=require("cors")
const compression =require("compression")
const initPassport =require( './config/passport.js');
const connection=require( './db/DataBase');

const passport =require('passport');
const {lpm} = require("./config/lpm");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
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
app.use("/ap2/PersoSpace",lpm,route2)
app.use("/api/users",lpm,routes)
io.on('connection', (socket) => {
 console.log('a user connected');
});


server.listen(5000,()=>{
 console.log('im workin')
})*/