const mongoose=require("mongoose");
const path=require("path");
const multer=require("multer")

const categorySchema=mongoose.Schema({
    categoryName:String,
    categoryImage:String
});

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..","uploads/category"))
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.fieldname}_${Date.now()}`)
    }
})
categorySchema.statics.uploadImage=multer({storage:storage}).single('categoryImage')

const Category=mongoose.model("Category",categorySchema)

module.exports=Category;