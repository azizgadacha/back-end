const express=require("express")
const app=express()
const routes=require("./router/routes")
const cors=require("cors")
const compression =require("compression")
const initPassport =require( './config/passport.js');
const passport =require('passport');

const  user =require("./model/user")
const  activeSession =require("./model/activeSession")

const  mongoose=require("mongoose")

mongoose.connect("mongodb+srv://azizgadacha:testtest1234@cluster0.m7cu6.mongodb.net/student?retryWrites=true&w=majority").then(
    ()=>{console.log("connectit")
        })


app.use(cors());
app.use(express.json());

const server = express();
server.use(compression());

app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.get("/hello",(req,res)=>{
    const User = new user({id:"id1",username:"salah",email:"mail",password:"sss",date:"12/12/1987"})

    User.save().then(()=> {
        console.log("sahasahbi")
        res.send("doliga")
    })

})
// Passport Config
initPassport(passport);
app.use(passport.initialize());
app.use("/api/users",routes)
app.listen(5000)