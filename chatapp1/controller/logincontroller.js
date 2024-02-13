
const {loginService} = require('../services/auth/login');

exports.login = async (req, res , next) => {
  try {
    const data = await loginService(req.body);
    if(data.success){
      return res.json({success : true , token : data.token , message: data.message});
    }
    else{
      return res.status(401).json({success : false , message: data.message })
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
};