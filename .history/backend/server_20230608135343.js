let express=require("express")
let app=express()
let connectDB=require("./database/db")
let bodyParser = require('body-parser');\
/*
let router=require("./router/route")
let post=require("./router/postUser")
let Chat=require("./router/chatRoute")
let Message=require("./router/messageRoute")
*/
const cors = require('cors')
require("dotenv").config()

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
  });

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
/**
 app.use("/bullo/userApi",router)
app.use("/bullo/posetApi",post)
app.use("/bullo/ChatApi",Chat)
app.use("/bullo/MessageApi",Message) */

let start=async(req,res)=>{
    try{
        app.listen(process.env.PORT,(req,res)=>{
            console.log(`server connected to port ${process.env.PORT}`);
        })
        await connectDB()
      }
    catch(error){
        console.log(error);
    }
}
/**let id1 ="new ObjectId(12356)"
let id2 ="new ObjectId(12356)"
function checkIfIdIsEqual(id1,id2){
    let s1=id1.split(" ")
    let s2=id2.split(" ")

    let splitedId1=s1[1].split("(")
    splitedId1=splitedId1[1].split(")")

    let splitedId2=s2[1].split("(")
    splitedId2=splitedId2[1].split(")")

    console.log(splitedId1[0],splitedId2[0]);

    return splitedId1[0]===splitedId2[0]
}
console.log(checkIfIdIsEqual(id1,id2));*/
start()

/***
 *  let {username,profilePicture}=await User.findOne({username:username})
            await Post.updateOne({username:username},{$set:{desc:desc||"",img:img||""}},{$push:{likes:{username,profilePicture}}})         
            let findUpdatePost=await Post.findOne({username:username})
            res.status(200).json({success:true,data:findUpdatePost})


             if(likes) 
              {
                    let userWhoLikesForYou=await User.findOne({username:likes})
                    if (userWhoLikesForYou) 
                       {
                        let {username,profilePicture}=userWhoLikesForYou
                        await Post.updateOne({username:username},{$set:{desc:desc||"",img:img||""}},{$push:{likes:{username,profilePicture}}})
                       }
                    else await Post.updateOne({username:username},{$set:{desc:desc||"",img:img||""}},{$push:{likes:"Unregistered user"}})
                } 
            else await Post.updateOne({username:username},{$set:req.body})

           let findUpdatePost=await Post.findOne({username:username})
           res.status(200).json({success:true,data:findUpdatePost})
 */