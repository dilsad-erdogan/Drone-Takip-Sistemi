const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE user_id = $1";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const addUser = "INSERT INTO users (roletype_id, name, email, password, pilot_certificate, drone_owner, isactive) VALUES ($1, $2, $3, $4, $5, $6, true)";
const removeUser = "DELETE FROM users WHERE user_id = $1";
const updateActiveUser = "UPDATE users SET isactive = $1 WHERE user_id = $2";
const updateUser = "UPDATE users SET roletype_id = $2, name = $3, email = $4, password = $5, pilot_certificate = $6, drone_owner = $7 WHERE user_id = $1";

const getDrones = "SELECT * FROM drone";
const getDroneById = "SELECT * FROM drone WHERE drone_id = $1";
const checkSerialNumber = "SELECT d FROM drone d WHERE d.serialnumber = $1";
const addDrone = "INSERT INTO drone (droneinfo_id, owner_id, serialnumber, isactive, latitude, longitude) VALUES ($1, $2, $3, true, $4, $5)";
const removeDrone = "DELETE FROM drone WHERE drone_id = $1";

module.exports = {
    getUsers,
    getUsersById, 
    checkEmailExists,
    addUser,
    removeUser,
    updateActiveUser,
    updateUser,
    getDrones,
    getDroneById,
    checkSerialNumber,
    addDrone,
    removeDrone,
};