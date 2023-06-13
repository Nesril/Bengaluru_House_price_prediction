const express=require("express")
const app=expess()

app.post("/testPredict",async(res,req)=>{
    let {value}=req.body
    console.log(value);
    res.status(200).send("sent")
})