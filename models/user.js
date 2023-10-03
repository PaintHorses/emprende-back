const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    login_code: String
})

const User = mongoose.model('User', userSchema, 'User')

module.exports = { User }