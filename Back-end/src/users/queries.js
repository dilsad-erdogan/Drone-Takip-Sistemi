const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE user_id = $1";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const addUser = "INSERT INTO users (roletype_id, name, email, password, pilot_certificate, drone_owner, isActive) VALUES (3, $1, $2, $3, $4, $5, true)";
const removeUser = "DELETE FROM users WHERE user_id = $1";
const updateUser = "UPDATE users SET name = $1 WHERE user_id = $2";

module.exports = {
    getUsers,
    getUsersById, 
    checkEmailExists,
    addUser,
    removeUser,
    updateUser,
};