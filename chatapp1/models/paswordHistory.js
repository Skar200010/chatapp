// models/PasswordHistory.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const passwordHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  passwordEntries: [
    {
      hashedPassword: { type: String, required: true },
      createdAt: { type: Date, required: true },
    },
  ],
});

passwordHistorySchema.pre('save', async function (next) {
  if (this.isModified('passwordEntries')) {
    try {
      // Limit the number of stored password entries to 5
      while (this.passwordEntries.length >= 5) {
        this.passwordEntries.shift();
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});
module.exports  = mongoose.model('PasswordHistory', passwordHistorySchema);


