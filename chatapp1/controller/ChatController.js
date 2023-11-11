const ChatRoom = require('../models/chatRoom');
const Message = require('../models/Message');
const User = require('../models/User');

// Create a new chat room
exports.createChatRoom = async (req, res) => {
  try {
    const { name, owner } = req.body;

    // Verify that the owner exists in the User collection
    const existingOwner = await User.findById(owner);

    if (!existingOwner) {
      return res.status(400).json({ message: 'Owner does not exist' });
    }

    // Check if a chat room with the same name already exists
    const existingChatRoom = await ChatRoom.findOne({ name });

    if (existingChatRoom) {
      return res.status(400).json({ message: 'Chat room with the same name already exists' });
    }

    const chatRoom = new ChatRoom({
      name,
      owner,
      participants: [owner], // Add the owner to the participants list
    });

    const savedChatRoom = await chatRoom.save();

    res.status(201).json(savedChatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create a chat room' });
  }
};


// Join an existing chat room
exports.joinChatRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    // Find the chat room by its ID
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Check if the user is already a participant
    if (chatRoom.participants.includes(userId)) {
      return res.status(400).json({ message: 'User is already a participant in this chat room' });
    }

    // Check if the user exists in the user collection
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the user to the participants list
    chatRoom.participants.push(userId);
    await chatRoom.save();

    res.json({ message: 'User joined the chat room successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to join the chat room' });
  }
};


// Send a message in a chat room
exports.sendMessage = async (req, res) => {
  try {
    const { roomId, senderId, content } = req.body;

    // Check if the chat room exists
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Create a new message
    const message = new Message({
      chatRoom: roomId,
      sender: senderId,
      content,
    });

    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send the message' });
  }
};
  exports.getMessages = async (req, res) => {

    try {
      const roomId = req.params.roomId;
  
      // Find the chat room by its ID
      const chatRoom = await ChatRoom.findById(roomId);
  
      if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room not found' });
      }
  
      // Fetch messages for the specified chat room
      const messages = await Message.find({ chatRoom: roomId })
        .populate('sender'); // Optionally populate sender information
  
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

