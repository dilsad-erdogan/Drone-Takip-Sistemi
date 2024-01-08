const { truncate } = require('fs');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Drone = require('../models/Drone');
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
        console.error('Error:', error); // Hatanın detaylarını konsola yazdır
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// aktif olan tüm droneları getir
exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm dronelar
        const drones=await Drone.findAll();

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
        const drone = await Drone.findByPk(id);

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

exports.add = catchAsyncErrors(async(req, res, next) => {
    try {
        const { serial_number } = req.body;

        console.log("serial number", serial_number);

        if(!serial_number) {
            res.status(400).json({
                success: false,
                error: "Boş olamaz"
            });
        }

        const _drone = await Drone.findOne({where: {serial_number}});

        console.log("bulundu", _drone);
        if(_drone) {
            res.status(400).json({
                success: false,
                error: "Drone kayıtlı"
            });
        }

        const drone = await Drone.create({
            serial_number
        });

        console.log("son", drone);

        await drone.save();
        res
        .status(201)
        .json({ message: "Drone başarıyla oluşturuldu ", data: drone });

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
        const { is_active, longitude, latitude } = req.body;
    const droneId = req.params.id; // Güncellenecek drone'ın ID'si

    // Güncellenecek drone'ı bul
    const droneToUpdate = await Drone.findByPk(droneId);

    // Drone bulunamazsa hata döndür
    if (!droneToUpdate) {
      return res.status(404).json({ success: false, error: 'Drone bulunamadı' });
    }

    // Yeni bilgilerle drone'ı güncelle
    //droneToUpdate.serial_number = serial_number || droneToUpdate.serial_number;
    droneToUpdate.is_active = is_active !== undefined ? is_active : droneToUpdate.is_active;
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

//total drone count
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