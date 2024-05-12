const express = require('express')
const multer = require("multer")

const {
    getAll,
    getActiveAll,
    getPermissionById,
    //getPermissionByUserId,
    getTotalPermissionCount,
    add,
    update,
    deletePermission,
} = require('../controllers/certificatePermissionController')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.route('/all').get(getAll)
router.route('/activeAll').get(getActiveAll)
router.route('/total').get(getTotalPermissionCount)
router.route('/:id').get(getPermissionById)
//router.route('/userById/:id').get(getPermissionByUserId)
router.route('/add').post( upload.single("file"), add)
router.route('/update/:id').patch(update)
router.route('/delete/:id').patch(deletePermission)

module.exports = router