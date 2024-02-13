const mongoose = require("mongoose");
//chatapp database
mongoose.connect("mongodb+srv://khedekarsohan10:Sohan10@cluster0.4faguxu.mongodb.net/Chatapp", {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => {
   console.log("Connected to the 'chatapp' database");
})
.catch(error => {
   console.error("Error connecting to the 'chatapp' database:", error);
});


//module.exports = connectDatabase;
// mongodb+srv://khedekarsohan10:Sohan10@cluster0.4faguxu.mongodb.net/Chatapp
