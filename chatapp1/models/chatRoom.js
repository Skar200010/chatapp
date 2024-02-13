const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }, 
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
 
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
