const {dataReadService} = require('../services/auth/dataReadService')
const {getService} = require('../services/auth/dataReadService/getDataById')
const {updateDataService} = require('../services/auth/dataReadService/updateDataById')
const{deleteDataService} = require('../services/auth/dataReadService/deleteDataById')
const path = require('path');

exports.importData = async (req , res , next) => {

    try {

        const filePath = path.join(__dirname, '../upload/master.xlsx');
        const data = await dataReadService(filePath)

        if (data.success){
            res.status(200).json(data)
        }

        else {
            res.status(500).json(data)
        }
        
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

exports.getDatabyId = async (req , res) => {
    try{
        const id = req.params.id;
        const data = await getService(id);

        return res.json(data)

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

exports.updateDataById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedFields = req.body;
  
      if (!id || !updatedFields) {
        return res.status(400).json({ success: false, message: 'Invalid request parameters' });
      }
  
      const data = await updateDataService(id, updatedFields);
  
      if (data.success) {
        res.status(200).json(data) ;
      } else {
        res.status(404).json(data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      next(error);
    }
  };


  exports.deleteDataById = async (req , res) => {

    try {
        const id = req.params.id;
    
        if (!id) {
          return res.status(400).json({ success: false, message: 'Invalid request parameters' });
        }
    
        const data = await deleteDataService(id);
    
        if (data.success) {
          res.status(200).json(data);
        } else {
          res.status(404).json(data);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        next(error);
      }
    };
