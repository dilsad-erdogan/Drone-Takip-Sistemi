const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const DroneBrand = require('../models/DroneBrand');
const sendToken = require('../utils/sendToken');

// tüm markaları getir
exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm dronelar
        const brands = await DroneBrand.findAll();

        res.status(200).json({
            success: true,
            data: brands
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// aktif olan tüm markaları getir
exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm dronelar
        const brands = await DroneBrand.findAll();

        // Aktif olan droneları bulmak için bir döngü
        const activeBrands = brands.filter(brand => brand.is_active === true);

        res.status(200).json({
            success: true,
            data: activeBrands
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
});

// id'ye göre marka getir
exports.getBrandById = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params.id;
        const brand = await DroneBrand.findByPk(id);

        if(brand && brand.is_active===true){
            res.status(200).json({
            success: true,
            data: brand
        })
        } else {
            res.status(404).json({
                success: false,
                error: 'Brand not found'
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
        const { brand_name } = req.body;

    if (!brand_name) {
      return res.status(400).json({
        success: false,
        error: "Brand name cannot be empty"
      });
    }

    const _brand = await DroneBrand.findOne({ where: { brand_name } });

    if (_brand) {
      return res.status(400).json({
        success: false,
        error: "This brand already exists"
      });
    }

    const brand = await DroneBrand.create({
        brand_name,
    });

    await brand.save();

    res.status(201).json({ message: "brand successfully registered", data: brand });

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
        const { brand_name } = req.body;
        const brandId = req.params.id; // Güncellenecek markanın ID'si

        // Güncellenecek markayı bul
        const brandToUpdate = await DroneBrand.findByPk(brandId);

        // Marka bulunamazsa hata döndür
        if (!brandToUpdate) {
        return res.status(404).json({ success: false, error: 'Drone bulunamadı' });
        }

        // Yeni bilgilerle markayı güncelle
        brandToUpdate.brand_name = brand_name || brandToUpdate.brand_name;

        // Güncellenmiş markayı kaydet
        await brandToUpdate.save();

        // Başarı durumunda cevap gönder
        res.status(200).json({ success: true, data: brandToUpdate });
    } catch (error) {
        console.error('Hata:', error);
        // Hatanın consola yazdırılması
        res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
    }
});

exports.deleteBrand = catchAsyncErrors(async (req, res)=> {
    try{
        const id = req.params.id;

        const brand = await DroneBrand.update(
            {is_active: false},
            {where: { brand_id: id }}
        );

        if(brand[0] === 0){
            return res.status(404).json({message: 'Brand not found'});
        }

        res.status(200).json({
            message: 'Brand deleted successful'
        })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})