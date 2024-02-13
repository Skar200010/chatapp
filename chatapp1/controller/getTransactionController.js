const {getTransactionService} = require('../services/auth/getTransaction')

exports.gettransaction = async (req , res , next ) => {

    try {
    const data = await getTransactionService() 
    res.json(data)

        
    } catch (error) {
        console.error(error);
        if (error.status && error.error) {
          res.status(error.status).send(error.error);
          return next(error);
        }
        if (error.status) {
          res.sendStatus(error.status);
          return next(error);
        }
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return next(error);
        
    }
}