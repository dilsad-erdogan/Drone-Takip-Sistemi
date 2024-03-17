const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const Drone = require("../models/Drone");
const sendToken = require("../utils/sendToken");
const DroneInformation = require("../models/DroneInformation");
const Flight = require("../models/Flight");

//bütün kullanıcılar
exports.getAllUser = catchAsyncErrors(async(req, res) => {
    try {
        // tüm dronelar
        const users=await User.findAll();

        res.status(200).json({
            success: true,
            data: users
        })
    } catch(error) {
        res.status(500).jon({error: error.message});
    }
});

// aktif olan bütün kullanıcılar
exports.getActiveAllUser = catchAsyncErrors(async (req, res)=> {
  try {
    //tüm kullanıcılar
    const users = await User.findAll();

    // Aktif olan kullanıcıları bulmak için bir döngü
    const activeUsers = users.filter(user => user.is_active===true)
    
    if(activeUsers){
      res.status(200).json({
        success: true,
        data: activeUsers
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Active user not found'
      })
    }
      
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// kullaniciyi silme veya hesabi silme 
exports.deleteUser = async (req, res) => {
  try {

    const userId = req.params.id;
    // User modelini kullanarak ilgili kullanıcının is_active özelliğini güncelle
    const updatedUser = await User.update(
      { is_active: false },
      {
        where: {
          user_id: userId,
        },
      }
    );

    if (updatedUser[0] === 0) {
      // Güncelleme işlemi başarısız olduysa, yani kullanıcı bulunamadıysa
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({ message: 'Kullanıcının etkinliği kapatıldı' });
  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kullanıcının kendi profilini getir
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  //Kullanıcı varsa bilgilerini getir
  if (user) {
    res.status(200).json({
      success: true,
      user
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

// id'ye göre user getir
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      if(user && user.is_active===true){
          res.status(200).json({
          success: true,
          data: user
      })
      } else {
          res.status(404).json({
              success: false,
              error: 'User not found'
          })
      }
      
  } catch(error) {
      console.log(error);
      res.status(500).json({
          success: false,
          error: 'Internal server error'
      })
  }
}) 

//kullanıcı profilini günceller
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
        user.drone_owner = req.body.drone_owner || user.drone_owner;

        const updatedUser = await user.save();
        sendToken(updatedUser, 200, res, "Profil güncellendi");
    } else {
        res.status(404).json({
            success: false,
            error: "Kullanıcı bulunamadı"
        });
    } 
})

//total user count
exports.getTotalUserCount = catchAsyncErrors(async (req, res) => {
  try{
    const users = await User.findAll();

    res.status(200).json({
      success: true,
      totalUserCount: users.length,
    });
  } catch(error){
    res.status(500).json({error: error.message});
  }
});

exports.getDroneUserById = catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.params.id;

    // Kullanıcının sahip olduğu tüm droneları bulun
    const drones = await Drone.findAll({
      where: { owner_id: id },
    });

    // Her bir drone için bilgileri alın
    const droneInfos = await Promise.all(
      drones.map(async (drone) => {
        const drone_info = await DroneInformation.findOne({
          where: { droneinfo_id: drone.droneinfo_id },
        });

        return {
          drone: drone,
          drone_info: drone_info,
        };
      })
    );

    res.status(200).json({
      success: true,
      drones: droneInfos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

// id'ye göre user getir
exports.getUserByName = catchAsyncErrors(async (req, res, next) => {
  try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      if(user){
          res.status(200).json({
          success: true,
          data: user.name
      })
      } else {
          res.status(404).json({
              success: false,
              error: 'User not found'
          })
      }
      
  } catch(error) {
      console.log(error);
      res.status(500).json({
          success: false,
          error: 'Internal server error'
      })
  }
}) 

exports.getFlightByUserId = catchAsyncErrors(async (req, res, next) => {
  try {
    const owner_id = req.params.id;
    const flights = await Flight.find({ owner_id: owner_id });

    if (flights.length > 0) {
      res.status(200).json({
        success: true,
        data: flights
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Flights not found'
      });
    }    
  } catch(error) {
      console.log(error);
      res.status(500).json({
          success: false,
          error: 'Internal server error'
      })
  }
})