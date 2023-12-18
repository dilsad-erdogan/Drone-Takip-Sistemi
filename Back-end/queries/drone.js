const getDrones = "SELECT * FROM drone";
const getDroneById = "SELECT * FROM drone WHERE drone_id = $1";
const checkSerialNumber = "SELECT d FROM drone d WHERE d.serialnumber = $1";
const addDrone = "INSERT INTO drone (droneinfo_id, owner_id, serialnumber, isactive, longitude, latitude) VALUES ($1, $2, $3, true, $4, $5)";
const removeDrone = "DELETE FROM drone WHERE drone_id = $1";
const updateDrone = "UPDATE drone SET droneinfo_id = $1, owner_id = $2, serialnumber = $3, isactive = $4, longitude = $5, latitude = $6 WHERE drone_id = $7";
const updateDroneIsActive = "UPDATE drone SET isactive = $1 WHERE drone_id = $2";

module.exports = {
    getDrones,
    getDroneById, 
    checkSerialNumber,
    addDrone,
    removeDrone,
    updateDrone,
    updateDroneIsActive,
}