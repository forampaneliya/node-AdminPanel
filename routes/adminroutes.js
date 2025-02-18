const express = require("express")
const adminRoutes = express.Router()
const Admin = require("../model/admin.model")
const path = require("path")
const fs = require("fs")
const { viewAdmin, addAdminPage, addNewAdmin, ChangePassword,deleteAdmin, editAdminPage, updateAdmin, ChangePasswordPage } = require("../controller/adminController")

adminRoutes.get("/", viewAdmin)

adminRoutes.get("/addadmin", addAdminPage)

adminRoutes.post("/addnew", Admin.uploadImage, addNewAdmin)

adminRoutes.get("/deleteAdmin/:id", deleteAdmin)

adminRoutes.get("/editAdmin/:id", editAdminPage)

adminRoutes.post("/updateAdmin/:id", Admin.uploadImage, updateAdmin)

adminRoutes.get("/changePassword",ChangePasswordPage)

adminRoutes.post("/changePass",ChangePassword)

module.exports = adminRoutes;