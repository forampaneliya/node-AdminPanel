const express=require("express")
const Productroutes=express.Router()
const Product=require("../model/product.model")
const Admin=require("../model/admin.model")
const Category=require("../model/category.model")
const SubCategory=require("../model/subcategory.model")
const ExtrasubCategory=require("../model/extrasubcategory.model")
const path=require("path")
const fs=require("fs")

Productroutes.get("/",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let record=await Product.find({}).populate('categoryID').populate('subCategoryID').populate('extraSubCategoryID')
    // console.log(record,"==================================");
    
    res.render("products/view_product",{loginAdmin,products:record})
})

Productroutes.get("/addproduct",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let categories=await Category.find({})
    let subcategories=await SubCategory.find({})
    let extrasubcategories=await ExtrasubCategory.find({})
    res.render("products/add_product",{loginAdmin,categories,subcategories,extrasubcategories})
})

Productroutes.post("/addproduct",Product.uploadImage,async(req,res)=>{
      let imagepath="";
      if(req.file)
      {
          imagepath=`/uploads/product/${req.file.filename}`
      }
      req.body.productImage=imagepath;
      let newRecord=await Product.create(req.body)
      console.log(newRecord);
      
      if(newRecord)
      {
        console.log("record add sucessfully");
        return res.redirect("back")
        
      }
      else{
        console.log("something wrong");
        return res.redirect("back")
      }
})


Productroutes.get("/deleteProduct/:id",async(req,res)=>{
    let record=await Product.findById(req.params.id)
    if(record)
    {
        if(record.productImage)
        {
            let imagepath=path.join(__dirname,"..",record.productImage)
            fs.unlinkSync(imagepath)

        }
        await Product.findByIdAndDelete(record)
        console.log("record delete sucess");
        return res.redirect("back")
    }
    else{
        console.log("something wrong");
        return res.redirect("back")
    }

})
Productroutes.get("/getsubcategoies/:id",async(req,res)=>{
    // let category=await Category.findById(req.query.categoryID)
    let category = await Category.findById(req.params.id)
    // console.log(category,"===========category========");
    
    let subcategories = await SubCategory.find({categoryID:category.id})
    // console.log(subcategories,"================subcategory==================");
    return res.json({subcategories})
})


module.exports=Productroutes;