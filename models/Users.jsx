const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const uniqueValidator = require('mongoose-unique-validator');

// var Float = require('mongoose-float').loadType(mongoose)

let Schema = mongoose.Schema;

let UserSchema = new Schema({
accountType: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
title: {
    type: String,
    trim: true,
    unique: false,
},
userName: {
    type: String,
    trim: true,
    unique: true,
    require: true,
},
firstName: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
lastName: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
address: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
countryCode: {
    type: Number,
    unique: false,
    require: true,
},
phoneNumber: {
    type: Number,
    unique: false,
    require: true,
},
email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter valid e-mail address"]
},
bank_name: {
    type: String,
    trim: true,
    unique: false,
},
bank_account_number: {
    type: Number,
    trim: true,
    unique: true,
},
bvn: {
    type: Number,
    trim: true,
    unique: false,
},
system_account_number: {
    type: Number,
    trim: true,
    unique: true,
},
accountBalance: {
    type: {decimal:mongoose.Types.Decimal128},
    trim: true,
    unique: false,
},
// img: {
//     data: Buffer,
//     contentType: String
    
// },
password: {
    type: String,
    require: true,
    unique: false,
},
creation_date: {
    type: Date,
    default: Date.now
}
});

UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});



const User = mongoose.model("User", UserSchema);

module.exports = User;