const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const passwordSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true,},
      resetToken: { type: String , required: true,},
      expiresAt: {type: Date,required: true,},
})

module.exports = mongoose.model('Password' , passwordSchema )