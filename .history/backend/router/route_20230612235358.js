const { log } = require("console");
const express=require("express")
const router=express.Router()
let spawn = require('child_process').spawn;
const User=require("../models/userModel")
let bcrypt=require("bcryptjs")
const uuid=require("uuid")
let jwt=require("jsonwebtoken");
const { randomUUID } = require("crypto");
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
         let loggedOutUser=await User.findOne({_id:userId})
         res.status(200).json({success:true,msg:"successfully logged out",data:loggedOutUser,token:generalTokn(loggedOutUser._id)})
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

//get history of user
router.get("/getHistory/:userId",async(req,res)=>{
  let {userId}=req.params
  if(userId){
     let user =await User.findOne({_id:userId,isDeleted:false})
     if(user) res.status(200).json({success:true,data:user.history,msg:"history sent"})
    
     else req.status(401).send({msg:"user not found"})
  }
  else req.status(401).send({msg:"please enter id nuber"})
})

///insert histories
router.put("/makeHistory/:userId",async(req,res)=>{
  let {userId}=req.params
  let {History}=req.query
  if(userId){
     let user =await User.findOne({_id:userId,isDeleted:false})
     if(user){
         await User.updateOne({_id:user._id},{$push:{history:History}})
         user =await User.findOne({_id:userId})
         console.log(user);
         res.status(200).json({success:true,data:user.history})
      }
     else req.status(401).send({msg:"user not found"})
  }
  else req.status(401).send({msg:"please enter id nuber"})
 })


 ///delete all histories
router.put("/deleteHistory",async(req,res)=>{
  try{
    await User.updateOne({_id:user._id},{$set:{history:[]}})
    user =await User.findOne({_id:userId})
    console.log(user);
    res.status(200).json({success:true,data:user.history})

  }
  catch{
    res.status(500).send({error:true,msg:"Error occured while romaining"})
  }
})


 ///delete single histories

router.put("/deleteHistory/:userId",async(req,res)=>{
  let {userId}=req.params
  let {History}=req.query
  if(userId){
     let user =await User.findOne({_id:userId,isDeleted:false})
     if(user){
         await User.updateOne({_id:user._id},{$pull:{history:History}})
         user =await User.findOne({_id:userId})
         console.log(user);
         res.status(200).json({success:true,data:user.history})
      }
     else req.status(401).send({msg:"user not found"})
  }
  else req.status(401).send({msg:"please enter id nuber"})
 })


 

router.post("/makeHistory/:userId",async (req,res)=>{
    const {userId}=req.params
    const {area_type,balcony,bath,bhk,location,sqft}=req.body
    const date=Date.now()
    const process = spawn('python', ['backend/router/model.py', location,area_type,sqft,bath,balcony,bhk]);
     const user=await User.findById(userId)
     if(user){
        process.stdout.on('data', async (data) => {
            const value = data.toString();
            console.log(value);        
            
            try{
                let History={
                    data:{
                      area_type:area_type,
                      balcony:balcony,
                      bath:bath,
                      bhk:bhk,
                      location:location,
                      sqft:sqft
                    },
                    prediction:value,
                    date:date,
                    id:randomUUID()
                }
                await User.updateOne({_id:user._id},{$push:{history:History}})
                res.status(200).send({success:true,history:History,msg:"successfully predicted"})

            }
            catch{
                console.log("error occured whiole romaining");
            }
          });

          process.on("close", (code, signal) =>
          console.log(`process closed: code ${code} and signal ${signal}`)
          );     
     }
     else res.status(200).send({msg:"user not found"})

   /*
      process.stderr.on('data', (data) => {
        console.log('err results: %j', data.toString('utf8'))
      });
   */

})


module.exports=router