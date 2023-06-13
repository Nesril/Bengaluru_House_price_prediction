let mongoose=require("mongoose")
require("dotenv").config()

let connectDb=()=>{
    mongoose.set({"strictQuery":true})
    mongoose
     .connect(process.env.DB_URL)
     .then(()=>console.log("Connected to Database"))
     .catch(error=>console.log("Failed to connect database",error))

 }
 module.exports={
    connectToDb:connectDb,
}   