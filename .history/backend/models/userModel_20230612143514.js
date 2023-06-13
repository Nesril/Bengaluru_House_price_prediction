const mongoose=require("mongoose")

let userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please provide unique email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    history: { 
        type: Array,
        default:[]
    },
    isDeleted:{
        type: Boolean,
        default:false
    }
},{
    timestamps:true
})



module.exports=mongoose.model("User",userSchema) 