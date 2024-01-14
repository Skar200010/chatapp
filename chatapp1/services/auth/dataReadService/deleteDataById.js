const Master =  require('../../../models/Master')

const deleteDataService = async(id) => {
    try {
        const result = await Master.findByIdAndDelete(id);
    
        if (result) {
          return { success: true, message: 'Document deleted successfully', data: result };
        } else {
          return { success: false, message: 'Document not found for deletion' };
        }
      } catch (error) {
        throw error;
      }
    
}

module.exports = {
    deleteDataService
}