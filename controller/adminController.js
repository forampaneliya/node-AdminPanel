const Admin = require("../model/admin.model");
const path=require("path");
const fs=require("fs")

exports.viewAdmin=async (req, res) => {
    if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.redirect("/")
    }
    else {

        let record = await Admin.find()
        let loginAdmin = await Admin.findById(req.cookies.admin._id)

        return res.render("viewadmin", { addNew: record, loginAdmin })
    }
}

exports.addAdminPage=async (req, res) => {
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.redirect("/")
    }
    else {
        let loginAdmin = await Admin.findById(req.cookies.admin._id)
        return res.render("add_admin", { loginAdmin })

    }

}

exports.addNewAdmin=async (req, res) => {
    let imagePath = "";
    if (req.file) {
        imagePath = `/uploads/admin/${req.file.filename}`
    }
    req.body.adminImage = imagePath;
    console.log(req.body);

    let record = await Admin.create(req.body)
    if (record) {
        console.log("admin add successfully");
        return res.redirect("/admin")

    }
    else {
        console.log("something wrong");
        return res.redirect("/admin")
    }

}
exports.deleteAdmin=async (req, res) => {
    let record = await Admin.findById(req.params.id)
    if (record) {

        let imagepath = path.join(__dirname, "..", record.adminImage)
        await fs.unlinkSync(imagepath)



        await Admin.findByIdAndDelete(record)
        console.log("record delete sucess");
        return res.redirect("/admin")

    }
    else {
        console.log("something wrong");
        return res.redirect("/admin")
    }
}

exports.editAdminPage=async (req, res) => {
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.redirect("/")
    }
    else {
        let loginAdmin = await Admin.findById(req.cookies.admin._id)
        let record = await Admin.findById(req.params.id)
        if (record) {

            return res.render("editadmin", { admin: record, loginAdmin })
        }
        else {
            console.log("something wrong");

        }
    }
}

exports.updateAdmin=async (req, res) => {
    console.log(req.body);
    console.log("Admin", req.params.id);
    try {
        let record = await Admin.findById(req.params.id);
        if (record) {
            if (req.file) {
                let imagePath = record.adminImage;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Missing....");
                    }
                }
                let newImagepath = `/uploads/admin/${req.file.filename}`;
                req.body.adminImage = newImagepath
            } else {
                req.body.adminImage = record.adminImage
            }
            await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Update Record Success...");
            return res.redirect("/admin")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(err);
        return res.redirect('back');
    }
}

exports.ChangePasswordPage=async(req,res)=>{
    try {
        // let record=await Admin.findOne(req.params.id)
        // console.log(id);
        
        return res.render("changePassword")
        
    } catch (error) {
        console.log(error);
        
    }
}
exports.ChangePassword=async(req,res)=>{
    try {
        // console.log(req.body,"change password");
        // console.log(req.cookies.admin.password,"cookie password");
        // console.log(req.cookies.admin);
        
        let admin = await Admin.findById(req.cookies.admin._id)
        console.log(admin);
        if(req.cookies.admin.password==req.body.password && req.body.newPassword==req.body.conPassword && req.body.password!=req.body.newPassword )
        {
           console.log("sucess");
           admin.password = req.body.newPassword
           await admin.save();
           res.redirect("/admin/changePassword")
        }
        else{
            console.log("error");
            res.redirect("back")
        }
        // res.redirect("/admin/changePassword")
        
    } catch (error) {
        console.log(error); 
    }
}