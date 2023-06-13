const { log } = require("console");
const express=require("express")
const router=express.Router()
let spawn = require('child_process').spawn;
const User=require("../models/userModel")
let bcrypt=require("bcryptjs")
let jwt=require("jsonwebtoken")
require("dotenv").config()


let generalTokn=(id)=>{
  return jwt.sign({id}, process.env.JWT_TOKEN,{expiresIn:'30d'}
)
}

router.post("/register",async (req,res)=>{
  let {email,password}=req.body
  if(!email||!password) return res.status(401).send({success:false,msg:"please insert necessery information"})
  
  const user=await User.findOne({email:email})
  if(user) return res.status(401).send({success:false,msg:"email already registered"})
  
 const saltRounds = 10
 let salt = bcrypt.genSaltSync(saltRounds);
 let hashedPassword = bcrypt.hashSync(password, salt);
 password=hashedPassword

 let checkAcount=await User.findOne({email:email,isDeleted:true})
 if(checkAcount){
     await User.updateOne({_id:checkAcount._id},{$set:{isDeleted:false,isLogged:false,history:[],email:email,password:password}})
     account=await User.findOne({email:email})
     res.status(201).json({success:true,data:{account,token:generalTokn(account._id),msg:"Successfuly Regidtered!!!"}})//look at the network  

 } 
 else{
         let user=await User.create({email:email,password:password}) 
         if(user) res.status(201).json({success:true,data:{user,token:generalTokn(user._id),msg:"Successfuly Regidtered!!!"}})//look at the network  
        
         else res.status(500).json({error:true,msg:"invalid user data"})
 
  }


})

router.post("/logIn",async(req,res)=>{
  let {email,password}=req.body
  
  ////check user email
  let user=await User.findOne({email:email,isDeleted:false})
 // console.log(await bcrypt.compare(password,user.password));
  if(user&&(await bcrypt.compare(password,user.password))){
      await User.updateOne({_id:user._id},{$set:{isLogged:true}})
      let loggedUser=await User.findOne({email:email})
      res.status(200).json({success:true,msg:"successfully logged in",data:loggedUser,token:generalTokn(loggedUser._id)})
  }
  else{
      res.status(500).json({msg:"user data not found, Invalid credential"})
  }
})

router.put("/logOut/:userId",async(req,res)=>{
  let {userId}=req.params
  if(userId){
     let user =await User.findOne({_id:userId,isDeleted:false})
     if(user){
         await User.updateOne({_id:user._id},{$set:{isLogged:false}})
         res.status(200).json({success:true,msg:"successfully logged out"})
     }
     else res.status(401).send({msg:"user not found"})
  }
  else res.status(401).send({msg:"please enter id nuber"})
 })

router.put("/deleteAccount/:userId",async(req,res)=>{
  let {userId}=req.params
  if(userId){
     let user =await User.findOne({_id:userId,isDeleted:false})
     if(user){
         await User.updateOne({_id:user._id},{$set:{isDeleted:true,isLogged:false}})
         user =await User.findOne({_id:userId})
         console.log(user);
         res.status(200).json({success:true,msg:"successfully deleted"})
     }
     else req.status(401).send({msg:"user not found"})
  }
  else req.status(401).send({msg:"please enter id nuber"})
 })
 

//get logIn users
router.get("/logIn",async(req,res)=>{
  let Users=await User.find({isLogged:true})
  console.log(Users);
  if(Users){
      return   res.status(200).json({success:true,data:Users})
  }
  res.status(400).json({success:false,msg:"No, user Is logged In"})
})

router.post("/testPredict",async(req,res)=>{
    let  location="1st Phase JP Nagar"
    let area_type=2
    let sqft=1500
    let bath=2
    let balcony=2
    let bhk=2
    let data=""
    
    const process = spawn('python', ['backend/router/model.py', location,area_type,sqft,bath,balcony,bhk]);
    
    process.stdout.on('data', (data) => {
        data = data.toString();
        console.log(data);        
        
        try{
            let {value,text}=req.body
            console.log(value,text);
            res.status(200).send({data:data})

        }
        catch{
            console.log("error occured whiole romaining");
        }
      });

  process.on("close", (code, signal) =>
      console.log(`process closed: code ${code} and signal ${signal}`)
    );

   /*
      process.stderr.on('data', (data) => {
        console.log('err results: %j', data.toString('utf8'))
      });
   */

})


module.exports=router