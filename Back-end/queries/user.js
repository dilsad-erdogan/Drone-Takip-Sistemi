const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE user_id = $1";
const checkEmailExists = "SELECT u FROM users u WHERE u.email = $1";
const addUser = "INSERT INTO users (roletype_id, name, email, password, pilot_certificate, drone_owner, isactive) VALUES ($1, $2, $3, $4, $5, $6, true)";
const removeUser = "DELETE FROM users WHERE user_id = $1";
const updateUser = "UPDATE users SET roletype_id = $1, name = $2, email = $3, password = $4, pilot_certificate = $5, drone_owner = $6, isactive = $7 WHERE user_id = $8";
const updateUserIsActive = "UPDATE users SET isactive = $1 WHERE user_id = $2";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";

module.exports = {
    getUsers,
    getUsersById,
    checkEmailExists,
    addUser,
    removeUser,
    updateUser,
    updateUserIsActive,
    getUserByEmail,
}