const getDrones = "SELECT * FROM drone";
const getDroneById = "SELECT * FROM drone WHERE drone_id = $1";
const checkSerialNumber = "SELECT u FROM drone u WHERE u.serialnumber = $1";
const addDrone = "INSERT INTO drone (droneinfo_id, owner_id, serialnumber, isactive, latitude, longitude) VALUES ($1, $2, $3, true, $4, $5)";
const removeDrone = "DELETE FROM drone WHERE drone_id = $1";

module.exports = {
    getDrones,
    getDroneById,
    checkSerialNumber,
    addDrone,
    removeDrone,
};