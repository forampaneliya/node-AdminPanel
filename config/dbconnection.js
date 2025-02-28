const mongoose=require("mongoose")
 const dbconnect=()=>{
    mongoose.connect("mongodb+srv://forampaneliya1204:foram1204%40%23@cluster0.alafd.mongodb.net/Admin-panel")
    .then(()=>{
        console.log("db connected!!");
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
 }

 module.exports=dbconnect()