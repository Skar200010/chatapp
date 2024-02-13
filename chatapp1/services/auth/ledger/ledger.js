const Ledger = require('../../../models/Ledger')
const ledgerutil = require('./utils')
const ledgerService = async (bodyData) => {
    try {

        const { date , amount , userId , name  } = bodyData
        const isUservalid = await ledgerutil.isValiduserId(userId)


        if (!isUservalid)
        {
        return {success : false , message : 'invalid userId or user does not exist'}
        }
        
        const ledger = new Ledger({ date , amount , userId , name});
        await ledger.save()
        return {success : true , message : 'ledger added successfully'}
    } catch (error) {
        console.error('Error  ledger service' , error)
        throw new Error('Error in adding ledger ')

        
    }

}

    module.exports = 
    {ledgerService,
    }