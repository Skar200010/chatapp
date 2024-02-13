const XLSX = require('xlsx')
const Master = require('../../../models/Master')



const dataReadService = async (filePath) => {

    try {

       const workbook = XLSX.readFile(filePath)
       const sheetName = workbook.SheetNames[0];
       const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

       await Master.insertMany(data)
       return{success : true , message : 'Data imported Successfully'}
        
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error importing data' };
        
    }
}
module.exports = {
    dataReadService
}