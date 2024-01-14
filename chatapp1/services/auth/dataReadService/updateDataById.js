const Master = require('../../../models/Master')
const updateDataService = async (id, updatedFields) => {
    try {
        const result = await Master.findByIdAndUpdate(
          id,
          { $set: updatedFields },
          { new: true }
        );
    
        if (result) {
          return { success: true, message: 'Data updated successfully', data: result };
        } else {
          return { success: false, message: 'Document not found for update' };
        }
      } catch (error) {
        throw error;
      }
    }
module.exports = {
    updateDataService
}