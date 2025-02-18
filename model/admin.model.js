const mongoose = require("mongoose")
const path = require("path")
const multer = require("multer")

const adminShema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    contact: Number,
    adminImage: String,
    gender: String,
    hobby: Array
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/admin"))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now())
    }
})
adminShema.statics.uploadImage = multer({ storage }).single("adminImage")

const Admin = mongoose.model("Admin", adminShema)
module.exports = Admin;