const express=require("express")
const router=express.Router()

router.post("/testPredict",async(res,req)=>{
    let {value}=req.body
    console.log(value);
    res.status(200).send("sent")
})

module.exports=router