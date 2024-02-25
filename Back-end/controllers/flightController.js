const Flight = require("../models/Flight")
const Drone = require("../models/Drone")
const util = require("util")
// const redis = require("redis")
// const catchAsyncErrors = require("../middleware/catchAsyncErrors")
// const redisUrl = "redis://127.0.0.1:6379";
// const client = redis.createClient({
//   redisUrl,
//   legacyMode: true
// })

//client.set = util.promisify(client.set);
//client.get = util.promisify(client.get);

//import { Entity, Schema } from 'redis-om'
//import client from '../config/client'

async function addFlight(req, res) {
    //await client.connect();
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
    //await client.connect();
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

        // Redis'e koordinatları ekleyin
        await client.hSet(savedFlight._id.toString(), 'coordinates', JSON.stringify(flightData.coordinates))
        console.log('Flight coordinates added to Redis:', savedFlight._id)

        console.log(savedFlight)
        return flight;
    } catch (error) {
        console.log("Error creating flight: ", error)
        throw error;
    }
}


// exports.getFromMongo = catchAsyncErrors(async (req, res) => {
//     try {
//         const flights = await Flight.find();

//         res.status(200).json(flights);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// })

// exports.getFromRedis = catchAsyncErrors(async (req, res) => {
//     try {
//         await client.connect()
//     const flightId = req.params.flightId
//     const coordinatesString = await client.hGet('flightCoordinatesHash', flightId)
//     if(coordinatesString) {
//         const coordinates = JSON.parse(coordinatesString);
//         return res.status(200).json({
//             success:true,
//             message: coordinates
//         })
//     } else {
//         return null;
//     }} catch(error) {
//         res.status(500).json({
//             success: false,
//             message: error
//         })
//     }
// })

async function updateFlightCoordinates(flightId, newCoordinates) {
    try {
        //await client.connect();
        const timestamp = new Date().getTime();

        await client.hSet(flightId, 'coordinates', JSON.stringify(newCoordinates));
        console.log('Flight coordinates updated in Redis:', flightId);
        //await client.zAdd('flightCoordinates', timestamp, flightId);
        //await client.hSet(flightId,'flightCoordinatesHash', JSON.stringify(newCoordinates))
        //console.log(`Updated: ${flightId}`)
    } catch(error) {
        console.log(`Error updating ${error.message}`)
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
        await updateFlightCoordinates(flightId, newCoordinates);
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

async function getFromRedis(req, res) {
   // await client.connect();
    var flights = [];
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        if(keys){
            async.map(keys, function(key, cb) {
               client.get(key, function (error, value) {
                    if (error) return cb(error);
                    var flight = {};
                    flight['jobId']=key;
                    flight['data']=value;
                    cb(null, flight);
                }); 
            }, function (error, results) {
               if (error) return console.log(error);
               console.log(results);
               res.json({data:results});
            });
        }
    });
    // try {
    //   const flightId = req.params.flightId;
    //   await client.connect();
    //   const coordinatesString = await client.hGet(flightId, 'coordinates');
    //   console.log(coordinatesString)
    //   if (coordinatesString) {
    //     res.status(200).json({
    //       message: JSON.parse(coordinatesString)
    //     });
    //   } else {
    //     res.status(404).json({
    //       message: "Coordinates not found in Redis"
    //     });
    //   }
    // } catch (error) {
    //   console.error(`Error fetching coordinates from Redis: ${error.message}`);
    //   res.status(500).json({
    //     message: "Internal server error"
    //   });
    // }
  };

  module.exports = {
    updateFlightCoordinates, 
    createFlightWithDroneId, 
    addFlight, 
    updateCoordinates, 
    allActiveFlight,
    getFromMongo, 
    getFromRedis
} 