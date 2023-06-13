let express=require("express")
let app=express()
let bodyParser = require('body-parser');
let router=require("./router/route.js")

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
app.use("/predict",router)

/**
let start=async(req,res)=>{
    try{
  
        await connectDB()
      }
    catch(error){
        console.log(error);
    }
}
*/

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server connected to port ${process.env.PORT}`);
})
