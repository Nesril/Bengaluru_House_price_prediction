const { log } = require("console");
const express=require("express")
const router=express.Router()
var spawn = require('child_process').spawn;
router.post("/testPredict",async(req,res)=>{
    let  location="1st Phase JP Nagar"
    let area_type=2
    let sqft=1500
    let bath=2
    let balcony=2
    let bhk=2
    const process = spawn('python', ['model.py', location,area_type,sqft,bath,balcony,bhk]);
    
    process.stdout.on('data', (data) => {
        test = data.toString();
      });

    process.on("close", (code, signal) =>
      console.log(`process closed: code ${code} and signal ${signal}`)
    );

    process.stderr.on('data', (data) => {
        console.log('err results: %j', data.toString('utf8'))
      });

    process.stdout.on('end', function(){
        console.log('Test Data', test);
    });
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