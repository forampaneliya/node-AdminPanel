const mongoose=require("mongoose")
 const dbconnect=()=>{
    mongoose.connect("mongodb://localhost:27017/adminpanel")
    .then(()=>{
        console.log("db connected!!");
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
 }

 module.exports=dbconnect()