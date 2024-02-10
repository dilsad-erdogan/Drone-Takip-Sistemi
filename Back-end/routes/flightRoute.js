const router = require("express").Router()

const controller = require("../controllers/flightController")

router.post("/flight", controller.add)
router.get("/flight", controller.getFlight)
router.put("/flight/:flightId/coordinates", controller.updateCoordinates);

module.exports = router