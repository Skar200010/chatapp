const Transaction = require('../../../models/Transaction')
const ledgerutil = require('../ledger/utils')
const transactionService = async (bodyData) => {
    try {
        const { amount , status ,userId} = bodyData
        const isUservalid = await ledgerutil.isValiduserId(userId)

        if (!isUservalid){
            return {success : false , message : 'invalid userId or user not found'}
        }

        const transaction = new Transaction({amount , status, userId})
        await transaction.save()
        return {success : true , message : 'trasaction add successfully'}

    } catch (error) {
        console.error('Error in transaction service' , error)
        throw new Error('Error in creating Transaction')
    }

}

module.exports = {
    transactionService,
}