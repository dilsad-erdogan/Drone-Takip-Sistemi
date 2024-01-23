const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const DroneType = require('../models/DroneType');
const sendToken = require('../utils/sendToken');

// tüm drone tiplerini getir
exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm drone tipleri
        const types = await DroneType.findAll();

        res.status(200).json({
            success: true,
            data: types
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// aktif olan tüm drone tipleri getir
exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm drone tipleri
        const types = await DroneType.findAll();

        // Aktif olan droneları bulmak için bir döngü
        const activeType = types.filter(type => type.is_active === true);

        res.status(200).json({
            success: true,
            data: activeType
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// id'ye göre drone tipi getir
exports.getTypeById = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params.id;
        const type = await DroneType.findByPk(id);

        if(type && type.is_active===true){
            res.status(200).json({
            success: true,
            data: type
        })
        } else {
            res.status(404).json({
                success: false,
                error: 'Drone type not found'
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
        const { type_name } = req.body;

    if (!type_name) {
      return res.status(400).json({
        success: false,
        error: "Type name cannot be empty"
      });
    }

    const _type = await DroneType.findOne({ where: { type_name } });

    if (_type) {
      return res.status(400).json({
        success: false,
        error: "This brand already exists"
      });
    }

    const type = await DroneType.create({
        type_name,
    });

    await type.save();

    res.status(201).json({ message: "Drone type successfully registered", data: type });

    //sendToken(drone, 201, res, "Kayıt başarılı");

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
        const { type_name } = req.body;
        const typeId = req.params.id; // Güncellenecek drone tipinin ID'si

        // Güncellenecek tipi bul
        const typeToUpdate = await DroneType.findByPk(typeId);

        // Tip bulunamazsa hata döndür
        if (!typeToUpdate) {
        return res.status(404).json({ success: false, error: 'Drone bulunamadı' });
        }

        // Yeni bilgilerle tipi güncelle
        typeToUpdate.type_name = type_name || typeToUpdate.type_name;

        // Güncellenmiş tipi kaydet
        await typeToUpdate.save();

        // Başarı durumunda cevap gönder
        res.status(200).json({ success: true, data: typeToUpdate });
    } catch (error) {
        console.error('Hata:', error);
        // Hatanın consola yazdırılması
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});

exports.deleteType = catchAsyncErrors(async (req, res)=> {
    try{
        const id = req.params.id;

        const type = await DroneType.update(
            {is_active: false},
            {where: { dronetype_id: id }}
        );

        if(type[0] === 0){
            return res.status(404).json({message: 'Drone type not found'});
        }

        res.status(200).json({
            message: 'Drone type deleted successful'
        })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})