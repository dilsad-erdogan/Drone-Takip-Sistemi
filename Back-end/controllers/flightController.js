const Flight = require("../models/Flight");
const Drone = require("../models/Drone")
const express = require("express");
const util = require("util");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient({
  redisUrl,
  legacyMode: true
});


client.set = util.promisify(client.set);
client.get = util.promisify(client.get);

const app = express();
app.use(express.json());

async function updateFlightCoordinates(flightId, newCoordinates) {
    try {
        await client.connect();
        const timestamp = new Date().getTime();

        await client.zAdd('flightCoordinates', timestamp, flightId);
        await client.hSet('flightCoordinatesHash', flightId, JSON.stringify(newCoordinates))
        console.log(`Updated: ${flightId}`)
    } catch(error) {
        console.log(`Error updating ${error.message}`)
    }
}

const add = async (req, res) => {
    try {       
        //await client.connect();

        const {
            flight_number, drone_id, startPoint, endPoint, coordinates
        } = req.body;

        const _flight = await Flight.findOne({ flight_number })

        if(_flight) {
            return res.status(400).json({ success: false, message: 'This flight is already exists!'})
        }

        //await updateFlightCoordinates(_flight._id.toString(), coordinates);

        // const newFlight = new Flight({
        //     flight_number,
        //     startPoint,
        //     endPoint,
        //     coordinates,
        // });

        // console.log(newFlight);
        // const savedFlight = await newFlight.save();

        await createFlightWithDroneId({
            flight_number: flight_number,
            startPoint: startPoint,
            endPoint: endPoint,
            coordinates: coordinates
        }, drone_id).then(flight => {
            res.status(201).json({
                success: true,
                message: flight
            })
        }).catch(error => {
            res.status(400).json({
                success: false,
                message: error
            })
        })
    } catch(error) {
        return res.status(500).json({
            message: error
        })
    }
}

const getFlight = async (req, res) => {
    try {
        const flights = await Flight.find();

        res.status(200).json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateCoordinates = async (req, res) => {
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

        flight.coordinates = newCoordinates;
        await flight.save();

        await updateFlightCoordinates(flightId, newCoordinates);

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

async function createFlightWithDroneId(flightData, droneId) {
    try {
        const drone = await Drone.findByPk(droneId);
        if(!drone) {
            throw new Error("Drone not found")
        }

        const flight = new Flight({
            flight_number: flightData.flight_number,
            drone_id: droneId,
            startPoint: flightData.startPoint,
            endPoint: flightData.endPoint,
            coordinates: flightData.coordinates
        })

        const savedFlight = await flight.save()

        await updateFlightCoordinates(savedFlight._id.toString(), flightData.coordinates);

        console.log(savedFlight);

        return flight;
    } catch(error) {
        console.log("Error creating flight: ", error);
        throw error;
    }
}

module.exports = {add, getFlight, updateCoordinates} 

// modele flight id ekle