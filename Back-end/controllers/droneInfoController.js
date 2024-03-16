const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const DroneInformation = require('../models/DroneInformation');
const sendToken = require('../utils/sendToken');
const DroneType = require('../models/DroneType');

exports.addInfo = catchAsyncErrors(async(req, res, next) => {
    try {
        const { dronetype_id, battery_health, size_height, size_width, size_dept, weight, airframe_name, propeller_size,  material} = req.body;

        if(!dronetype_id || !battery_health || !size_height || !size_width || !size_width) {
            res.status(400).json({
                success: false,
                error: "Boş olamaz"
            });
        }

        // Kullanıcının seçtiği drone tipini veritabanında bul
        const droneType = await DroneType.findByPk(dronetype_id);
        if (!droneType) {
            return res.status(400).json({
              success: false,
              error: "Geçersiz drone tipi"
            });
          }

        const droneInfo = await DroneInformation.create({
            dronetype_id: droneType.dronetype_id,
            battery_health,
            size_height,
            size_width,
            size_dept, 
            weight,
            airframe_name,
            propeller_size,
            material
        });

        await droneInfo.save();
        res
        .status(201)
        .json({ message: "Drone başarıyla oluşturuldu ", data: droneInfo });

        //sendToken(droneInfo, 201, res, "Kayıt başarılı");

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

        const drone = await DroneInformation.update(
            {is_active: false},
            {where: {droneinfo_id: id}}
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

// tüm droneları getir
exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm dronelar
        const drones=await DroneInformation.findAll();

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
        const drones=await DroneInformation.findAll();

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
        const id = req.params.id;
        const drone = await DroneInformation.findByPk(id);

        if(drone && drone.is_active===true){
            res.status(200).json({
            success: true,
            data: drone
        })
        } else {
            res.status(404).json({
                success: false,
                error: 'Drone not found'
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

exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const { battery_health } = req.body;
    const droneId = req.params.id; // Güncellenecek drone'ın ID'si

    // Güncellenecek drone'ı bul
    const droneToUpdate = await DroneInformation.findByPk(droneId);

    // Drone bulunamazsa hata döndür
    if (!droneToUpdate) {
      return res.status(404).json({ success: false, error: 'Drone bulunamadı' });
    }

    // Yeni bilgilerle drone'ı güncelle
    //droneToUpdate.serial_number = serial_number || droneToUpdate.serial_number;
    droneToUpdate.battery_health = battery_health !== undefined ? battery_health : droneToUpdate.battery_health;
    //droneToUpdate.longitude = longitude || droneToUpdate.longitude;
    //droneToUpdate.latitude = latitude || droneToUpdate.latitude;

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