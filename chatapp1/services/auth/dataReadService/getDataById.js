const Master = require('../../../models/Master')


const getService = async (id) =>{

    try {
        const result = await Master.findById(id);
    
        if (!result) {
          return { success: false, message: 'User not found' };
        } else {
          return { success: true, data: result };
        }
      } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
      }
    }
module.exports = {
    getService
}