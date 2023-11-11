const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the owner user
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Reference to the participant users
  // Add more fields as needed, e.g., description, access settings, etc.
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
