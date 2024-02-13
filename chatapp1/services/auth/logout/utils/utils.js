const User = require('../../../../models/User')
const mongoose = require('mongoose')

const userLogout = async (userId ) => {

   try {
    if (!mongoose.Types.ObjectId.isValid(userId))
     {
      console.log(userId)
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(userId)
    if (!user){
        throw new Error ("User not Found")
    }

    await User.findByIdAndUpdate(userId , {$set : {status: "logout"}})
  
   } catch (error) {
    console.error('Error in performLogout:' , error);
    throw new Error ('logout failed')   
    
   }
}

module.exports = {
    userLogout,
}