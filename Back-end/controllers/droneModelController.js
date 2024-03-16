const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const DroneModel = require('../models/DroneModel');
const sendToken = require('../utils/sendToken');

// tüm modelleri getir
exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm modeller
        const models = await DroneModel.findAll();

        res.status(200).json({
            success: true,
            data: models
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// aktif olan tüm modelleri getir
exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        const models = await DroneModel.findAll();

        // Aktif olan modelleri bulmak için bir döngü
        const activeModels = models
            .filter(model => model.is_active === true)
            .map(model => model.dataValues.model_name)

        res.status(200).json({
            success: true,
            data: activeModels
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error!'
        })
    }
});

exports.getModelById = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params.id;
        const model = await DroneModel.findByPk(id);

        if(model){
            res.status(200).json({
            success: true,
            data: model.model_name
        })
        } else {
            res.status(404).json({ success: false, error: 'Brand not found!' });
        }
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' });
    }
}) 

exports.add = catchAsyncErrors(async(req, res, next) => {
    try {
        const { brand_id, model_name } = req.body;

    if (!model_name) {
      return res.status(400).json({
        success: false,
        error: "Model name can not empty"
      });
    }

    const _model = await DroneModel.findOne({ where: { model_name } });

    if (_model) {
      return res.status(400).json({
        success: false,
        error: "Model is exists"
      });
    }

    const model = await DroneModel.create({
        brand_id,
        model_name,
    }, 
    //{include: [DroneInformation],}
    );

    await model.save();

    res.status(201).json({ message: "Model created successfully", data: model });

    } catch (error) {
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});


exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const { model_name } = req.body;
        const id = req.params.id;

    // Güncellenecek modeli bul
    const modelToUpdate = await DroneModel.findByPk(id);

    // Drone bulunamazsa hata döndür
    if (!modelToUpdate) {
      return res.status(404).json({ success: false, error: 'Model not found' });
    }

    // Yeni bilgilerle modeli güncelle
    modelToUpdate.model_name = model_name || modelToUpdate.model_name;

    // Güncellenmiş modeli kaydet
    await modelToUpdate.save();

    // Başarı durumunda cevap gönder
    res.status(200).json({ success: true, data: modelToUpdate });

    } catch (error) {
        console.error('Hata:', error);
        // Hatanın consola yazdırılması
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});

exports.deleteModel = catchAsyncErrors(async (req, res)=> {
    try{
        const id = req.params.id;

        const model = await DroneModel.update(
            {is_active: false},
            {where: {model_id: id}}
        );

        if(model[0] === 0){
            return res.status(404).json({message: 'Model not found'});
        }

        res.status(200).json({
            message: 'Model deleted successful'
        })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})