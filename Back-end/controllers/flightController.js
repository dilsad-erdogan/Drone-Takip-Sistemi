const Flight = require("../models/Flight")
const Drone = require("../models/Drone")

async function addFlight(req, res) {
    try {       
        const {
            flight_number, drone_id, startPoint, endPoint, coordinates, is_active
        } = req.body;

        const _flight = await Flight.findOne({ flight_number })

        if(_flight) {
            return res.status(400).json({ success: false, message: 'This flight is already exists!'})
        }

        await createFlightWithDroneId({
            flight_number: flight_number,
            startPoint: startPoint,
            endPoint: endPoint,
            coordinates: coordinates,
            is_active: is_active
        }, drone_id).then(flight => {
            res.status(201).json({
                success: true,
                message: flight
            })
        }).catch(error => {
            console.log(error)
            res.status(400).json({ success: false, message: error })
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

// new flight mongodb and postgresql function
async function createFlightWithDroneId(flightData, droneId) {
    try {
        const drone = await Drone.findByPk(droneId);
        if (!drone) {
            throw new Error("Drone not found");
        }

        const flight = new Flight({
            flight_number: flightData.flight_number,
            drone_id: droneId,
            startPoint: flightData.startPoint,
            endPoint: flightData.endPoint,
            coordinates: flightData.coordinates,
            is_active: flightData.is_active
        });

        const savedFlight = await flight.save()
        console.log(savedFlight)
        return flight;
    } catch (error) {
        console.log("Error creating flight: ", error)
        throw error;
    }
}

async function updateCoordinates(req, res) {
    try {
        //await client.connect();
        const flightId = req.params.flightId;
        const newCoordinates = req.body.coordinates;

        const flight = await Flight.findById(flightId);

        if(!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            })
        }
        //await updateFlightCoordinates(flightId, newCoordinates);
        flight.coordinates = newCoordinates;
        flight.save();

        res.status(200).json({
            success: true,
            message: 'Flight coordinates updated successfully'
        });
    } catch(error) {
        console.log(`Error2: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }
}


async function allActiveFlight(req, res) {
    try {
        const activeFlights = await Flight.find({ is_active: true })
        
        if(activeFlights) {
            res.status(200).json({ success: true, message: activeFlights })
        } else {
            res.status(404).json({ success: false, message: 'Flight not found!'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error!' })
    }
}

async function getFromMongo(req, res) {
    try {
        const flights = await Flight.find()

        if(flights) {
            res.status(200).json({ success: true, message: flights})
        } else {
            res.status(404).json({ success: false, message: 'Flight not found!'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error!' })
    }
}

async function totalFlight(req, res) { 
    try {
        const flights = await Flight.find()

        if(flights.length > 0) {
            res.status(200).json({ success: true, message: flights.length})
        } else {
            res.status(404).json({ success: false, message: 'Flight not found!'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error!' })
    }
 }

  module.exports = {
    createFlightWithDroneId, 
    addFlight, 
    updateCoordinates, 
    allActiveFlight,
    getFromMongo, 
    totalFlight
} 