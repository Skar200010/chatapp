const Transaction = require('../../../models/Transaction')
const User = require('../../../models/User')

const getTransactionService = async () => {

    try {

        const bodyData =  await User.aggregate([
            {

                $lookup: {
                    from: 'transactions',
                    localField: '_id',
                    foreignField: 'userId',
                    as : 'transactions'

                }
            },

            {
              $unwind: '$transactions',
            },
            {
                $group: {
                  _id: '$username',
                  totalPendingAmount: {
                    $sum: {
                      $cond: [{ $eq: ['$transactions.status', 'pending'] }, '$transactions.amount', 0],
                    },
                  },
                  totalCompletedAmount: {
                    $sum: {
                      $cond: [{ $eq: ['$transactions.status', 'completed'] }, '$transactions.amount', 0],
                    },
                  },
                  totalFailedAmount: {
                    $sum: {
                      $cond: [{ $eq: ['$transactions.status', 'failed'] }, '$transactions.amount', 0],
                    },
                  },
                },
              },
              {
                $project: {
                  name: '$_id',
                  totalPendingAmount: 1,
                  totalCompletedAmount: 1,
                  totalFailedAmount: 1,
                  _id: 0,
                },
              },


        ])
        return bodyData;
    } catch (error) {
        console.error('Error in getTransactionService:', error);
        throw { status: 500, error: 'Internal Server Error' };
    }

}
module.exports = {
    getTransactionService
}