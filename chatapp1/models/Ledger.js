const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ledgerSchema = new Schema({
    date: {type : Date  , required : true },
    amount : {type : Number , required : true  },
    userId : { type : mongoose.Schema.ObjectId , ref : 'User' , required : true},
    name : {type : String , required : true },
})

module.exports = mongoose.model('Ledger', ledgerSchema);