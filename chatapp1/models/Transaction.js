const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trasanctionModel = new Schema({
    amount : {type : Number, required : true },
    date : {type : Date , default : Date.now},
    status : {type : String , enum : ['pending' ,'completed', 'failed'], default : 'pending' },
    userId : {type : mongoose.Schema.ObjectId , ref: 'User' , required: true}
})

module.exports = mongoose.model('Transaction', trasanctionModel)