const express=require("express")
const router=express.Router()
var spawn = require('child_process').spawn;
router.post("/testPredict",async(req,res)=>{
    const process = spawn('python', ['script.py', text]);
    try{
        let {value,text}=req.body
        console.log(value,text);
        res.status(200).send("sent")

    }
    catch{
        console.log("error occured whiole romaining");
    }
})

module.exports=router