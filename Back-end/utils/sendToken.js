// token oluştur
const sendToken = (user, statusCode, res , message ) => {
    // Jwt token oluşturma 
    const token = user.getJwtToken();
  
    res.status(statusCode).json({
        success: true, 
        token,
        user: user,
        message : message       
      });
};
  
module.exports = sendToken;