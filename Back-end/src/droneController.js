const pool = require("../database");
const queries = require("./queries");

const getDrones = (req, res) => {
    pool.query(queries.getDrones, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getDroneById = (req, res) => {
    const id = parseInt(req.params.drone_id);
    pool.query(queries.getDroneById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addDrone = (req, res) => {
    const {droneinfo_id, owner_id, serial_number, is_active, longitude, latitude} = req.body;
    
    pool.query(queries.checkSerialNumber, [serial_number], (error, results) => {
        if(error) throw error;
        else if (results.rows.length) {
            res.send("Serial number already exists.");
        }

        pool.query(queries.addDrone, [droneinfo_id, owner_id, serial_number, is_active, longitude, latitude], (error, results) => {
            if(error) throw error;
            res.status(201).send("Drone created successfully!");
        });        
    });
};

const removeDrone = (req, res) => {
    const id = parseInt(req.params.drone_id);

    pool.query(queries.getDroneById, [id], (error, results) => {
        if(error) throw error;
        else if(!results.rows.length){
            res.send("Drone does not exist in the database.");
        }
        
        pool.query(queries.removeDrone, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Drone remove successfully!");
        });
    });
};

module.exports = {
    getDrones,
    getDroneById,
    addDrone,
    removeDrone,
};