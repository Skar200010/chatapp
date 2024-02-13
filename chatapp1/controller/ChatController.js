const ChatRoom = require('../models/chatRoom');
const Message = require('../models/Message');
const User = require('../models/User');

// Create a new chat room
exports.createChatRoom = async (req, res) => {
  try {
    const { name, owner } = req.body;

   
    const existingOwner = await User.findById(owner);

    if (!existingOwner) {
      return res.status(400).json({ message: 'Owner does not exist' });
    }

   
    const existingChatRoom = await ChatRoom.findOne({ name });

    if (existingChatRoom) {
      return res.status(400).json({ message: 'Chat room with the same name already exists' });
    }

    const chatRoom = new ChatRoom({
      name,
      owner,
      participants: [owner],
    });

    const savedChatRoom = await chatRoom.save();

    res.status(201).json(savedChatRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create a chat room' });
  }
};



exports.joinChatRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    
    if (chatRoom.participants.includes(userId)) {
      return res.status(400).json({ message: 'User is already a participant in this chat room' });
    }

    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    chatRoom.participants.push(userId);
    await chatRoom.save();

    res.json({ message: 'User joined the chat room successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to join the chat room' });
  }
};



exports.sendMessage = async (req, res) => {
  try {
    const { roomId, senderId, content } = req.body;

   
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

   
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
  
   
      const chatRoom = await ChatRoom.findById(roomId);
  
      if (!chatRoom) {
        return res.status(404).json({ message: 'Chat room not found' });
      }
  
      
      const messages = await Message.find({ chatRoom: roomId })
        .populate('sender'); 
  
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

