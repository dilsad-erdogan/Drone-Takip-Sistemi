const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Drone = require('../models/Drone');
const DroneInformation = require('../models/DroneInformation');
const User = require("../models/User");
const sendToken = require('../utils/sendToken');

// tüm droneları getir
exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm dronelar
        const drones=await Drone.findAll();

        res.status(200).json({
            success: true,
            data: drones
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// aktif olan tüm droneları getir
exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm dronelar
        const drones = await Drone.findAll();

        // Aktif olan droneları bulmak için bir döngü
        const activeDrones = drones.filter(drone => drone.is_active === true);

        res.status(200).json({
            success: true,
            data: activeDrones
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// id'ye göre drone getir
exports.getDroneById = catchAsyncErrors(async (req, res, next) => {
    try {
        const owner_id = req.params.id;
        const drone = await Drone.findOne({
            where: { owner_id: owner_id },
            include: [
                {
                    model: User,
                    attributes: ['name'], // Specify the attributes you want to retrieve
                },
            ],
        });

        if (drone && drone.is_active === true) {
            res.status(200).json({
                success: true,
                data: {
                    drone_id: drone.drone_id,
                    droneinfo_id: drone.droneinfo_id,
                    owner_id: drone.owner_id,
                    serial_number: drone.serial_number,
                    is_active: drone.is_active,
                    longitude: drone.longitude,
                    latitude: drone.latitude,
                    user_name: drone.User ? drone.User.user_name : null,
                },
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Drone not found or not active'
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

exports.add = catchAsyncErrors(async(req, res, next) => {
    try {
        const { serial_number, owner_id, dronetype_id, battery_health, size_height, size_width, size_dept, weight, airframe_name, propeller_size, material } = req.body;

    if (!serial_number || !dronetype_id) {
      return res.status(400).json({
        success: false,
        error: "Serial number ve drone tipi boş olamaz"
      });
    }

    const _drone = await Drone.findOne({ where: { serial_number } });

    if (_drone) {
      return res.status(400).json({
        success: false,
        error: "Drone kayıtlı"
      });
    }

    const droneInfo = await DroneInformation.create({
      dronetype_id: dronetype_id,
      battery_health,
      size_height,
      size_width,
      size_dept,
      weight,
      airframe_name,
      propeller_size,
      material
    });

    const drone = await Drone.create({
      serial_number,
      owner_id,
      droneinfo_id: droneInfo.droneinfo_id,
      DroneInformation: droneInfo,
    }, {
      include: [DroneInformation],
    });

    await drone.save();

    res.status(201).json({ message: "Drone başarıyla oluşturuldu", data: drone });

    sendToken(drone, 201, res, "Kayıt başarılı");

    } catch (error) {
        console.error('Hata:', error);
 // Hatanın consola yazdırılması
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const { longitude, latitude } = req.body;
    const droneId = req.params.id; // Güncellenecek drone'ın ID'si

    // Güncellenecek drone'ı bul
    const droneToUpdate = await Drone.findByPk(droneId);

    // Drone bulunamazsa hata döndür
    if (!droneToUpdate) {
      return res.status(404).json({ success: false, error: 'Drone bulunamadı' });
    }

    // Yeni bilgilerle drone'ı güncelle
    //droneToUpdate.serial_number = serial_number || droneToUpdate.serial_number;
    //droneToUpdate.is_active = is_active !== undefined ? is_active : droneToUpdate.is_active;
    droneToUpdate.longitude = longitude || droneToUpdate.longitude;
    droneToUpdate.latitude = latitude || droneToUpdate.latitude;

    // Güncellenmiş drone'ı kaydet
    await droneToUpdate.save();

    // Başarı durumunda cevap gönder
    res.status(200).json({ success: true, data: droneToUpdate });
    } catch (error) {
        console.error('Hata:', error);
        // Hatanın consola yazdırılması
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});

exports.deleteDrone = catchAsyncErrors(async (req, res)=> {
    try{
        const id = req.params.id;

        const drone = await Drone.update(
            {is_active: false},
            {where: {drone_id: id}}
        );

        if(drone[0] === 0){
            return res.status(404).json({message: 'Drone not found'});
        }

        res.status(200).json({
            message: 'Drone deleted successful'
        })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})

exports.getTotalDroneCount = catchAsyncErrors(async (req, res) => {
    try{
        const drones = await Drone.findAll();

        res.status(200).json({
            success: true,
            totalDroneCount: drones.length,
        });
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

exports.getTotalUserDroneCount = catchAsyncErrors(async (req, res) => {
    try {
        const owner_id = req.params.id;

        const droneCount = await Drone.count({
            where: {
                owner_id: owner_id,
                is_active: true,
            }
        });

        if (droneCount > 0) {
            res.status(200).json({
                success: true,
                data: droneCount,
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'No active drones found for the user'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

exports.getSerialNumberById = catchAsyncErrors(async (req, res) => {
    try {
        const id = req.params.id
        const serialNumber = await Drone.findByPk(id);


        if(serialNumber){
            res.status(200).json({ success: true, message: serialNumber.dataValues.serial_number });
        } else {
            res.status(404).json({ success: false, message: 'Drone not found!' });
        }

    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

exports.allDroneAndInfo = catchAsyncErrors(async (req, res, next) => {
    try {

      const allDrones = await Drone.findAll({
        include: {
          model: DroneInformation,
        }
      });
  
      res.status(200).json({
        success: true,
        drones: allDrones
      })
      
  } catch(error) {
      console.log(error);
      res.status(500).json({
          success: false,
          error: error
      })
  }
})