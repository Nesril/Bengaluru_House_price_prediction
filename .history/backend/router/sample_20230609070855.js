const express=require("express")
const router=express.Router()

router.post("/testPredict",async(res,req)=>{
    let {value,text}=req.body
    console.log(value,text);
    res.status(200).send("sent")
})

module.exports=router