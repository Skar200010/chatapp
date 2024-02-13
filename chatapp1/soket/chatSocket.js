module.exports = function (io) {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      // Handle when a user joins a chat room
      socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
      });
  
      // Handle chat messages
      socket.on('chatMessage', (data) => {
        io.to(data.roomId).emit('message', data.message);
      });
  
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  };
  