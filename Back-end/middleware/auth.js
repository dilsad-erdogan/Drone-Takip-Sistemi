const jwt = require("jsonwebtoken");
const User = require("../models/User");

// private route, kullanicinin giriş yapıp yapmadıgını kontrol eden middleware ( authentication )
exports.isAuthenticatedUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
        success: false,
        error: 'İlk önce giriş yapmanız gerekiyor '
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { user_id: decoded.user_id } 
    });

    if (!user) {
        res.status(401).json({
            success: false,
            error: 'No user found with this id'
        })
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
        success: false,
        error: 'İlk önce giriş yapmanız gerekiyor'
    })
  }
};

// kullanicin rolüne göre izin veren kısım (authrozation)
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
  
        if (!roles.includes(req.user.role)) {
          
              res.status(403).json({
                error :`Role (${req.user.role}) is not allowed to acccess this resource`
              })
           
        }
        next()
    }
  }