const {transactionService} = require('../services/auth/transaction')

exports.transaction = async (req , res , next ) => {

    try {
        const data = await transactionService (req.body) 
        res.json(data)

    } catch (error) {
            console.log(error);
            if (error.status && error.error) {
              res.status(error.status).send(error.error);
              return next(error);
            }
            if (error.status) {
              res.sendStatus(error.status);
              return next(error);
            }
            res.status(500).json({ status: false, message: "Internal Server Error" });
            return next(error);
        
    }


}