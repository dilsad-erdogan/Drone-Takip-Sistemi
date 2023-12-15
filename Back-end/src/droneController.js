const pool = require("../database");
const queries = require("./queries");

const getDrones = (req, res) => {
    pool.query(queries.getDrones, (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};

const getDroneById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getDroneById, [id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};

const addDrone = (req, res) => {
    const {droneinfo_id, owner_id, serialnumber, longitude, latitude} = req.body;
    
    pool.query(queries.checkSerialNumber, [serialnumber], (error, results) => {
        if(error) throw error;
        else if (results.rows.length) {
            res.send("Serial number already exists.");
        }

        pool.query(queries.addDrone, [droneinfo_id, owner_id, serialnumber, longitude, latitude], (error, results) => {
            if(error) throw error;
            res.status(201).send("Drone created successfully!");
        });        
    });
};

const removeDrone = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getDroneById, [id], (error, results) => {
        if(error) throw error;
        else if(!results.rows.length){
            res.send("Drone does not exist in the database.");
        }
        
        pool.query(queries.removeDrone, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Drone removed successfully!");
        });
    });
};

const updateDrone = (req, res) => {
    const id = parseInt(req.params.id);
    const { droneinfo_id, owner_id, serialnumber, isactive, longitude, latitude } = req.body;

    pool.query(queries.getDroneById, [id], (error, results) => {
        if (error) throw error;
        else if (!results.rows.length){
            res.send("Drone does not exist in the database.");
        }

        pool.query(queries.updateDrone, [droneinfo_id, owner_id, serialnumber, isactive, longitude, latitude, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Drone updated successfully.");
        });
    });
};

const updateDroneIsActive = (req, res) => {
    const id = parseInt(req.params.id);
    const { isactive } = req.body;

    pool.query(queries.getDroneById, [id], (error, results) => {
        if (error) {
            console.error('Error checking if drone exists:', error.message);
            throw error;
        } else if (!results.rows.length) {
            res.status(404).send("Drone does not exist in the database.");
        } else {
            pool.query(queries.updateDroneIsActive, [isactive, id], (error, results) => {
                if (error) {
                    console.error('Error updating drone isactive:', error.message);
                    throw error;
                }
                res.status(200).send("Drone isactive updated successfully.");
            });
        }
    });
};

module.exports = {
    getDrones,
    getDroneById,
    addDrone,
    removeDrone,
    updateDrone,
    updateDroneIsActive,
};