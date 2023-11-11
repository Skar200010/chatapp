const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoom: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
  // Add more fields as needed, e.g., attachments, read status, etc.
});

module.exports = mongoose.model('Message', messageSchema);
