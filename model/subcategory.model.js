const mongoose=require("mongoose");

const subCategorySchema=mongoose.Schema({
    subCategoryName:String,
    categoryID:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
        }
    
})
const SubCategory=mongoose.model("SubCategory",subCategorySchema)

module.exports=SubCategory