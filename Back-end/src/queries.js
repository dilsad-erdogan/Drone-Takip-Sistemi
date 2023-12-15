const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE user_id = $1";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const addUser = "INSERT INTO users (roletype_id, name, email, password, pilot_certificate, drone_owner, isactive) VALUES ($1, $2, $3, $4, $5, $6, true)";
const removeUser = "DELETE FROM users WHERE user_id = $1";
const updateUser = "UPDATE users SET roletype_id = $1, name = $2, email = $3, password = $4, pilot_certificate = $5, drone_owner = $6, isactive = $7 WHERE user_id = $8";
const updateUserIsActive = "UPDATE users SET isactive = $1 WHERE user_id = $2";

const getDrones = "SELECT * FROM drone";
const getDroneById = "SELECT * FROM drone WHERE drone_id = $1";
const checkSerialNumber = "SELECT d FROM drone d WHERE d.serialnumber = $1";
const addDrone = "INSERT INTO drone (droneinfo_id, owner_id, serialnumber, isactive, longitude, latitude) VALUES ($1, $2, $3, true, $4, $5)";
const removeDrone = "DELETE FROM drone WHERE drone_id = $1";
const updateDrone = "UPDATE drone SET droneinfo_id = $1, owner_id = $2, serialnumber = $3, isactive = $4, longitude = $5, latitude = $6 WHERE drone_id = $7";
const updateDroneIsActive = "UPDATE drone SET isactive = $1 WHERE drone_id = $2";

module.exports = {
    getUsers,
    getUsersById, 
    checkEmailExists,
    addUser,
    removeUser,
    updateUser,
    updateUserIsActive,
    getDrones,
    getDroneById,
    checkSerialNumber,
    addDrone,
    removeDrone,
    updateDrone,
    updateDroneIsActive,
};