const express = require("express")
const Categoryroutes = express.Router()
const Admin = require("../model/admin.model")
const Category = require("../model/category.model")
const path = require("path")
const fs = require("fs")

Categoryroutes.get("/", async (req, res) => {
    let loginAdmin = await Admin.findById(req.cookies.admin._id)
    let record = await Category.find({})

    res.render("category/view_catagory", { loginAdmin, categories: record })
})
Categoryroutes.get("/addcategory", async (req, res) => {
    let loginAdmin = await Admin.findById(req.cookies.admin._id)

    return res.render("category/add_category", { loginAdmin })
})
Categoryroutes.post("/addnew", Category.uploadImage, async (req, res) => {

    let imagepath = "";
    if (req.file) {
        imagepath = `/uploads/category/${req.file.filename}`
    }
    req.body.categoryImage = imagepath;

    let newRecord = await Category.create(req.body)

    console.log(req.body);
    if (newRecord) {
        console.log("record add sucessfully");

        return res.redirect("/category")
    }
})


Categoryroutes.get("/deleteCategory/:id", async (req, res) => {
    let record = await Category.findById(req.params.id)
    if (record) {
        if (req.file) {
            let imagepath = path.join(__dirname, "..", record.categoryImage)
            await fs.unlinkSync(imagepath)

        }
        await Category.findByIdAndDelete(record)
        console.log("record delete sucess");
        return res.redirect("back")
    }
    else {
        console.log("something wrong");
        return res.redirect("back")
    }

})

Categoryroutes.get("/editCategory/:id", async (req, res) => {
    let loginAdmin = await Admin.findById(req.cookies.admin._id)
    let record = await Category.findById(req.params.id)
    if (record) {
        return res.render("category/edit_category", { loginAdmin, category: record })
    }
    else {
        console.log("something wrong");
        return res.redirect("back")
    }
})
Categoryroutes.post("/updateCategory/:id", Category.uploadImage, async (req, res) => {
    let record=await Category.findById(req.params.id)
    if(record)
    {
        if(req.file)
        {
            let imagepath = path.join(__dirname, "..", record.categoryImage)
            await fs.unlinkSync(imagepath)
        }
        await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        console.log("record update sucessfully");

        return res.redirect("/category")
        
    }
    else{
        console.log("something wrong");
        return res.redirect("back")
    }

})

module.exports = Categoryroutes;