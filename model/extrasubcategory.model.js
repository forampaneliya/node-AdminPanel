const mongoose=require("mongoose");

const ExtrasubCategorySchema=mongoose.Schema({
    extraSubCategoryName:String,
    categoryID:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    subCategoryID:{
        type:mongoose.Types.ObjectId,
        ref:"SubCategory"
    }

})

const ExtrasubCategory=mongoose.model("ExtrasubCategory",ExtrasubCategorySchema)
module.exports=ExtrasubCategory;