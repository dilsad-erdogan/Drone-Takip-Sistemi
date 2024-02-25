const pool = require("../config/database.js");
const queries = require("../queries/drone.js");

const getDrones = (req, res) => {
    pool.query(queries.getDrones, (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}; //Drone select işlemi

const getDroneById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getDroneById, [id], (error, result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
}; //Sadece id değeri verilen bilginin select işlemi

const addDrone = (req, res) => {
    const {droneinfo_id, owner_id, serial_number, longitude, latitude} = req.body;
    
    pool.query(queries.checkSerialNumber, [serial_number], (error, results) => {
        if(error) throw error;
        else if (results.rows.length) {
            res.send("Serial number already exists.");
        }

        pool.query(queries.addDrone, [droneinfo_id, owner_id, serial_number, longitude, latitude], (error, results) => {
            if(error) throw error;
            res.status(201).send("Drone created successfully!");
        });        
    });
}; //Drone bilgisinin tabloya eklenmesi

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
}; //Id değeri verilen drone bilgisinin silinmesi

const updateDrone = (req, res) => {
    const id = parseInt(req.params.id);
    const { droneinfo_id, owner_id, serial_number, is_active, longitude, latitude } = req.body;

    pool.query(queries.getDroneById, [id], (error, results) => {
        if (error) throw error;
        else if (!results.rows.length){
            res.send("Drone does not exist in the database.");
        }

        pool.query(queries.updateDrone, [droneinfo_id, owner_id, serial_number, is_active, longitude, latitude, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Drone updated successfully.");
        });
    });
}; //Id değeri verilen drone bilgisinin güncellenmesi

const updateDroneIsActive = (req, res) => {
    const id = parseInt(req.params.id);
    const { is_active } = req.body;

    pool.query(queries.getDroneById, [id], (error, results) => {
        if (error) {
            console.error('Error checking if drone exists:', error.message);
            throw error;
        } else if (!results.rows.length) {
            res.status(404).send("Drone does not exist in the database.");
        } else {
            pool.query(queries.updateDroneIsActive, [is_active, id], (error, results) => {
                if (error) {
                    console.error('Error updating drone isactive:', error.message);
                    throw error;
                }
                res.status(200).send("Drone isactive updated successfully.");
            });
        }
    });
}; //Id değeri verilen drone bilgisinin is_active güncellenmesi

module.exports = {
    getDrones,
    getDroneById,
    addDrone,
    removeDrone,
    updateDrone,
    updateDroneIsActive,
};