const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const DroneType = require('../models/DroneType');
const sendToken = require('../utils/sendToken');

exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        const types = await DroneType.findAll();

        if(types) {
            res.status(200).json({ success: true, data: types })
        }else {
            res.status(404).json({ success: false, data: 'Drone type not found!' });
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
});

exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        const activeTypes = await DroneType.findAll({
            where: { is_active: true },
            attributes: ['type_name']
        });

        const activeTypeNames = activeTypes.map(type => type.type_name);

        if(activeTypes) {
            res.status(200).json({ success: true, data: activeTypeNames });
        } else {
            res.status(404).json({ success: false, data: 'Active drone type not found!' });
        }
        
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
});

exports.getTypeById = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params.id;
        const type = await DroneType.findByPk(id);

        if(type){
            res.status(200).json({
            success: true,
            data: type.type_name
        })
        } else {
            res.status(404).json({
                success: false,
                error: 'Drone type not found!'
            })
        }
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error!'
        })
    }
}) 

exports.add = catchAsyncErrors(async(req, res, next) => {
    try {
        const { type_name } = req.body;

    if (!type_name) {
      return res.status(400).json({ success: false, error: "Type name cannot be empty!" });
    }

    const _type = await DroneType.findOne({ where: { type_name } });

    if (_type) {
      return res.status(400).json({ success: false, error: "This brand already exists" });
    }

    const type = await DroneType.create({
        type_name,
    });

    await type.save();
    res.status(201).json({ message: "Drone type successfully registered.", data: type });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
});


exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const typeId = req.params.id;
        const { type_name } = req.body;
        
        const typeToUpdate = await DroneType.findByPk(typeId);

        if (!typeToUpdate) {
            return res.status(404).json({ success: false, error: 'Drone not found!' });
        }

        typeToUpdate.type_name = type_name || typeToUpdate.type_name;

        await typeToUpdate.save();
        res.status(200).json({ success: true, data: typeToUpdate });

    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
});

exports.deleteType = catchAsyncErrors(async (req, res)=> {
    try{
        const id = req.params.id;

        const type = await DroneType.update(
            { is_active: false },
            { where: { dronetype_id: id }}
        );

        if(type[0] === 0){
            return res.status(404).json({ success: false, message: 'Drone type not found!' });
        }

        res.status(200).json({ success: true, message: 'Drone type deleted successfuly.' })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})