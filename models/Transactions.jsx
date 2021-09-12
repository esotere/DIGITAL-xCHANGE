const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const uniqueValidator = require('mongoose-unique-validator');

// var Float = require('mongoose-float').loadType(mongoose)

let Schema = mongoose.Schema;

let PhoneNumberSchema = Schema({
    telephone_1: {
        type: Number,
        unique: false,
        require: true,

    },
    telephone_2: {
        type: Number,
        unique: false,
        require: true,
    }
})

let TransactionSchema = new Schema({
transactionDate: {
    type: String,
    trim: true,
    unique: false,
    },
senderPhoneNumber: {
    type: Number,
    unique: false,
    require: true,
},
transactionInfo: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
transactionInfoOther: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
transactionAmount: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
recipientLastName: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
recipientFirstName: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
recipientPhoneNumber: {
    type: Number,
    unique: false,
    require: true,
},
accountBalance: {
    type: {decimal:mongoose.Types.Decimal128},
    trim: true,
    unique: false,
},
recipientAccountBalance: {
    type: {decimal:mongoose.Types.Decimal128},
    trim: true,
    unique: false,
},
creation_date: {
    type: Date,
    default: Date.now
}
});

TransactionSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});



const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;