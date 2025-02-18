const express=require("express");
const SubCategoryroutes=express.Router()
const SubCategory=require("../model/subcategory.model")
const Admin=require("../model/admin.model")
const Category=require("../model/category.model")

SubCategoryroutes.get("/",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let record=await SubCategory.find({}).populate('categoryID')
    console.log(record);
    
    res.render("subcategory/view_subcategory",{loginAdmin,subCategories:record})
})

SubCategoryroutes.get("/addsubcategory",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let categories=await Category.find({})
    res.render("subcategory/add_subcategory",{loginAdmin,categories})
})

SubCategoryroutes.post("/addsubcategory",async(req,res)=>{
    let newRecord=await SubCategory.create(req.body)
    console.log("foram",newRecord);
    
    if(newRecord){
        console.log("record add sucessfully");
        return res.redirect("/subcategory")
    }
    else{
        console.log("something wrong");
        return res.redirect("back")
    }
})

SubCategoryroutes.get("/deletesubCategory/:id",async(req,res)=>{
    let record= await SubCategory.findById(req.params.id)
    if(record)
    {
       await SubCategory.findByIdAndDelete(record)
        console.log("record delete sucess");
        return res.redirect("back")
    }
    else{
          console.log("something wrong");
          return res.redirect("back")
          
    }
})
SubCategoryroutes.get("/editsubCategory/:id",async(req,res)=>{
    let loginAdmin=await Admin.findById(req.cookies.admin._id)
    let record=await SubCategory.findById(req.params.id)
    let categories=await Category.find({})
    console.log("foram.........................................",record);
    
    return res.render("subcategory/edit_subcategory",{loginAdmin,subcategory:record,categories})
   

})

SubCategoryroutes.post("/updatesubcategory/:id",async(req,res)=>{
    let record=await SubCategory.findById(req.params.id)
    if(record)
    {
        await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
        console.log("record update sucessfully");
        return res.redirect("/subcategory")
        
    }
    else{
        console.log("something wrong");
        return res.redirect("back")
    }
})


module.exports=SubCategoryroutes;