const express=require("express")
const router=express.Router()
#const model= require("../../model/predict_model")
router.post("/testPredict",async(req,res)=>{

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