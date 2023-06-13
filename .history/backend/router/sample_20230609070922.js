const express=require("express")
const router=express.Router()

router.post("/testPredict",async(res,req)=>{
    let {text}=req.body
    console.log(text);
    res.status(200).send("sent")
})

module.exports=router