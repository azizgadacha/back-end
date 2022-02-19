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
q
mongoose.connect("mongodb+srv://azizgadacha:testtest1234@cluster0.m7cu6.mongodb.net/student?retryWrites=true&w=majority").then(
    ()=>{console.log("connectit")
        })


app.use(cors());
app.use(express.json());

const server = express();
server.use(compression());

app.use(express.urlencoded({extended:true}))

app.use(express.json())
// Passport Config
initPassport(passport);
app.use(passport.initialize());
app.use("/api/users",routes)
app.listen(5000)