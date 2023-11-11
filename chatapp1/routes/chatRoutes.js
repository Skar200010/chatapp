const express = require('express');
const router = express.Router();
const chatController = require('../controller/ChatController');

// Create a chat room
router.post('/room/create', chatController.createChatRoom);

// Join a chat room
router.post('/room/join', chatController.joinChatRoom);

// Send a message in a chat room
router.post('/room/:roomId/message/send', chatController.sendMessage);

// Get messages in a chat room
router.get('/room/:roomId/messages',chatController.getMessages);

module.exports = router;
