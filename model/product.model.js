const mongoose=require("mongoose")
const path=require("path")
const multer=require("multer")

const productSchema=mongoose.Schema({
    productName:String,
    productImage:String,
    categoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    subCategoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCategory"
    },
    extraSubCategoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ExtrasubCategory"
    },
    productPrice:Number,
    productDescription:String,
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..","uploads/product"))
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.fieldname}_${Date.now()}`)
    }
})

productSchema.statics.uploadImage=multer({storage:storage}).single('productImage')

const Product=mongoose.model("Product",productSchema)
module.exports=Product;