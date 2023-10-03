const jwt = require('jsonwebtoken')
const { transporter } = require("../helpers/mailer")
const { User } = require("../models/user")

const getCode = async function(req, res) {
    const { email } = req.params

    const user = await User.findOne({ email })
    if (!user) {
        return res
            .status(400)
            .json("No existe un usuario con ese email")
    }

    let code = ""

    for (let index = 0; index < 6; index++){
        let character = Math.ceil(Math.random() * 9)
        code += character
    }

    const result = await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: email,
        subject: "Código inicio de sesión",
        html: `Este es tu código para iniciar sesión: <strong>${ code }</strong>`
    })

    User.login_code = code
    await User.updateOne({login_code: code})

    res.status(200).json({ok:true, message:"Email enviado correctamente"})
}

const login = async function(req, res) {
    try {
        const { email } = req.params
        const { code } = req.body
        console.log({email}, {code})
        const user = await User.findOne({ email: email, login_code: code })
        if (!user) {
            return res
                .status(400)
                .json("Email o password incorrecto.")
        }
        const tokenpayload = {
            _id: user._id,
            firstName: user.firstName,
            email: user.email
        }
        const token = jwt.sign(tokenpayload, process.env.JWT_SECRET_KEY)
        console.log(token)
        res.cookie("jwt", token)
        res.status(200).json({ok:true, message:"Inicion de sesión correcto: " + user.firstName})

    }catch(err) {
        console.log(err)
    }
}

module.exports = {
    getCode,
    login
}