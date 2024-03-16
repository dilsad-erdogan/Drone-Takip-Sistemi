const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const RoleType = require('../models/RoleType');

// tüm rolleri getir
exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm roller
        const roles = await RoleType.findAll();

        res.status(200).json({
            success: true,
            data: roles
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// aktif olan tüm rolleri getir
exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm roller
        const roles = await RoleType.findAll();

        // Aktif olan rolleri bulmak için bir döngü
        const activeRoleNames = roles
            .filter(role => role.is_active === true)
            .map(role => role.dataValues.role_type);

        res.status(200).json({
            success: true,
            data: activeRoleNames
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// id'ye göre role getir - yapılacak
exports.getRoleById = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params.id;
        const role = await RoleType.findByPk(id);

        if(role && role.is_active===true){
            res.status(200).json({
            success: true,
            data: role.role_type
        })
        } else {
            res.status(404).json({
                success: false,
                error: 'User type not found'
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
        const { role_type, explanation } = req.body;

    if (!role_type || !explanation) {
      return res.status(400).json({
        success: false,
        error: "Role Type and Explanation can not empty"
      });
    }

    const _role = await RoleType.findOne({ where: { role_type } });

    if (_role) {
      return res.status(400).json({
        success: false,
        error: "Role is exists"
      });
    }

    const roleType = await RoleType.create({
        role_type,
        explanation,
    }, 
    //{include: [DroneInformation], }
    );

    await roleType.save();
    res.status(201).json({ message: "Role type created successfully", data: roleType });

    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});


exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const { role_type, explanation } = req.body;
        const id = req.params.id;

    // Güncellenecek rolü bul
    const roleTypeToUpdate = await RoleType.findByPk(id);

    // role bulunamazsa hata döndür
    if (!roleTypeToUpdate) {
      return res.status(404).json({ success: false, error: 'Role type doesnt exists' });
    }

    // Yeni bilgilerle rolü güncelle
    roleTypeToUpdate.role_type = role_type || roleTypeToUpdate.role_type;
    roleTypeToUpdate.explanation = explanation || roleTypeToUpdate.explanation;

    // Güncellenmiş rolü kaydet
    await roleTypeToUpdate.save();

    // Başarı durumunda cevap gönder
    res.status(200).json({ success: true, data: roleTypeToUpdate });
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});

exports.deleteRole = catchAsyncErrors(async (req, res)=> {
    try{
        const id = req.params.id;

        const roleType = await RoleType.update(
            {is_active: false},
            {where: {roletype_id: id}}
        );

        if(roleType[0] === 0){
            return res.status(404).json({message: 'Role Type not found'});
        }

        res.status(200).json({
            message: 'Role type deleted successful'
        })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})