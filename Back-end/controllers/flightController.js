const Flight = require("../models/Flight")
const Drone = require("../models/Drone");
const User = require("../models/User");
const Pilot = require("../models/Pilot");

async function generateFlightNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWYZ'
    const numbers = '0123456789'
    let flightNumber = ''
    for(let i = 0; i < 3; i++) {
        flightNumber += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    for(let i = 0; i < 3; i++){
        flightNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }

    return flightNumber
}

async function add(req, res) {
    try {       
        const {
            user_id, pilot_id, drone_id, start_point, end_point, coordinates
        } = req.body;
        
        flight_number = await generateFlightNumber()
        const _flight = await Flight.findOne({ flight_number })
        const _owner = await User.findByPk(user_id)
        const _pilot = await Pilot.findByPk(pilot_id)
        const _drone = await Drone.findByPk(drone_id)

        if(_flight) {
            return res.status(400).json({ success: false, message: 'This flight is already exists!'})
        } else if(!_owner || _owner.dataValues.is_active === false) {
            res.status(404).json({ success: false, message: 'User not found!'})
        } else if(!_pilot || _pilot.dataValues.is_active === false) {
            res.status(404).json({ success: false, message: 'Pilot not found!'})
        } else if(!_drone || _drone.dataValues.is_active === false) {
            res.status(404).json({ success: false, message: 'Drone not found!'})
        } 
            const flight = new Flight({
                flight_number: flight_number,
                owner_id: _owner.user_id,
                pilot_id: _pilot.pilot_id,
                drone_id: _drone.drone_id,
                startPoint: start_point,
                endPoint: end_point,
                date_and_time: Date.now(),
                coordinates: coordinates,
                is_active: true
            })
        

        const savedFlight = await flight.save()

        if(savedFlight) {
            res.status(201).json({ success: true, message: savedFlight })
        } else {
            res.status(400).json({ success: false, message: 'Flight error!'})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

async function updateCoordinates(req, res) {
    try {

        const flightId = req.params.flightId;
        const newCoordinates = req.body.coordinates;

        const flight = await Flight.findById(flightId);

        if(!flight) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            })
        }

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

// admin icin bütün ucusların sayısı
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

// user icin kendi ucus sayısı
async function totalFlightByUserId(req, res) {
    try {
        const user_id = req.params.id
        
        const flightCount = await Flight.countDocuments({ owner_id: user_id })

        if(flightCount > 0) {
            res.status(200).json({ success: true, message: flightCount})
        } else {
            res.status(404).json({ success: false, message: 'Flight not found!'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error!' })
    }
}

async function flightByUserId(req, res) {
    try {
        const id = req.params.id

        const user = await User.findByPk(id)

        if(!user) {
            res.status(404).json({ success: false, message: 'User not found!'})
        }  

        res.status(200).json({ success: true, message: user })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error!' })
    }
} 

  module.exports = { 
    add, 
    updateCoordinates, 
    allActiveFlight,
    getFromMongo, 
    totalFlight,
    totalFlightByUserId,
    flightByUserId
} 