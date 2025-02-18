const express=require("express")
const ExtrasubCategoryroutes=express.Router()
const Admin=require("../model/admin.model")
const Category=require("../model/category.model")
const SubCategory=require("../model/subcategory.model")
const ExtraSubCategory=require("../model/extrasubcategory.model")


ExtrasubCategoryroutes.get("/",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let record=await ExtraSubCategory.find({}).populate('categoryID').populate('subCategoryID')
    // console.log(record,"==================================");
    
    res.render("ExtrasubCategory/view_extrasubcategory",{loginAdmin,extraSubCategories:record})
})

ExtrasubCategoryroutes.get("/addSubCategory",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let categories=await Category.find({})
    let subcategories=await SubCategory.find({})
    res.render("ExtrasubCategory/add_extrasubcategory",{loginAdmin,categories,subcategories})
})

ExtrasubCategoryroutes.post("/addextrasubcategory",async(req,res)=>{
    let newRecord=await ExtraSubCategory.create(req.body) 
    // console.log(newRecord);
    if(newRecord)
    {
        console.log("record add sucessfully");
        return res.redirect("/extrasubcategory")
    }
    else{
        console.log("something wrong");
        return res.redirect("back")
    }
    
})
ExtrasubCategoryroutes.get("/deleteExtrasubCategory/:id",async(req,res)=>{
    let record=await ExtraSubCategory.findById(req.params.id)
    if(record)
    {
        await ExtraSubCategory.findByIdAndDelete(record)
        console.log("record delete sucess");
        return res.redirect("back")
    }
    else{
        console.log("something wrong");
        return res.redirect("back")
    }
})

ExtrasubCategoryroutes.get("/editExtrasubCategory/:id",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let record=await ExtraSubCategory.findById(req.params.id)
    let categories=await Category.find({})
    let subcategories=await SubCategory.find({})
    console.log(subcategories,"==========sub==================");
    console.log(categories,"=============cat===============");
    
    // console.log(record);
    
    return res.render("ExtrasubCategory/edit_extrasubcategory",{loginAdmin,extrasubcategory:record,categories,subcategories})
})

ExtrasubCategoryroutes.get("/getsubcategoies/:id",async(req,res)=>{
    // let category=await Category.findById(req.query.categoryID)
    let category = await Category.findById(req.params.id)
    // console.log(category,"===========category========");
    
    let subcategories = await SubCategory.find({categoryID:category.id})
    // console.log(subcategories,"================subcategory==================");
    return res.json({subcategories})
})

module.exports=ExtrasubCategoryroutes;