const express = require("express");
const authRoutes = express.Router();
const Admin = require("../model/admin.model")
const otpGenerator = require("otp-generator");
let mailConfig = require("../config/mailConfig")


authRoutes.get("/", (req, res) => {
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.render("login")
    }
    else {
        return res.redirect("/dashboard")
    }
})
authRoutes.get("/dashboard", async (req, res) => {
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.render("/")
    }
    else {
        let loginAdmin = await Admin.findById(req.cookies.admin._id)
        return res.render("home", { loginAdmin })
    }
})

authRoutes.post("/checklogin", async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        // console.log(admin);
        if (admin) {
            if (admin.password == req.body.password) {

                console.log("you are login sucessfully");
                res.cookie("admin", admin)
                return res.redirect("/dashboard")

            }
            else {
                console.log("password doesnt't match");
                return res.redirect("/")
            }
        }
        else {
            console.log("admin not found");
            return res.redirect("/")

        }
    } catch (error) {
        console.log(error);
        return res.redirect("/")
    }
})
authRoutes.get("/logout", (req, res) => {
    res.clearCookie("admin")
    return res.redirect("/")
})
authRoutes.get("/viewProfile", async (req, res) => {
    let loginAdmin = await Admin.findById(req.cookies.admin._id)
    console.log(loginAdmin);

    return res.render("viewProfile", { loginAdmin })

})
authRoutes.get("/forgotPassPage", (req, res) => {
    return res.render("forgotpassword/forgotpassPage")
})
authRoutes.post("/send-otp", async (req, res) => {
    let otp = otpGenerator.generate(5, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });

    let mailInfo = {
        from: 'forampaneliya1204@gmail.com',
        // to: req.body.email,
        to: `${req.body.email}`,
        subject: "Send OTP for Forgotpassword",
        html: `
            <h2>Your OTP is ${otp}. valid only 5 minutes.</h2>
        `
    }

    await mailConfig(mailInfo)
    res.cookie('otp', otp);
    res.cookie('email', req.body.email);
    return res.redirect("/verify-otp");


})

authRoutes.get("/verify-otp", (req, res) => {
    return res.render("forgotpassword/otp")
})
authRoutes.post("/verify-otp", async (req, res) => {
    // let email = req.cookies.email;
    let otp = req.cookies.otp;
    if (req.body.otp == otp) {
        return res.redirect("/new-password");
    }
    else {
        return res.redirect("/verify-otp");
    }
})

authRoutes.get("/new-password", (req, res) => {
    return res.render("forgotpassword/newPassword")
})

authRoutes.post("/new-password", async (req, res) => {
    let email = req.cookies.email;
    if (req.body.password == req.body.Confirm_password) {
        let admin = await Admin.findOne({ email: email });
        admin.password = req.body.password;
        await admin.save();
        res.clearCookie('otp');
        res.clearCookie('email');
        return res.redirect("/");

    }
    else {
        return res.redirect("/new-password");
    }
})


module.exports = authRoutes;