const express=require("express")
const app=express()
const routes=require("./router/routes")
const cors=require("cors")
const compression =require("compression")
const initPassport =require( './config/passport.js');
const passport =require('passport');
const  mongoose=require("mongoose")
const server = express();
require("dotenv").config()


mongoose.connect(process.env.mongodblink).then(
    ()=>{console.log("connectit")
        })


app.use(cors());
app.use(express.json());

app.use(compression());

app.use(express.urlencoded({extended:true}))

app.use(express.json())
// Passport Config
initPassport(passport);
app.use(passport.initialize());
app.use("/api/users",routes)
app.listen(5000)